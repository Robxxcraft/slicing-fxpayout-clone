import type { Table, Row } from "@tanstack/react-table";
import StatusTag from "@/components/dashboard/common/StatusTag";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { formattingFullDate } from "@/helper/formattingDate";
import type { StatusType } from "@/types/status.type";
import type { DataAffiliatorAdmin } from "@/pages/dashboard/admin/AffiliatorsManagement";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<DataAffiliatorAdmin> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<DataAffiliatorAdmin> }) => (
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
    header: "Nama Lengkap",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "total_referred",
    header: "Total Referral",
    enableSorting: false
  },
  {
    id: "status",
    accessorKey: "status",
    cell: ({ getValue }: { getValue: () => string }) => {
      const value = getValue();
      const textStatus = 
        value === "pending" ? "Verifying" : "Approved";

      return (
        <div className="w-fit">
          <StatusTag status={value as StatusType} text={textStatus} />
        </div>
      );
    },
    header: "Status",
    enableSorting: false
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDate(getValue()),
    enableSorting: false
  },
];
