import React, { useContext, useState } from "react";
import type { BankUser, ResponseBankUser } from "@/types/bank.type";
import { BankAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { BankContext } from "@/context/BankContext";

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser] = useContext(UserContext);
  const [banks, setBanks] = useState<BankUser[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
 
  const fetchBank = async () => {
    if (!authUser) return [];
    if (isFetched) return [];

    const { error, data } = await BankAPI.getBankByUser({ userId: authUser.id });
    if (!error && data) {
      const tempBank: BankUser[] = data.map((item: ResponseBankUser) => ({
        id: item.id,
        accountNumber: item.account_number,
        username: item.account_name,
        bank: item.name,
        status: item.status
      }));
      setBanks(tempBank);
      setIsFetched(true);
      return tempBank;
    } else {
      setBanks([]);
      return [];
    }
  }
  
  return (
    <BankContext.Provider value={{ banks, setBanks, fetchBank }}>
      {children}
    </BankContext.Provider>
  )
};
