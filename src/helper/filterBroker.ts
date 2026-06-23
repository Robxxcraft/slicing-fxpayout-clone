import type { EnumBrokerCategory } from "@/types/databroker.type";
import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";

export const filterBrokerByCategory = (brokers: BrokerStruc[], category: EnumBrokerCategory) => {
    if (category === "local") {
      const filteredBroker = brokers.filter(
        (broker) => broker.category === "local"
      );
      return filteredBroker;
    }

    return brokers;
};
