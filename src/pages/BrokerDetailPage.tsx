// TODO: Broker Detail Page Translate AR UI

import Footer from "@/components/Footer";
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
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";
import ModalRegionsWebsite from "@/components/broker/ui/ModalRegionsWebsite";
import { useState } from "react";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";

const BrokerDetailPage = () => {
  const { t } = useTranslation(["brokerdetailpage"]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { brokerId } = useParams();
  const broker = brokers[brokerId as keyof typeof brokers];
  
  useLockBodyScroll(showModal);


  if (!broker) {
    return <NotFound />
  }

  return (
    <div className="font-inter">
      {broker &&
        <title>
          {t("brokerdetailpage:helmet.title", { brokerName: broker.name, brokerEstimate: broker.rebateProgram[0].estimate })}
        </title>
      }

      <NavigationBar 
        name={broker.name} ranking={broker.ranking} profileImage={broker.profileImage} 
        openWebsiteModal={() => setShowModal(true)} registerUrl={broker.registerUrl} websiteUrl={broker.websiteUrl}
      />
      
      <main>
        <HeaderBroker 
          brokerId={broker.detailUrl} name={broker.name} ranking={broker.ranking} 
          badges={broker.badges} profileImage={broker.profileImage} overallScore={broker.overallScore} 
          description={broker.detailDescription} spesification={broker.specification} openWebsiteModal={() => setShowModal(true)} 
          registerUrl={broker.registerUrl} websiteUrl={broker.websiteUrl} 
        />
        
        <ProfileBroker brokerId={broker.detailUrl} profile={broker.profile}/>

        <Summary brokerId={broker.detailUrl} summaryBroker={broker.summary} />

        <TypeAccount brokerId={broker.detailUrl} accountDetail={broker.accountTypes} />

        <Spread tradingSpread={broker.tradingSpreads} />
        
        <MainAdvantage brokerId={broker.detailUrl} keyAdvantages={broker.keyAdvantages} />

        <DepositWIthdraw brokerId={broker.detailUrl} paymentMethods={broker.depositWithdrawal.paymentMethods} platforms={broker.depositWithdrawal.platforms}/>

        <RebateProgram detailData={broker.rebateProgram} />

        <ProsCons brokerId={broker.detailUrl} advantages={broker.advantages} disadvantages={broker.disadvantages} />
        
        <CommunityRating brokerId={broker.detailUrl} name={broker.name} profileImage={broker.profileImage} ranking={broker.ranking} communityRating={broker.communityRating} />

        <FaqBroker brokerId={broker.detailUrl} faq={broker.faq} />

        <CtaBroker name={broker.name} openWebsiteModal={() => setShowModal(true)} websiteUrl={broker.websiteUrl} />
      </main>

      <Footer />

      {showModal && 
        <ModalRegionsWebsite 
          isVisible={showModal} 
          handleClose={() => setShowModal(false)} 
          brokerName={broker.name}
          imageBroker={broker.profileImage}
          websiteItems={broker.registerUrl}        
        />
      }
    </div>
  );
};

export default BrokerDetailPage;
