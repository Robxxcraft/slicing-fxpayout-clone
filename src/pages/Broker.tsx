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
import { getLocalizedPath } from "@/helper/pathHelper";
import FilterBroker from "@/components/broker/FilterBroker";
import type { EnumBrokerCategory, EnumPlatformBroker, EnumSortingBroker, RebateRange } from "@/types/databroker.type";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import ModalFilterBroker from "@/components/broker/ui/ModalFilterBroker";
import { DEFAULT_MIN_DEPOSIT, DEFAULT_PLATFORMS, DEFAULT_REBATE } from "@/constants/defaultFilterBrokerData";
import { getLocalStorage, setLocalStorage } from "@/services/apiClient";

const Broker = () => {
  const { t, i18n } = useTranslation(["common", "brokerpage"]);
  const [showNotify, setShowNotify] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const savedFilters = (() => {
    const data = getLocalStorage("broker-filters");
    return data ? JSON.parse(data) : null;
  })();

  // FILTER
  const [query, setQuery] = useState<string>(() => searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<EnumBrokerCategory>("all");
  const [selectedSort, setSelectedSort] = useState<EnumSortingBroker>("recommendation");
  const [selectedPlatforms, setSelectedPlatforms] = useState<EnumPlatformBroker[]>(savedFilters?.platforms ?? DEFAULT_PLATFORMS);
  const [selectedRebate, setSelectedRebate] = useState<RebateRange>(savedFilters?.rebate ?? DEFAULT_REBATE);
  const [selectedMinDeposit, setSelectedMinDeposit] = useState<number>(savedFilters?.minDeposit ?? DEFAULT_MIN_DEPOSIT);

  const allBrokers = Object.values(brokers);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    setLocalStorage(
      "broker-filters",
      JSON.stringify({
        rebate: selectedRebate,
        minDeposit: selectedMinDeposit,
        platforms: selectedPlatforms,
      })
    );
  }, [
    selectedRebate,
    selectedMinDeposit,
    selectedPlatforms,
  ]);

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
    let brokers = [...allBrokers];

    // Filter Kategori
    if (selectedCategory === "local") {
      brokers = brokers.filter(
        (broker) => broker.category === "local"
      );
    }

    // Filter sorting
    switch(selectedSort) {
      case "name_asc":
        brokers = brokers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        brokers = brokers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "lowest_rebate":
        brokers = brokers.sort((a, b) => {
          const minA = Math.min(
            ...a.rebateProgram.map((item) => typeof item.estimate === "number" ? item.estimate : item.estimate.min)
          );
          const minB = Math.min(
            ...b.rebateProgram.map((item) => typeof item.estimate === "number" ? item.estimate : item.estimate.min)
          );

          return minA - minB;
        }) 
        break;
      case "highest_rebate":
        brokers = brokers.sort((a, b) => {
          const maxA = Math.max(
            ...a.rebateProgram.map((item) => typeof item.estimate === "number" ? item.estimate : item.estimate.max)
          );
          const maxB = Math.max(
            ...b.rebateProgram.map((item) => typeof item.estimate === "number" ? item.estimate : item.estimate.max)
          );

          return maxB - maxA;
        }) 
    }

    // Filter search
    if (query.length >= 2) {
      brokers = brokers.filter((broker) =>
        broker.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter range rebate, min deposit, dan platforms
    brokers = brokers
      .filter((broker) => 
        broker.rebateProgram.some((item) => 
          typeof item.estimate === "number" ?
            item.estimate >= selectedRebate.start &&
            item.estimate <= selectedRebate.end
          :
            item.estimate.min >= selectedRebate.start &&
            item.estimate.max <= selectedRebate.end
        )
      )
      .filter((broker) => broker.specification.minDeposit <= selectedMinDeposit)
      .filter((broker) =>
        selectedPlatforms.length === 0 ||
        broker.depositWithdrawal.platforms.some((platform) =>
          selectedPlatforms.includes(platform.key)
        )
      )

    return brokers;
  }, [allBrokers, query, selectedCategory, selectedMinDeposit, selectedRebate, selectedPlatforms, selectedSort]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const valueQuery = e.target.value;
    setQuery(valueQuery);
  };
  const handleChangeCategory = (key: string) => {
    setSelectedCategory(key as EnumBrokerCategory);
  }
  const handleChangeSort = (key: string) => {
    setSelectedSort(key as EnumSortingBroker);
  }
  const handleApplyChanges = ({ 
    rebate, 
    minDeposit,
    platforms
  }: { 
    rebate: RebateRange; 
    minDeposit: number;
    platforms: EnumPlatformBroker[]; 
  }) => {
    setSelectedRebate(rebate);
    setSelectedMinDeposit(minDeposit);
    setSelectedPlatforms(platforms);
  }
  
  useLockBodyScroll(showFilter);

  return (
    <div className="font-inter">
      <title>{t("brokerpage:helmet.title")}</title>
      <Navbar active="broker" />
      <main>
        <Header />
        <FilterBroker 
          query={query} 
          onHandleSearch={handleSearch} 
          totalBrokers={brokerPartners.length}
          selectedCategory={selectedCategory}
          onChangeCategory={handleChangeCategory}
          selectedSort={selectedSort}
          onChangeSort={handleChangeSort}
          onShowFilter={() => setShowFilter(true)}
        />
        {brokerPartners.length === 0 ? 
          <p className="mt-6 lg:mt-8 2xl:mt-10 px-6 md:px-11 lg:px-18 xl:px-24 text-center text-black/80">
            Broker not found
          </p>
        :
          <BrokerList brokerPartners={brokerPartners} pathUrl="broker" />
        }
        {showNotify && <NotifyBroker setShowNotify={setShowNotify} />}
        <CtaSection 
          title={t("cta_trader.title")}
          paragraph={t("cta_trader.paragraph")}
          button={t("button.registerNow")}
          urlButton={getLocalizedPath("register", i18n.language)}
        />
      </main>
      <Footer />

      <ModalFilterBroker 
        isVisible={showFilter} 
        handleClose={() => setShowFilter(false)}    
        selectedRebate={selectedRebate}
        selectedMinDeposit={selectedMinDeposit}
        selectedPlatforms={selectedPlatforms}
        onApplyChanges={handleApplyChanges}
      />
    </div>
  );
};

export default Broker;
