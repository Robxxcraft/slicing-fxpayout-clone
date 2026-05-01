import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Bounce, ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";

import { AuthAPI } from "@/api";
import { UserProvider } from "./context/UserContext";
import { BankProvider } from "./provider/BankProvider";
import { BrokerUserProvider } from "./provider/BrokerUserProvider";
import { UserModel } from "./models/user.model";
import type { UserProfile, UserBalance } from "./types/user.type";
import { getAccessToken } from "./services/apiClient";

import Broker from "./pages/Broker";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import RebateForex from "./pages/RebateForex";
import SchedulePage from "./pages/SchedulePage";
import CalculatorPage from "./pages/CalculatorPage";
import ValidationPage from "./pages/ValidationPage";
import TransferAccount from "./pages/TransferAccount";
import BrokerDetailPage from "./pages/BrokerDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import ValidationDataDashboard from "./pages/admin/ValidationDataDashboard";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/auth/RegisterPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ProfileRegisterPage from "./pages/auth/ProfileRegisterPage";
import ProfilePage from "./pages/dashboard/common/ProfilePage";
import ChangePasswordPage from "./pages/dashboard/common/ChangePasswordPage";
import WithdrawalFundsPage from "./pages/dashboard/common/WithdrawalFundsPage";
import WithdrawalRequestPage from "./pages/dashboard/common/WithdrawalRequestPage";
import TransactionHistoryPage from "./pages/dashboard/common/TransactionHistoryPage";
import HistoryRebate from "./pages/dashboard/trader/HistoryRebate";
import OverviewTrader from "./pages/dashboard/trader/OverviewTrader";
import AddBrokerTrader from "./pages/dashboard/trader/AddBrokerTrader";
import ConnectedBrokerPage from "./pages/dashboard/trader/ConnectedBrokerPage";
import ManagementTraders from "./pages/dashboard/affiliator/ManagementTraders";
import OverviewAffiliator from "./pages/dashboard/affiliator/OverviewAffiliator";
import TraderPerformancePage from "./pages/dashboard/affiliator/TraderPerformancePage";

import TawkChat from "./components/TawkChat";
import MainLayout from "./components/MainLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import ContainerDashboard from "./components/admin/ContainerDashboard";
import { BalanceProvider } from "./context/BalanceContext";
import OverviewAdmin from "./pages/dashboard/admin/OverviewAdmin";
import AffiliatorsManagement from "./pages/dashboard/admin/AffiliatorsManagement";
import TradersManagement from "./pages/dashboard/admin/TradersManagement";
import BankManagement from "./pages/dashboard/admin/BankManagement";
import BrokersManagement from "./pages/dashboard/admin/BrokersManagement";
import WithdrawalRequestManagement from "./pages/dashboard/admin/WithdrawalRequestManagement";
import { clearCacheAuthUser } from "./helper/clearCacheAuthUser";
import RebatesManagement from "./pages/dashboard/admin/RebatesManagement";
import AdminOverviewProvider from "./provider/AdminOverviewProvider";

