import { AdminOverviewContext } from "@/context/AdminOverviewContext";
import { useContext } from "react";

export const useAdminOverviewContext = () => {
  const context = useContext(AdminOverviewContext);
  if (!context) {
    throw new Error("useAdminOverviewContext must be used within AdminOverviewProvider");
  }
  return context;
};