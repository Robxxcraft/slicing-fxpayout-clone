import React, { useContext, useState } from "react";
import { BrokerAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { BrokerUserContext } from "@/context/BrokerUserContext";
import type { BrokerUser } from "@/types/broker.type";
import type { StatusType } from "@/types/status.type";

export const BrokerUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser] = useContext(UserContext);
  const [brokersUser, setBrokerUser] = useState<BrokerUser[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
 
  const fetchBrokerUser = async (force: boolean = false) => {
    if (!authUser) return;
    if (isFetched && !force) return;

    const { error, data } = await BrokerAPI.getBrokerByUser({ userId: authUser.id });
    if (!error && data) {
      const tempBroker = data.map((response: { 
        id: number;
        broker_id: number; 
        broker: { name: string; }; 
        account_number: string; 
        platform: string; 
        created_at: string; 
        updated_at: string; 
        status: StatusType; 
      }) => ({
          connectionId: response.id,
          brokerId: response.broker_id,
          name: response.broker.name,
          accountNumber: response.account_number,
          platform: response.platform,
          createdAt: response.created_at,
          updatedAt: response.updated_at,
          status: response.status
        }
      ));
      setBrokerUser(tempBroker);
      setIsFetched(true);
    } else {
      setBrokerUser([]);
    }
  }
  
  return (
    <BrokerUserContext.Provider value={{ brokersUser, setBrokerUser, fetchBrokerUser }}>
      {children}
    </BrokerUserContext.Provider>
  )
};
