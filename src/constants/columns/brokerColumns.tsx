import type { Table, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { formattingFullDate } from "@/helper/formattingDate";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { StatusType } from "@/types/status.type";
import type { DataBroker } from "@/pages/dashboard/admin/BrokersManagement";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<DataBroker> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<DataBroker> }) => (
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
    accessorKey: "username",
    header: "Username"
  },
  {
    accessorKey: "broker",
    header: "Broker"
  },
  {
    accessorKey: "accountNumber",
    header: "ID Trading"
  },
  {
    accessorKey: "platform",
    header: "Platform"
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
