import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Broker from "./pages/Broker";
import BrokerDetailPage from "./pages/BrokerDetailPage";
import { ScrollToTop } from "./components/ScrollToTop";
import CalculatorPage from "./pages/CalculatorPage";
import TransferAccount from "./pages/TransferAccount";
import SchedulePage from "./pages/SchedulePage";
import ValidationPage from "./pages/ValidationPage";
import RebateForex from "./pages/RebateForex";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/broker" element={<Broker />} />
        <Route path="/broker/:brokerId" element={<BrokerDetailPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/transfer" element={<TransferAccount />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/rebate-forex" element={<RebateForex />} />
      </Routes>
    </>
  );
}

export default App;
