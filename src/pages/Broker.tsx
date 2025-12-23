import { useEffect, useState } from "react";
import { brokers } from "@/utils/dataBroker/brokers";
import Navbar from "@/components/Navbar";
import Header from "@/components/broker/Header";
import BrokerList from "@/components/broker/BrokerList";
import NotifyBroker from "@/components/broker/NotifyBroker";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Broker = () => {
  const [showNotify, setShowNotify] = useState<boolean>(true);
  const brokerPartners = Object.values(brokers);

  useEffect(() => {
    document.title = "Broker | FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="broker" />
      <Header />
      <BrokerList brokerPartners={brokerPartners} />
      {showNotify && <NotifyBroker setShowNotify={setShowNotify} />}
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Broker;
