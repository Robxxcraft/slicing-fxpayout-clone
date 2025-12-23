import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Broker from "./pages/Broker";
import BrokerDetailPage from "./pages/BrokerDetailPage";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/broker" element={<Broker />} />
        <Route path="/broker/:brokerId" element={<BrokerDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
