import Button from "@/components/ui/Button";
import DrawerContainer from "@/components/ui/DrawerContainer";
import TextInput from "@/components/ui/TextInput";
import { formattingFullDate } from "@/helper/formattingDate";
import { validateFloatFlexible } from "@/helper/formHelper";
import { useForm } from "@/hooks/useForm";
import type { DataRebateManagement } from "@/pages/dashboard/admin/RebatesManagement";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { TiInfoLarge } from "react-icons/ti";

const DrawerRebateDetail = ({
  dataRebate,
  onCloseDrawer,
  isOpen,
  openPopUpStatus,
  onUpdateRebateById
}: { 
  dataRebate: DataRebateManagement;
  onUpdateRebateById: (rebateId: number, totalRebate: string) => Promise<boolean>;
  onCloseDrawer: () => void;
  isOpen: boolean;
  openPopUpStatus: (key: string) => void;
}) => {
  const formRebate = useForm<{ rebate: string }>({
    rebate: dataRebate.total_rebate.toLocaleString()
  });
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmitChange, setCanSubmitChange] = useState<boolean>(false);

  useEffect(() => {
    if (dataRebate.status === "pending") {
      if (formRebate.values.rebate !== dataRebate.total_rebate.toLocaleString()) {
        setIsEdited(true);
      } else {
        setIsEdited(false);
      }

      if (formRebate.values.rebate.trim() === "" || parseFloat(formRebate.values.rebate) === 0 || !validateFloatFlexible(formRebate.values.rebate)) {
        setCanSubmitChange(false);
      } else {
        setCanSubmitChange(true);
      }
    }
  }, [dataRebate.status, dataRebate.total_rebate, formRebate.values.rebate]);

  const handleSubmitChangeRebate = async () => {
    if (!isEdited || isLoading || !canSubmitChange) return;
    setIsLoading(true);

    try {
      const error = await onUpdateRebateById(dataRebate.id, formRebate.values.rebate);
      if (error) {
        setIsEdited(true);
        setCanSubmitChange(true);
      } else {
        setCanSubmitChange(false);
        setIsEdited(false);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <DrawerContainer 
      isOpen={isOpen} 
      onClose={onCloseDrawer}
      maxWCL="max-w-[460px] 2xl:max-w-[540px]"
    >
      <div className={`primary-scrollbar border-t border-l border-[#D2CEE1] bg-white overflow-y-auto
        ${!isLoading && dataRebate.status === "pending" ? "h-[calc(100vh-64px)] 2xl:h-[calc(100vh-90px)]" : "h-screen"} 
      `}>
        <div className="px-5 pr-5 py-3 h-[calc(100%-64px)] overflow-y-auto overflow-x-hidden">
          {/* HEADER */}
          <div className="pb-2 2xl:pb-4 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-xl 2xl:text-2xl font-semibold">
                Detail Rebate
              </h2>
              <div
                onClick={onCloseDrawer} 
                className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
                <IoCloseOutline 
                  className="text-2xl 2xl:text-3xl" />
              </div>
            </div>
            <p className="mt-1 text-black/60 text-base 2xl:text-xl leading-[160%]">
              Dibuat pada {formattingFullDate(dataRebate.date)} 
            </p>
            <p className="mt-1 text-sm 2xl:text-lg  leading-[160%]">
              Perubahan data total rebate hanya diperbolehkan selama status belum terverifikasi.
            </p>
          </div>

          {/* DETAIL */}
          <div className="pt-8 pb-5 space-y-4">
            {dataRebate.status !== "pending" &&
              <div className="mb-4 px-4 py-2 2xl:py-3 flex items-center gap-2 bg-[#FEF3C6]">
                <span className="flex shrink-0 items-center justify-center size-5 2xl:size-7 border border-[#BE5409] rounded-full">
                  <TiInfoLarge className="text-sm 2xl:text-lg text-[#BE5409]" />
                </span>
                <p className="text-sm 2xl:text-lg text-[#BE5409]">
                  Rebate sudah terverifikasi. Tidak dapat melakukan perubahan data
                </p>
              </div>
            }

            <div className="space-y-3">
              <div className="w-full">
                <TextInput 
                  id="account_number" 
                  label="ID Akun Trading"
                  placeholder="ID Akun Trading" 
                  value={dataRebate.account_number} 
                  onChangeForm={() => {}} 
                  typeInput="text" 
                  labelClassName="text-sm! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  required
                  disabled
                />
              </div>
              <div className="w-full">
                <TextInput 
                  id="broker_name" 
                  label="Broker"
                  placeholder="Broker" 
                  value={dataRebate.broker_name} 
                  onChangeForm={() => {}} 
                  typeInput="text" 
                  labelClassName="text-sm! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  required
                  disabled
                />
              </div>
              <div className="w-full">
                <TextInput 
                  id="rebate" 
                  label="Total Rebate"
                  placeholder="Masukkan total rebate" 
                  value={formRebate.values.rebate} 
                  onChangeForm={formRebate.handleChange} 
                  typeInput="text" 
                  inputMode="numeric"
                  labelClassName="text-sm! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  errorMessage={formRebate.errors.rebate}
                  disabled={dataRebate.status !== "pending" || isLoading}
                  required
                />
              </div>
            </div>
          </div>

          {/* BUTTON */}
          {dataRebate.status === "pending" && 
            <div className="absolute px-5 py-2 2xl:py-3 flex gap-2 left-0 bottom-0 w-full bg-white border-t border-[#D2CEE1]">
              {!isEdited ? 
                <>
                <button 
                  disabled={isLoading}
                  onClick={() => openPopUpStatus("rejected")}
                  className="py-3 flex items-center justify-center gap-2 w-full rounded-lg border border-my-red text-my-red text-sm 2xl:text-base hover:shadow-[0_0_1px_1px] shadow-my-red/80 transition-all duration-300 cursor-pointer"
                >
                  <span>Reject</span> 
                </button>
                <button 
                  disabled={isLoading}
                  onClick={() => openPopUpStatus("approved")}
                  className="py-3 flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-white text-sm 2xl:text-base cursor-pointer hover:brightness-90 transition-all duration-300"
                >
                  <FaCheck />
                  <span>Approve</span> 
                </button>
                </>
              : 
                <Button 
                  buttonType="submit"
                  onClick={handleSubmitChangeRebate}
                  disabled={!isEdited || isLoading || !canSubmitChange}
                  loading={isLoading} 
                  variant="primary-light" 
                  className="py-3! w-full! rounded-lg!"
                > Simpan Perubahan
                </Button>
              }
            </div>
          }
        </div>
      </div>
    </DrawerContainer>
  )
}

export default DrawerRebateDetail;
