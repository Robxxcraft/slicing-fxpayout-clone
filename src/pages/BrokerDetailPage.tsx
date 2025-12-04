import { useEffect } from "react";
import NavigationBar from "../components/pages/brokerDetail/NavigationBar";
import HeaderBroker from "../components/pages/brokerDetail/HeaderBroker";
import ProfilBroker from "../components/pages/brokerDetail/ProfilBroker";
import Summary from "../components/pages/brokerDetail/Summary";
import TypeAccount from "../components/pages/brokerDetail/TypeAccount";
import Spread from "../components/pages/brokerDetail/Spread";
import MainAdvantage from "../components/pages/brokerDetail/MainAdvantage";
import DepositWIthdraw from "../components/pages/brokerDetail/DepositWIthdraw";
import RebateProgram from "../components/pages/brokerDetail/RebateProgram";
import ProsCons from "../components/pages/brokerDetail/ProsCons";
import CommunityRating from "../components/pages/brokerDetail/CommunityRating";
import FaqBroker from "../components/pages/brokerDetail/FaqBroker";
import CtaBroker from "../components/pages/brokerDetail/CtaBroker";
import Footer from "../components/Footer";

const BrokerDetailPage = () => {

  useEffect(() => {
    document.title = "Exness - Broker | Rebate FX";
  }, []);

  return (
    <div className="font-inter">
      <NavigationBar />
      <HeaderBroker />
      <ProfilBroker />
      <Summary />
      <TypeAccount />
      <Spread />
      <MainAdvantage />
      <DepositWIthdraw />
      <RebateProgram />
      <ProsCons />
      <CommunityRating />
      <FaqBroker />
      <CtaBroker />
      <Footer />
    </div>
  );
};

export default BrokerDetailPage;
