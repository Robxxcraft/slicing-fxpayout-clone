import { formattingFullDateTime } from "@/helper/formattingDate";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { StatusType } from "@/types/status.type";

export const columnsDef = [
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDateTime(getValue())
  },
  {
    accessorKey: "method",
    header: "Metode"
  },
  {
    accessorKey: "wallet_address",
    header: "Alamat Wallet"
  },
  {
    id: "status",
    accessorKey: "status",
    cell: ({ getValue }: { getValue: () => string }) => {
      const value = getValue();
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
    accessorKey: "currency",
    header: "Currency"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }: { getValue: () => string }) => `-${getValue()}`
  },
];
