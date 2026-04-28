import StatusTag from "@/components/dashboard/common/StatusTag";
import type { StatusType } from "@/types/status.type";

export const columnsDef = [
  {
    accessorKey: "user",
    header: "Trader"
  },
  {
    accessorKey: "broker",
    header: "Broker"
  },
  {
    accessorKey: "account_number",
    header: "Nomor Akun Trading"
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
    accessorKey: "total_rebate",
    header: "Total Rebate"
  },
];
