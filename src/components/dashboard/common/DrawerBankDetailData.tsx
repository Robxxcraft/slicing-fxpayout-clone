import { BankAPI } from "@/api";
import Button from "@/components/ui/Button";
import DrawerContainer from "@/components/ui/DrawerContainer";
import TextInput from "@/components/ui/TextInput";
import { scrollToErrorInput } from "@/helper/formHelper";
import { checkValidBankForm } from "@/helper/validationForm/bankFormValidation";
import { useBankContext } from "@/hooks/useBankContext";
import { useForm } from "@/hooks/useForm";
import type { BankFormDetail, BankUser } from "@/types/bank.type";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const DrawerBankDetailData = ({
  bankData,
  onCloseDrawer,
  isOpen
}: {
  bankData: BankUser | null;
  onCloseDrawer: () => void;
  isOpen: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const { setBank } = useBankContext();
  const formBank = useForm<BankFormDetail>({
    bank: bankData?.bank || "",
    accountNumber: bankData?.accountNumber || "",
    username: bankData?.username || ""
  });

  useEffect(() => {
    if (formBank.values.bank.trim() === "" || formBank.values.username.trim() === "" || formBank.values.accountNumber.trim() === "") {
      setIsEdited(false);
    } else {
      setIsEdited(true);
    }
    if (bankData) {
      const stringFormDetail = JSON.stringify(formBank.values);
      const stringBankData = JSON.stringify({
        bank: bankData.bank,
        accountNumber: bankData.accountNumber,
        username: bankData.username
      });

      setIsEdited(stringFormDetail !== stringBankData);
    }
  }, [formBank.values, bankData]);
  
  const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !isEdited) return;
    setIsLoading(true);
    
    try {
      const { isValidate, errorInput } = formBank.validate(checkValidBankForm);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
      let responseApi;
      if (bankData) {
        responseApi = await BankAPI.updateBankUser({ form: formBank.values, bankId: bankData.id });
      } else {
        responseApi = await BankAPI.createBankUser({ form: formBank.values });
      }
      if (!responseApi.error) {
        if (bankData) {
          setBank((prev) => {
            if (!prev) return prev; 
            return {
              ...prev,
              bank: formBank.values.bank,
              accountNumber: formBank.values.accountNumber,
              username: formBank.values.username,
              status: "pending"
          }});
        } else {
          setBank({
            id: 0,
            bank: formBank.values.bank,
            accountNumber: formBank.values.accountNumber,
            username: formBank.values.username,
            status: "pending"
          });
        }
        toast.success("Berhasil memperbarui data bank");
        onCloseDrawer();
      } else {
        toast.error(responseApi.message);
      }

    } finally {
      setIsLoading(false);
    }
  }
  return (
    <DrawerContainer 
      isOpen={isOpen} 
      onClose={onCloseDrawer}
      maxWCL="max-w-[460px]"
    >
      <div className="py-5 w-full h-[calc(100dvh-64px)] 2xl:h-[calc(100dvh-90px)] border-t border-l border-[#D2CEE1] bg-white">
        <div className="px-5 2xl:pb-2 relative pr-5 flex items-center justify-between border-b border-[#D2CEE1]">
          <h2 className="text-xl 2xl:text-2xl font-medium">
            Akun Bank
          </h2>
          <div
            onClick={onCloseDrawer} 
            className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
            <IoCloseOutline 
              className="text-2xl 2xl:text-3xl" />
          </div>
        </div>
        <form onSubmit={handleSubmitData} className="h-full">
          <div className="pt-2 2xl:pt-4 pb-4 px-5 flex flex-col gap-4 w-full h-[calc(100%-80px)] 2xl:h-[calc(100%-100px)] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-wrap gap-2.5 2xl:gap-4">
              <div className="w-full">
                <TextInput 
                  id="bank" 
                  label="Bank"
                  placeholder="Masukkan nama bank" 
                  value={formBank.values.bank} 
                  onChangeForm={formBank.handleChange} 
                  typeInput="text" 
                  labelClassName="text-sm! 2xl:text-lg! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  errorMessage={formBank.errors.bank}
                  required
                />
              </div>
              <div className="w-full">
                <TextInput 
                  id="accountNumber" 
                  label="Nomor Rekening"
                  placeholder="Masukkan nomor rekening" 
                  value={formBank.values.accountNumber} 
                  onChangeForm={formBank.handleChange} 
                  typeInput="text"
                  inputMode="numeric"
                  labelClassName="text-sm! 2xl:text-lg! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  errorMessage={formBank.errors.accountNumber}
                  helperText="Gunakan angka saja tanpa tanda baca" 
                  helperTextClassName="text-sm! 2xl:text-lg!"
                  required
                />
              </div>
              <div className="w-full">
                <TextInput 
                  id="username" 
                  label="Nama Pemilik Rekening"
                  placeholder="Masukkan nama pemilik rekening" 
                  value={formBank.values.username} 
                  onChangeForm={formBank.handleChange} 
                  typeInput="text"
                  inputMode="text"
                  autoComplete="name"
                  labelClassName="text-sm! 2xl:text-lg! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  errorMessage={formBank.errors.username} 
                  helperText="Pastikan nama sesuai dengan yang tertera di buku tabungan atau aplikasi m-banking Anda."
                  helperTextClassName="text-sm! 2xl:text-lg!"
                  required
                />
              </div>
            </div>
          </div>
          <div className="absolute px-5 py-2 left-0 bottom-0 w-full bg-white border-t border-[#D2CEE1]">
            <Button 
              buttonType="submit"
              disabled={!isEdited || isLoading}
              loading={isLoading} 
              variant="primary-light" 
              className="py-3! w-full! rounded-lg!"
            > Simpan Rekening
            </Button>
          </div>
        </form>
      </div>
    </DrawerContainer>
  )
}

export default DrawerBankDetailData;
