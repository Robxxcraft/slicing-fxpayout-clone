import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { brokers } from "@/utils/dataBroker/brokers";
import Navbar from "@/components/Navbar";
import Header from "@/components/broker/Header";
import BrokerList from "@/components/broker/BrokerList";
import NotifyBroker from "@/components/broker/NotifyBroker";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";

const Broker = () => {
  const [showNotify, setShowNotify] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(() => searchParams.get("search") || "");
  const allBrokers = Object.values(brokers);

  useEffect(() => {
    document.title = "Daftar Broker Partner dan Detail | FX Payout";
  }, []);

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
      <Navbar active="broker" />
      <main>
        <Header query={query} onHandleSearch={handleSearch} />
        <BrokerList brokerPartners={brokerPartners} />
        {showNotify && <NotifyBroker setShowNotify={setShowNotify} />}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Broker;
