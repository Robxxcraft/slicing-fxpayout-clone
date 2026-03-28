import BrokerList from "@/components/broker/BrokerList";
import Header from "@/components/broker/Header";
import Button from "@/components/ui/Button";
import { getLocalizedPath } from "@/helper/pathHelper";
import { brokers } from "@/utils/dataBroker/brokers";
import { useTranslation } from "react-i18next";

const BrokerListSection = () => {
  const { i18n } = useTranslation();
  const allBrokers = Object.values(brokers);

  return (
    <>
      <Header />
      {allBrokers.length === 0 ? 
        <p className="mt-6 lg:mt-8 2xl:mt-10 px-6 md:px-11 lg:px-18 xl:px-24 text-center text-black/80">
          Broker not found
        </p>
      :
        <BrokerList brokerPartners={allBrokers} pathUrl="" />
      }
      
      <div className="px-6 pt-3 md:pt-6 2xl:pt-10 w-full text-center">
        <Button 
          buttonType="link" 
          urlTo={getLocalizedPath("/broker", i18n.language)}
          variant="primary-light"
          className="w-full! md:w-fit!"
        >
          Lihat Semua Broker
        </Button>
      </div>
    </>
  )
}

export default BrokerListSection;
