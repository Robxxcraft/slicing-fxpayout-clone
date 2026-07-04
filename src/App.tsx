import { lazy, Suspense, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Bounce, ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";

import { AuthAPI } from "@/api";
import { UserModel } from "./models/user.model";
import { UserProvider } from "./context/UserContext";
import { getAccessToken } from "./services/apiClient";
import { WalletProvider } from "./provider/WalletProvider";
import { BalanceProvider } from "./context/BalanceContext";
import { clearCacheAuthUser } from "./helper/clearCacheAuthUser";
import { BrokerUserProvider } from "./provider/BrokerUserProvider";
import AdminOverviewProvider from "./provider/AdminOverviewProvider";
import type { UserProfile, UserBalance } from "./types/user.type";

import Broker from "./pages/Broker";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import RebateForex from "./pages/RebateForex";
import SchedulePage from "./pages/SchedulePage";
import CalculatorPage from "./pages/CalculatorPage";
// import ValidationPage from "./pages/ValidationPage";
import TransferAccount from "./pages/TransferAccount";
import BrokerDetailPage from "./pages/BrokerDetailPage";

const LoginPage =   lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage =   lazy(() => import("./pages/auth/RegisterPage"));
const VerifyEmailPage =   lazy(() => import("./pages/auth/VerifyEmailPage"));
const ProfileRegisterPage =   lazy(() => import("./pages/auth/ProfileRegisterPage"));

const ProfilePage = lazy(() => import("./pages/dashboard/common/ProfilePage"));
const ChangePasswordPage = lazy(() => import("./pages/dashboard/common/ChangePasswordPage"));
const WithdrawalFundsPage = lazy(() => import("./pages/dashboard/common/WithdrawalFundsPage"));
const WithdrawalRequestPage = lazy(() => import("./pages/dashboard/common/WithdrawalRequestPage"));
const TransactionHistoryPage = lazy(() => import("./pages/dashboard/common/TransactionHistoryPage"));

const OverviewAdmin = lazy(() => import("./pages/dashboard/admin/OverviewAdmin"));
const WalletManagement = lazy(() => import("./pages/dashboard/admin/WalletManagement"));
const ImportRebatePage = lazy(() => import("./pages/dashboard/admin/ImportRebatePage"));
const BrokersManagement = lazy(() => import("./pages/dashboard/admin/BrokersManagement"));
const TradersManagement = lazy(() => import("./pages/dashboard/admin/TradersManagement"));
const RebatesManagement = lazy(() => import("./pages/dashboard/admin/RebatesManagement"));
const WhatsAppPage = lazy(() => import("./pages/dashboard/admin/WhatsAppPage"));
const ValidationDataDashboard = lazy(() => import("./pages/admin/ValidationDataDashboard"));
const AffiliatorsManagement = lazy(() => import("./pages/dashboard/admin/AffiliatorsManagement"));
const WithdrawalRequestManagement = lazy(() => import("./pages/dashboard/admin/WithdrawalRequestManagement"));

const HistoryRebate = lazy(() => import("./pages/dashboard/trader/HistoryRebate"));
const OverviewTrader = lazy(() => import("./pages/dashboard/trader/OverviewTrader"));
const AddBrokerTrader = lazy(() => import("./pages/dashboard/trader/AddBrokerTrader"));
const ConnectedBrokerPage = lazy(() => import("./pages/dashboard/trader/ConnectedBrokerPage"));

const ManagementTraders = lazy(() => import("./pages/dashboard/affiliator/ManagementTraders"));
const OverviewAffiliator = lazy(() => import("./pages/dashboard/affiliator/OverviewAffiliator"));
const TraderPerformancePage = lazy(() => import("./pages/dashboard/affiliator/TraderPerformancePage"));

import TawkChat from "./components/TawkChat";
import MainLayout from "./components/MainLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import ContainerDashboard from "./components/dashboard/common/ContainerDashboard";
import SEO from "./components/common/SEO";
import ForexRebatePage from "./pages/ForexRebatePage";
import VipRebatePage from "./pages/VipRebatePage";
import AffiliateLandingPage from "./pages/AffiliateLandingPage";

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
    }; 

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
        <SEO />
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
              {/* <Route path="validation" element={<ValidationPage />} /> */}
              <Route path="schedule/:brokerId" element={<SchedulePage />} />
              <Route path="rebate-forex" element={<RebateForex />} />
              <Route path="forex" element={<ForexRebatePage />} />
              <Route path="vip-rebate" element={<VipRebatePage />} />
              <Route path="affiliate" element={<AffiliateLandingPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="login" element={<Suspense><LoginPage /></Suspense>} />
            <Route path="register" element={<Suspense><RegisterPage /></Suspense>} />
            <Route path="verify-email" element={<Suspense><VerifyEmailPage /></Suspense>} />
            <Route path="profile-register" element={<Suspense><ProfileRegisterPage /></Suspense>} />

            {/* Dashboard Routes (Admin/User/Affiliator) */}
            {authUser?.role === "admin" && (
              <Route path="dashboard" element={
                <Suspense>
                  <AdminOverviewProvider>
                    <ContainerDashboard />
                  </AdminOverviewProvider>
                </Suspense>
              }>
                <Route path="overview" element={<OverviewAdmin />} />
                <Route path="affiliators" element={<AffiliatorsManagement />} />
                <Route path="traders" element={<TradersManagement />} />
                <Route path="wallets" element={<WalletManagement />} />
                <Route path="brokers" element={<BrokersManagement />} />
                <Route path="rebates" element={<RebatesManagement />} />
                <Route path="withdrawals" element={<WithdrawalRequestManagement />} />
                <Route path="rebates/import" element={<ImportRebatePage />} />
                <Route path="validation-data" element={<ValidationDataDashboard />} />
                <Route path="whatsapp" element={<WhatsAppPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/change-password" element={<ChangePasswordPage />} />
              </Route>
            )}

            <Route path="trader" element={
              <Suspense>
                <BrokerUserProvider>
                  <ContainerDashboard />
                </BrokerUserProvider>
              </Suspense>
            }>
              <Route path="overview" element={<OverviewTrader />} />
              <Route path="broker" element={<ConnectedBrokerPage />} />
              <Route path="rebate" element={<HistoryRebate />} />
              <Route path="rebate/:brokerParams" element={<HistoryRebate />} />
              <Route path="withdrawal" element={
                <WalletProvider>
                  <WithdrawalFundsPage />
                </WalletProvider>
              } />
              <Route path="withdrawal/history" element={<TransactionHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/change-password" element={<ChangePasswordPage />} />
            </Route>
            <Route path="trader/broker/connect" element={
              <Suspense>
                <AddBrokerTrader />
              </Suspense>
            }/>

            <Route path="affiliator" element={
              <Suspense>
                <ContainerDashboard />
              </Suspense>
            }>
              <Route path="overview" element={<OverviewAffiliator />} />
              <Route path="traders" element={<ManagementTraders />} />
              <Route path="performance" element={<TraderPerformancePage />} />
              <Route path="withdrawal" element={
                <WalletProvider>
                  <WithdrawalFundsPage />
                </WalletProvider>
              } />
              <Route path="withdrawal/history" element={<TransactionHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/change-password" element={<ChangePasswordPage />} />
            </Route>
            <Route path="withdrawal/request" element={
              <Suspense>
                <WalletProvider>
                  <WithdrawalRequestPage />
                </WalletProvider>
              </Suspense>
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
