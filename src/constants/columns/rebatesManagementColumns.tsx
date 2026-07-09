import type { Table, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { formattingFullDateTime } from "@/helper/formattingDate";
import StatusTag from "@/components/dashboard/common/StatusTag";
import type { RebateStatusType } from "@/types/status.type";
import { formattingUsd } from "@/helper/formattingCurrency";
import type { RebateAdminManagement } from "@/types/rebate.type";

export const columnsDef = [
  {
    id: "select",
    header: ({ table }: { table: Table<RebateAdminManagement> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<RebateAdminManagement> }) => (
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
    accessorKey: "date",
    header: "Tanggal Dibuat",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDateTime(getValue())
  },
  {
    accessorKey: "account_number",
    header: "ID Akun Trading"
  },
  {
    accessorKey: "broker_name",
    header: "Broker"
  },
  {
    accessorKey: "total_rebate",
    header: "Total Rebate",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(Number(getValue() || 0)),
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
        value === "approved" ? "Approved" :
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
    accessorKey: "trader_earning",
    header: "Trader Earn",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(Number(getValue() || 0)),
    enableSorting: false
  },
  {
    accessorKey: "affiliate_earning",
    header: "Refferal Partner Earn",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(Number(getValue() || 0)),
    enableSorting: false
  },
  {
    accessorKey: "internal_earning",
    header: "Internal Earn",
    cell: ({ getValue }: { getValue: () => string }) => formattingUsd(Number(getValue() || 0)),
    enableSorting: false
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Diperbarui",
    cell: ({ getValue }: { getValue: () => string }) => formattingFullDateTime(getValue())
  },
];
