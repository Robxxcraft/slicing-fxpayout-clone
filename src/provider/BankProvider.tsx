import React, { useContext, useState } from "react";
import type { BankUser } from "@/types/bank.type";
import { BankAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { BankContext } from "@/context/BankContext";

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser] = useContext(UserContext);
  const [bank, setBank] = useState<BankUser | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
 
  const fetchBank = async () => {
    if (!authUser) return;
    if (isFetched) return;

    const { error, data } = await BankAPI.getBankByUser({ userId: authUser.id });
    if (!error && data) {
      const tempBank = {
        id: data.id,
        accountNumber: data.account_number,
        username: data.account_name,
        bank: data.name,
        status: data.status
      };
      setBank(tempBank);
      setIsFetched(true);
    } else {
      setBank(null);
    }
  }
  
  return (
    <BankContext.Provider value={{ bank, setBank, fetchBank }}>
      {children}
    </BankContext.Provider>
  )
};
