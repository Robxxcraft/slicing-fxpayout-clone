import StatusTag from "@/components/dashboard/common/StatusTag";
import { formattingUsd } from "@/helper/formattingCurrency";
import type { StatusType } from "@/types/status.type";

export const columnsDef = [
  {
    accessorKey: "account_number",
    header: "Nomor Akun Trading"
  },
  {
    id: "broker_name",
    accessorKey: "broker",
    header: "Broker"
  },
  {
    id: "user",
    accessorKey: "trader",
    header: "Trader"
  },
  {
    id: "status",
    accessorKey: "status",
    cell: ({ getValue }: { getValue: () => string }) => {
      const value = getValue() as string;
      // Logika teks status dipindah ke sini
      const textStatus = 
        value === "pending" ? "Verifying" : 
        value === "approved" ? "Approved" : "Rejected";

      return (
        <div className="w-fit">
          <StatusTag status={value as StatusType} text={textStatus} />
        </div>
      );
    },
    header: "Status"
  },
  {
    accessorKey: "total_rebates",
    header: "Total Rebate",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(getValue() ? Number(getValue()) : 0)
  },
];