function App() {
  const [authUser, setAuthUser] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<UserBalance | null>(null);
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [initialization, setInitialization] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      if (!getAccessToken()) {
        setAuthUser(null);
        clearCacheAuthUser();
        setInitialization(false);
        return;
      }
      try {
        setInitialization(true);
        const { error, data } = await AuthAPI.getAuthUser();
        if (!error && data) {
          const userData = UserModel.mapAuthUser(data);
          const respBalance = await AuthAPI.getBalanceUser();
          if (!respBalance.error && respBalance.data) {
            const tempBalance = {
              userId: data.id,
              balance: respBalance.data.amount,
              currency: respBalance.data.currency
            };
            setBalance(tempBalance);
          } else {
            setBalance({
              userId: data.id,
              balance: 0,
              currency: "USD"
            });
          }
          setAuthUser(userData);
        } else {
          setAuthUser(null);
          clearCacheAuthUser();
        }
      } finally {
        setInitialization(false);
      }
    } 

    getUser();
  }, []);

    useEffect(() => {
      ReactGA.initialize("G-FWNT67K53F");
      ReactGA.send({ 
        hitType: "pageview", 
        page: location.pathname + location.search, 
        title: document.title
      });
    }, [location.pathname, location.search]);

  useEffect(() => {
    const dashboardPaths = ["dashboard", "trader", "affiliator", "login", "register", "verify-email", "profile-register", "withdrawal"];
    const isMatch = dashboardPaths.some(p => location.pathname.includes(p));
    setIsDashboard(isMatch);
  }, [location.pathname]);

  if (initialization) {
    return null;
  }

  return (
    <UserProvider value={[authUser, setAuthUser]}>
      <BalanceProvider value={[balance, setBalance]}>
        <ScrollToTop />
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnHover={true}
          draggable={false}
          theme="light"
          transition={Bounce}
          style={{ bottom: isDashboard ? "0px" : "90px", zIndex: "1000000001" }}
        />
        <TawkChat isShow={!isDashboard} />

        <Routes>
          <Route path="/:lng?"> 
            
            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="broker" element={<Broker />} />
              <Route path="broker/:brokerId" element={<BrokerDetailPage />} />
              <Route path="calculator" element={<CalculatorPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="transfer" element={<TransferAccount />} />
              <Route path="validation" element={<ValidationPage />} />
              <Route path="schedule/:brokerId" element={<SchedulePage />} />
              <Route path="rebate-forex" element={<RebateForex />} />
            </Route>

            {/* Auth Routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="profile-register" element={<ProfileRegisterPage />} />

            {/* Dashboard Routes (Admin/User/Affiliator) */}
            {authUser?.role === "admin" && (
              <Route path="dashboard" element={
                <AdminOverviewProvider>
                  <ContainerDashboard />
                </AdminOverviewProvider>
              }>
                <Route path="overview" element={<OverviewAdmin />} />
                <Route path="affiliators" element={<AffiliatorsManagement />} />
                <Route path="traders" element={<TradersManagement />} />
                <Route path="bank" element={<BankManagement />} />
                <Route path="broker" element={<BrokersManagement />} />
                <Route path="rebates" element={<RebatesManagement />} />
                <Route path="withdrawal" element={<WithdrawalRequestManagement />} />
                <Route path="validation-data" element={<ValidationDataDashboard />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/change-password" element={<ChangePasswordPage />} />
              </Route>
            )}

            <Route path="trader" element={
              <BrokerUserProvider>
                <ContainerDashboard />
              </BrokerUserProvider>
            }>
              <Route path="overview" element={<OverviewTrader />} />
              <Route path="broker" element={<ConnectedBrokerPage />} />
              <Route path="rebate" element={<HistoryRebate />} />
              <Route path="rebate/:brokerParams" element={<HistoryRebate />} />
              <Route path="withdrawal" element={
                <BankProvider>
                  <WithdrawalFundsPage />
                </BankProvider>
              } />
              <Route path="withdrawal/history" element={<TransactionHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/change-password" element={<ChangePasswordPage />} />
            </Route>
            <Route path="trader/broker/connect" element={<AddBrokerTrader />} />

            <Route path="affiliator" element={<ContainerDashboard />}>
              <Route path="overview" element={<OverviewAffiliator />} />
              <Route path="traders" element={<ManagementTraders />} />
              <Route path="performance" element={<TraderPerformancePage />} />
              <Route path="withdrawal" element={
                <BankProvider>
                  <WithdrawalFundsPage />
                </BankProvider>
              } />
              <Route path="withdrawal/history" element={<TransactionHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/change-password" element={<ChangePasswordPage />} />
            </Route>
            <Route path="withdrawal/request" element={
              <BankProvider>
                <WithdrawalRequestPage />
              </BankProvider>
            } />

          </Route>

          {/* Fallback 404 */}
          {!initialization && <Route path="*" element={<NotFound />} />}
        </Routes>
      </BalanceProvider>
    </UserProvider>
  );
}

export default App;
