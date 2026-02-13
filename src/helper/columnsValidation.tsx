import { formattingFullDate } from "./formattingDate";
import type { Table, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import type { ValidationData } from "@/models/validationData";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<ValidationData> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<ValidationData> }) => (
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  {
    accessorKey: "full_name",
    header: "Nama Lengkap"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "broker",
    header: "Broker"
  },
  {
    accessorKey: "platform",
    header: "Platform Trading"
  },
  {
    accessorKey: "trading_account_number",
    header: "Nomor Akun Trading"
  },
  {
    accessorKey: "phone_number",
    header: "Nomor Handphone"
  },
  {
    accessorKey: "rebate",
    accessorFn: (row: ValidationData) => row.rebate === "bank" ? "Bank" : "Akun Trading",
    header: "Rebate"
  },
  {
    accessorKey: "bank",
    header: "Nama Bank"
  },
  {
    accessorKey: "bank_account_number",
    header: "Nomor Rekening"
  },
  {
    accessorKey: "bank_account_name",
    header: "Username Akun Bank"
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dikirim",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDate(getValue())
  },
  {
    id: "status",
    accessorFn: (row: ValidationData) => row.status === undefined ? "-" : `${row.status[0].toUpperCase()}${row.status.slice(1)}`,
    header: "Status"
  },
];
