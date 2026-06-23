import type { Table, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { formattingFullDate } from "@/helper/formattingDate";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { StatusType } from "@/types/status.type";
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
    accessorKey: "name",
    header: "Bank"
  },
  {
    accessorKey: "account_number",
    header: "Nomor Rekening"
  },
  {
    accessorKey: "account_name",
    header: "Pemilik Rekening"
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
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDate(getValue())
  },
];
