import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCoreRowModel, useReactTable, type RowSelectionState } from "@tanstack/react-table";

import { AdminAPI } from "@/api";
import { statusMapNoPendingAll } from "@/constants/statusDropdown";
import type { WithdrawalAdminManagement } from "@/types/withdrawal.type";
import { getLocalizedPath } from "@/helper/pathHelper";
import type { SetStatusType } from "@/types/status.type";
import { columnsDef } from "@/constants/columns/withdrawalManagementColumns";

import NoDataFound from "../../common/NoDataFound";
import FloatingSelection from "../../common/FloatingSelection";
import FloatingStatusSelection from "../../common/FloatingStatusSelection";
import TableDataWithdrawals from "../withdrawalManagement/TableDataWithdrawals";

import Spinner from "@/components/ui/Spinner";
import ModalConfirmation from "@/components/ui/ModalConfirmation";

import { HiArrowLongRight } from "react-icons/hi2";

type RecentTransactionsAdminProps = {
  dataWithdrawals: WithdrawalAdminManagement[];
  onChangeStatusData: (ids: number[], newStatus: SetStatusType) => void;
  onChangeLoad: (load: boolean) => void;
  isLoading: boolean;
};

const RecentTransactionsAdmin = ({
  dataWithdrawals,
  onChangeStatusData,
  onChangeLoad,
  isLoading,
}: RecentTransactionsAdminProps) => {
  const { i18n } = useTranslation();
  
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  
  const tableInstance = useReactTable({
    columns: columnsDef,
    data: dataWithdrawals,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    pageCount: 1,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });

  const openPopUpStatus = (key: string) => {
    setShowPopupStatus(true);
    setSelectedStatusChange(key as SetStatusType)
  }

  const handleChangeStatusWithdrawals = async () => {
    if (isLoading || !selectedStatusChange) return;
    
    onChangeLoad(true);
    const withdrawalIds = tableInstance.getSelectedRowModel().flatRows.map((item) => Number(item.original.id));
    const { error, message } = await AdminAPI.bulkChangeStatusWithdrawals({
      withdrawalIds, status: selectedStatusChange
    });
    if (error) {
      toast.error(message);
    } else {
      onChangeStatusData(withdrawalIds, selectedStatusChange);
      tableInstance.resetRowSelection();
      toast.success(message);
    }
    setShowPopupStatus(false);
    onChangeLoad(false);
  }

  return (
    <>
      <section className="mt-8 2xl:mt-10">

        {/* HEADER */}
        <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <h2 className="text-2xl 2xl:text-[2rem] font-semibold">
              Recent Transactions
            </h2>
            <p className="text-base 2xl:text-xl text-black/80 md:max-w-[760px] leading-[169.2%]">
              Daftar transaksi penarikan dana terbaru yang diajukan oleh pengguna.
            </p>
          </div>
          <Link to={getLocalizedPath("dashboard/withdrawal", i18n.language)} className="flex items-center gap-3 text-primary">
            <p className="text-base 2xl:text-xl">Lihat Semua</p>
            <HiArrowLongRight className="text-2xl" />
          </Link>
        </div>

          {/* TABLE */}
          <TableDataWithdrawals
            tableInstance={tableInstance}
            isLoading={isLoading}
          />

          {/* LOADING & 0 DATA TABLE */}
          {dataWithdrawals.length === 0 && isLoading &&
            <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
              <Spinner />
            </div>
          }
          {dataWithdrawals.length === 0 && !isLoading &&
            <NoDataFound useImage>
              Belum ada laporan penarikan dana yang dilakukan oleh pengguna.
            </NoDataFound>
          }
      </section>

      {/* FLOATING SECTION */}
      {tableInstance.getSelectedRowModel().flatRows.length > 0 &&
        (tableInstance.getSelectedRowModel().flatRows.filter(row => row.getValue("status") === "approved").length === 0 ?
        <FloatingStatusSelection 
          selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
          onClose={() => tableInstance.resetRowSelection()} 
          onChangeStatus={openPopUpStatus} 
          command="Ubah Status"
          objectsInput={statusMapNoPendingAll}
        />
        :
          <FloatingSelection 
            selectedNumber={tableInstance.getSelectedRowModel().flatRows.length} 
            onClose={() => tableInstance.resetRowSelection()} 
          />
        )
      }

      {showPopupStatus && <ModalConfirmation
        title={`Konfirmasi 
          ${selectedStatusChange === "approved" ? "Persetujuan":""} 
          ${selectedStatusChange === "rejected" ? "Penolakan":""}
          ${tableInstance.getSelectedRowModel().flatRows.length} 
          Penarikan Dana`}
        paragraph={`Apakah Anda yakin ingin 
          ${selectedStatusChange === "approved" ? "menyetujui":""}
          ${selectedStatusChange === "rejected" ? "menolak":""}
        status penarikan dana yang dipilih? Tindakan tidak dapat dibatalkan.`}
        handleConfirmation={handleChangeStatusWithdrawals}
        btnConfirmation={selectedStatusChange === "rejected" ? "danger" : "primary-light"}
        isVisible={showPopupStatus} 
        handleClose={() => setShowPopupStatus(false)} 
        cancelText="Batal"
        confirmText={selectedStatusChange === "rejected" ? "Reject" : "Approve"}
      />}  
    </>
  )
}

export default RecentTransactionsAdmin;
