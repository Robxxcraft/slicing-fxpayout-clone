import type { Table, Row } from "@tanstack/react-table";
import StatusTag from "@/components/dashboard/common/StatusTag";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { formattingFullDate } from "@/helper/formattingDate";
import type { DataWithdrawalManagement } from "@/pages/dashboard/admin/WithdrawalRequestManagement";
import type { StatusType } from "@/types/status.type";
import { formattingRp, formattingUsd } from "@/helper/formattingCurrency";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<DataWithdrawalManagement> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<DataWithdrawalManagement> }) => (
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
    accessorKey: "id",
    accessorFn: (row: DataWithdrawalManagement) => `#WD-F${row.id.toString().padStart(3, "X")}`,
    header: "ID",
    enableSorting: false
  },
  {
    accessorKey: "method",
    accessorFn: (row: DataWithdrawalManagement) => row.method === "bank" ? "Bank" : "Crypto",
    header: "Metode",
    enableSorting: false
  },
  {
    accessorKey: "bank_name",
    header: "Bank"
  },
  {
    id: "user",
    accessorKey: "account_name",
    header: "Pemilik Rekening"
  },
  {
    accessorKey: "wallet_address",
    header: "Alamat Penarikan"
  },
  {
    accessorKey: "currency",
    header: "Currency",
    enableSorting: false
  },
  {
    accessorKey: "total",
    accessorFn: (row: DataWithdrawalManagement) => row.currency === "USD" ? formattingUsd(Number(row.total)) : formattingRp(Number(row.total)),
    header: "Total Penarikan",
    enableSorting: false
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
