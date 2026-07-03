import BrokerList from "@/components/broker/BrokerList";
import Header from "@/components/broker/Header";
import Button from "@/components/ui/Button";
import { filterBrokerByCategory } from "@/helper/filterBroker";
import { getLocalizedPath } from "@/helper/pathHelper";
import type { EnumBrokerCategory } from "@/types/databroker.type";
import { brokers } from "@/utils/dataBroker/brokers";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterBroker from "./ui/FilterBroker";

const BrokerListSection = () => {
  const { t, i18n } = useTranslation(["homepage"]);
  const [selectedCategory, setSelectedCategory] = useState<EnumBrokerCategory>("international");
  
  const allBrokers = Object.values(brokers);
  const brokerPartners = useMemo(() => {
    const filteredBrokers = filterBrokerByCategory(allBrokers, selectedCategory);

    return filteredBrokers;
  }, [allBrokers, selectedCategory]);

  const handleChangeCategory = (key: string) => {
    setSelectedCategory(key as EnumBrokerCategory);
  }

  return (
    <>
      <Header />
      <FilterBroker
        selectedCategory={selectedCategory}
        onChangeCategory={handleChangeCategory}
      />
      {brokerPartners.length === 0 ? 
        <p className="mt-6 lg:mt-8 3xl:mt-10 px-6 md:px-11 lg:px-18 xl:px-24 text-center text-black/80">
          Broker not found
        </p>
      :
        <BrokerList brokerPartners={brokerPartners} pathUrl="" />
      }
      
      {brokerPartners.length > 6 &&
        <div className="px-6 pt-3 md:pt-6 3xl:pt-10 w-full text-center">
          <Button 
            buttonType="link" 
            urlTo={getLocalizedPath("/broker", i18n.language)}
            variant="primary-light"
            className="w-full! md:w-fit!"
          >
            {t("homepage:brokerlistsection.view_all_brokers")}
          </Button>
        </div>
      }
    </>
  )
}

export default BrokerListSection;
