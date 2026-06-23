import { formattingFullDateTime } from "@/helper/formattingDate";
import { formattingUsd } from "@/helper/formattingCurrency";

export const columnsDef = [
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDateTime(getValue())
  },
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
    accessorKey: "total_rebate",
    header: "Total Rebate",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(Number(getValue() || 0))
  },
  {
    accessorKey: "commission",
    header: "Komisi",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(Number(getValue() || 0))
  },
];
