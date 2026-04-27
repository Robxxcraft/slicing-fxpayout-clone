import type { Table, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import type { DataBank } from "@/pages/dashboard/admin/BankManagement";
import { formattingFullDate } from "@/helper/formattingDate";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { StatusType } from "@/types/status.type";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<DataBank> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<DataBank> }) => (
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
    accessorKey: "fullName",
    header: "Nama Lengkap"
  },
  {
    accessorKey: "name",
    header: "Bank"
  },
  {
    accessorKey: "accountNumber",
    header: "Nomor Rekening"
  },
  {
    accessorKey: "accountName",
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
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDate(getValue())
  },
];
