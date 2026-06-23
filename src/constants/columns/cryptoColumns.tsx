import type { Table, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { formattingFullDate } from "@/helper/formattingDate";
import type { WalletAdminManagement } from "@/types/wallet.type";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<WalletAdminManagement> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<WalletAdminManagement> }) => (
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
    id: "user",
    accessorKey: "full_name",
    header: "Nama Lengkap"
  },
  {
    accessorKey: "wallet_address",
    header: "Alamat Wallet"
  },
  {
    accessorKey: "token",
    header: "Token"
  },
  {
    accessorKey: "network",
    header: "Network"
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDate(getValue())
  },
];
