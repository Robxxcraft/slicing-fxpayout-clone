import React, { useContext, useState } from "react";
import type { ResponseBankUser, ResponseCryptoUser, WalletUser } from "@/types/wallet.type";
import { BankAPI, CryptoAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { WalletContext } from "@/context/WalletContext";
import type { StatusType } from "@/types/status.type";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser] = useContext(UserContext);
  const [wallets, setWallets] = useState<WalletUser[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
 
  const fetchBank = async (userId: number) => {
    const { error, data } = await BankAPI.getBankByUser({ userId });
    if (!error && data) {
      const tempBank: WalletUser[] = data.map((item: ResponseBankUser): WalletUser => ({
        id: item.id,
        method: "bank",
        data: {
          accountNumber: item.account_number,
          username: item.account_name,
          bank: item.name,
        },
        status: item.status as StatusType
      }));
      return tempBank;
    } else {
      return [];
    }
  }
  const fetchCrypto = async (userId: number) => {
    const { error, data } = await CryptoAPI.getCryptoByUser({ userId });
    if (!error && data) {
      const tempCrypto: WalletUser[] = data.map((item: ResponseCryptoUser): WalletUser => ({
        id: item.id,
        method: "crypto",
        data: {
          accountNumber: item.wallet_address,
          token: item.token as "USDT",
          network: item.network as "BNB",
        },
        status: "approved"
      }));
      return tempCrypto;
    } else {
      return [];
    }
  }

  const fetchWallet = async () => {
    if (!authUser) return [];
    if (isFetched) return [];

    const respBank = await fetchBank(authUser.id);
    const respCrypto = await fetchCrypto(authUser.id);
    const concatWallet = respBank.concat(respCrypto);
    setWallets(concatWallet);
    
    setIsFetched(true);
    return concatWallet;
  }
  
  return (
    <WalletContext.Provider value={{ wallets, setWallets, fetchWallet }}>
      {children}
    </WalletContext.Provider>
  )
};
