import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Broker from "./pages/Broker";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/broker" element={<Broker />} />
      </Routes>
    </>
  );
}

export default App;
