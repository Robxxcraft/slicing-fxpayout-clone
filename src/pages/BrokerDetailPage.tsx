import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CommunityRating from "@/components/pages/brokerDetail/CommunityRating";
import CtaBroker from "@/components/pages/brokerDetail/CtaBroker";
import DepositWIthdraw from "@/components/pages/brokerDetail/DepositWIthdraw";
import FaqBroker from "@/components/pages/brokerDetail/FaqBroker";
import HeaderBroker from "@/components/pages/brokerDetail/HeaderBroker";
import MainAdvantage from "@/components/pages/brokerDetail/MainAdvantage";
import NavigationBar from "@/components/pages/brokerDetail/NavigationBar";
import ProfileBroker from "@/components/pages/brokerDetail/ProfileBroker";
import ProsCons from "@/components/pages/brokerDetail/ProsCons";
import RebateProgram from "@/components/pages/brokerDetail/RebateProgram";
import Spread from "@/components/pages/brokerDetail/Spread";
import Summary from "@/components/pages/brokerDetail/Summary";
import TypeAccount from "@/components/pages/brokerDetail/TypeAccount";
import { brokers } from "@/utils/dataBroker/brokers";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const BrokerDetailPage = () => {
  const { brokerId } = useParams();
  const broker = brokers[brokerId as keyof typeof brokers];

  useEffect(() => {
    const titleName = broker ? broker.name : "Not Found";
    document.title = `${titleName} - Broker | FX Payout`;
  }, [broker]);

  if (!broker) {
    return (
      <div className="font-inter">
        <Navbar active="broker" />
        <div className="px-5 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-[120px] lg:py-32 2xl:py-40 text-center">
          <p>
            Broker tidak ditemukan
          </p>
          <Link to="/broker" className="text-my-red">Kembali</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="font-inter">
      <NavigationBar name={broker.name} ranking={broker.ranking} profileImage={broker.profileImage} registerUrl={broker.registerUrl} websiteUrl={broker.websiteUrl} />

      <HeaderBroker name={broker.name} ranking={broker.ranking} badges={broker.badges} profileImage={broker.profileImage} overallScore={broker.overallScore} description={broker.detailDescription} registerUrl={broker.registerUrl} websiteUrl={broker.websiteUrl} spesification={broker.specification} />
      
      <ProfileBroker profile={broker.profile}/>

      <Summary summaryBroker={broker.summary} />

      <TypeAccount accountDetail={broker.accountTypes} />

      <Spread tradingSpread={broker.tradingSpreads} />
      
      <MainAdvantage keyAdvantages={broker.keyAdvantages} />

      <DepositWIthdraw paymentMethods={broker.depositWithdrawal.paymentMethods} platforms={broker.depositWithdrawal.platforms}/>

      <RebateProgram detailData={broker.rebateProgram} />

      <ProsCons advantages={broker.advantages} disadvantages={broker.disadvantages} />
      
      <CommunityRating name={broker.name} profileImage={broker.profileImage} ranking={broker.ranking} communityRating={broker.communityRating} />

      <FaqBroker dataFaq={broker.faq} />

      <CtaBroker name={broker.name} websiteUrl={broker.websiteUrl} />

      <Footer />
    </div>
  );
};

export default BrokerDetailPage;
