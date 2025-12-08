import { useEffect, useState } from "react";
import BrokerList from "../components/broker/BrokerList";
import Header from "../components/broker/Header";
import NotifyBroker from "../components/broker/NotifyBroker";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Broker = () => {
  const [showNotify, setShowNotify] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Broker | FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="broker" />
      <Header />
      <BrokerList />
      {showNotify && <NotifyBroker setShowNotify={setShowNotify} />}
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Broker;
