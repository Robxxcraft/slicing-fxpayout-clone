import { formattingFullDateTime } from "@/helper/formattingDate";
import { formattingUsd } from "@/helper/formattingCurrency";
import { Link } from "react-router-dom";
import { getLocalizedPath } from "@/helper/pathHelper";
import { formatingUrlBroker } from "@/helper/formattingUrlBroker";
import type { TypeRebateTrader } from "@/types/rebate.type";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { RebateStatusType } from "@/types/status.type";

export const getColumnsDef = (lang: string) => [
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDateTime(getValue()) 
  },
  {
    accessorKey: "broker",
    header: "Broker",
    cell: ({ getValue }: { getValue: () => string }) => {
      const value = getValue();

      return (
        <Link to={getLocalizedPath(`trader/rebate/${formatingUrlBroker(value)}`, lang)}
          className="text-primary underline"
        >
          {value}
        </Link>
      );
    },
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
        value === "approved" ? "Manual Credited" :
        value === "auto_credited" ? "Auto Credited" : "Rejected";

      return (
        <div className="w-fit">
          <StatusTag status={value as RebateStatusType} text={textStatus} />
        </div>
      );
    },
    header: "Status"
  },
  {
    accessorKey: "rebate",
    accessorFn: (row: TypeRebateTrader) => formattingUsd(Number(row.rebate)),
    header: "Rebate"
  }
];
