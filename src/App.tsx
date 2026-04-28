import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Route, Routes, useLocation } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import type { UserProfile } from "./models/user";

import Broker from "./pages/Broker";
import NewsPage from "./pages/NewsPage";
import HomePage from "./pages/HomePage";
import RebateForex from "./pages/RebateForex";
import SchedulePage from "./pages/SchedulePage";
import ValidationPage from "./pages/ValidationPage";
import CalculatorPage from "./pages/CalculatorPage";
import TransferAccount from "./pages/TransferAccount";
import BrokerDetailPage from "./pages/BrokerDetailPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/admin/LoginPage";
import ProfileDashboard from "./pages/admin/ProfileDashboard";
import ValidationDataDashboard from "./pages/admin/ValidationDataDashboard";

import TawkChat from "./components/TawkChat";
import MainLayout from "./components/MainLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import ContainerDashboard from "./components/admin/ContainerDashboard";

import { getAuthUser } from "./utils/api";

function App() {
  const [authUser, setAuthUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [initialization, setInitialization] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (authUser !== null) return;
        setInitialization(true);
        if (location.pathname.includes("dashboard") || location.pathname.includes("login")) {
          setIsDashboard(true);
          const { error, data }: { error: boolean; data: UserProfile | null } = await getAuthUser();
          if (!error) {
            setAuthUser(data as UserProfile);
            if (data?.role === "admin") {
              setIsAdmin(true);
            }
          } else {
            setAuthUser(null);
          }
        } else {
          setIsDashboard(false);
        }
      } finally {
        setInitialization(false);
      }
    }; 

    getUser();
  }, [authUser, location.pathname]);

  useEffect(() => {
    ReactGA.initialize("G-FWNT67K53F");
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search, 
      title: document.title
    });
  }, [location.pathname, location.search]);

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
        style={{ bottom: isDashboard ? "0px" : "90px", zIndex: "1000000001" }}
      />
      {!isDashboard && <TawkChat />}

      <Routes>
        <Route path="/:lng" element={<MainLayout />}>
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
        
        <Route path="/" element={<MainLayout />}>
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
