import React, { useContext, useState } from "react";
import { TraderAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { BrokerUserContext } from "@/context/BrokerUserContext";
import type { BrokerUser } from "@/types/broker.type";
import type { StatusType } from "@/types/status.type";
import type { MetaPage } from "@/types/metapage.type";

type ResponseBrokerUser = { 
  broker_user_id: number;
  broker_id: number; 
  broker_name: string; 
  account_number: string; 
  created_at: string; 
  total_rebate: string; 
  status: StatusType; 
};

export const BrokerUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser] = useContext(UserContext);
  const [brokersUser, setBrokerUser] = useState<BrokerUser[]>([]);
  const [metaPage, setMetaPage] = useState<MetaPage>({
    pageIndex: 0,
    pageTotal: 0,
    limit: 0,
    totalData: 0
  });
  const [isFetched, setIsFetched] = useState<boolean>(false);
 
  const fetchBrokerUser = async (
    force: boolean = false, 
    filters?: {
      page?: number;
      limit?: number;
      query?: string;
      status?: StatusType;
    }) => {
    if (!authUser) return;
    if (isFetched && !force) return;

    try {
      const { error, message, data } = await TraderAPI.getBrokerByTrader({ 
        status: filters?.status,
        limit: filters?.limit || metaPage.limit,
        page: filters?.page || metaPage.pageIndex,
        query: filters?.query,
      });
      if (!error && data) {
        const tempBroker = data.data.map((response: ResponseBrokerUser) => ({
            connectionId: response.broker_user_id,
            brokerId: response.broker_id,
            name: response.broker_name,
            accountNumber: response.account_number,
            createdAt: response.created_at,
            totalRebate: response.total_rebate,
            status: response.status
          }
        ));
        setBrokerUser(tempBroker);
        setMetaPage({
          pageIndex: data.meta.page,
          pageTotal: data.meta.total_pages,
          limit: data.meta.limit,
          totalData: data.meta.total
        });
        setIsFetched(true);
        return { error, message }
      }
      
      setBrokerUser([]);
      return { error, message }
    } catch (error) {
      console.error(error);
      return { error: true, message: "Please try again later. Internal Server Error." }
    }
  }
  
  return (
    <BrokerUserContext.Provider value={{ brokersUser, setBrokerUser, fetchBrokerUser, metaPage }}>
      {children}
    </BrokerUserContext.Provider>
  )
};
