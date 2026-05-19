import { formattingFullDateTime } from "@/helper/formattingDate";
import { formattingUsd } from "@/helper/formattingCurrency";
import { Link } from "react-router-dom";
import { getLocalizedPath } from "@/helper/pathHelper";
import { formatingUrlBroker } from "@/helper/formattingUrlBroker";
import type { TypeRebateTrader } from "@/types/rebate.type";

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
    accessorKey: "rebate",
    accessorFn: (row: TypeRebateTrader) => formattingUsd(Number(row.rebate)),
    header: "Rebate"
  }
];
