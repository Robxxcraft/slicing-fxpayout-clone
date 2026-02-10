import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Broker from "./pages/Broker";
import BrokerDetailPage from "./pages/BrokerDetailPage";
import { ScrollToTop } from "./components/ScrollToTop";
import CalculatorPage from "./pages/CalculatorPage";
import TransferAccount from "./pages/TransferAccount";
import SchedulePage from "./pages/SchedulePage";
import ValidationPage from "./pages/ValidationPage";
import RebateForex from "./pages/RebateForex";
import ValidationDataDashboard from "./pages/admin/ValidationDataDashboard";
import LoginPage from "./pages/admin/LoginPage";
import { useEffect, useState } from "react";
import type { UserProfile } from "./models/user";
import { getAuthUser } from "./utils/api";
import NotFound from "./pages/NotFound";
import ContainerDashboard from "./components/admin/ContainerDashboard";
import ProfileDashboard from "./pages/admin/ProfileDashboard";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const [authUser, setAuthUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [initialization, setInitialization] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (authUser !== null) return;
        setInitialization(true);
        if (location.pathname.includes("dashboard") || location.pathname.includes("login")) {
          const { error, data }: { error: boolean; data: UserProfile | null } = await getAuthUser();
          if (!error) {
            setAuthUser(data as UserProfile);
            if (data?.role === "admin") {
              setIsAdmin(true);
            }
          } else {
            setAuthUser(null);
          }
        }
      } finally {
        setInitialization(false);
      }
    } 

    getUser();
  }, [authUser, location.pathname]);

  if (initialization) {
    return null;
  }

  return (
    <>
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
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/broker" element={<Broker />} />
        <Route path="/broker/:brokerId" element={<BrokerDetailPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/transfer" element={<TransferAccount />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/rebate-forex" element={<RebateForex />} />

        <Route path="/dashboard/login" element={<LoginPage authUser={authUser} />} />
        {authUser && isAdmin &&
          <Route path="/dashboard"
            element={<ContainerDashboard authUser={authUser} />}
          >
            <Route path="validation-data" element={<ValidationDataDashboard />} />
            <Route path="profile" element={<ProfileDashboard authUser={authUser} />} />
          </Route>
        }
        {!initialization &&
          <Route path="/*" element={<NotFound />}/>
        }
      </Routes>
    </>
  );
}

export default App;
