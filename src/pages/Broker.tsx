import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { brokers } from "@/utils/dataBroker/brokers";
import Navbar from "@/components/Navbar";
import Header from "@/components/broker/Header";
import BrokerList from "@/components/broker/BrokerList";
import NotifyBroker from "@/components/broker/NotifyBroker";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Broker = () => {
  const { t } = useTranslation(["brokerpage"]);
  const [showNotify, setShowNotify] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(() => searchParams.get("search") || "");
  const allBrokers = Object.values(brokers);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    setSearchParams(params, { replace: true });
  }, [query, searchParams, setSearchParams]);


  const brokerPartners = useMemo(() => {
    if (query.length < 2) return allBrokers;
    
    return allBrokers.filter((broker) => 
      broker.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [allBrokers, query]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const valueQuery = e.target.value;
    setQuery(valueQuery);
  };

  return (
    <div className="font-inter">
      <title>{t("brokerpage:helmet.title")}</title>
      <Navbar active="broker" />
      <main>
        <Header query={query} onHandleSearch={handleSearch} />
        {brokerPartners.length === 0 ? 
          <p className="mt-6 lg:mt-8 2xl:mt-10 px-6 md:px-11 lg:px-18 xl:px-24 text-center text-black/80">
            Broker not found
          </p>
        :
          <BrokerList brokerPartners={brokerPartners} />
        }
        {showNotify && <NotifyBroker setShowNotify={setShowNotify} />}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Broker;
