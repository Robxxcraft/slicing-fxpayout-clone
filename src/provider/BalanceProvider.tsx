// import React, { useContext, useState } from "react";
// import { AuthAPI } from "@/api";
// import UserContext from "@/context/UserContext";
// import type { UserBalance } from "@/types/user.type";
// import { BalanceContext } from "@/context/BalanceContext";

// export const BalanceProvider = ({ children }: { children: React.ReactNode }) => {
//   const [authUser] = useContext(UserContext);
//   const [balance, setBalance] = useState<UserBalance | null>(null);
//   const [isFetched, setIsFetched] = useState<boolean>(false);
 
//   const fetchBalance = async () => {
//     if (!authUser) return;
//     if (isFetched) return;

//     const { error, data } = await AuthAPI.getBalanceUser();
//     if (!error && data) {
//       const tempBalance = {
//         userId: authUser.id,
//         balance: data.amount,
//         currency: data.currency,
//       };
//       setBalance(tempBalance);
//       setIsFetched(true);
//     } else {
//       setBalance(null);
//     }
//   }
  
//   return (
//     <BalanceContext.Provider value={{ balance, setBalance, fetchBalance }}>
//       {children}
//     </BalanceContext.Provider>
//   )
// };
