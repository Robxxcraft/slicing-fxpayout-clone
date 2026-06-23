import { BankAPI, CryptoAPI } from "@/api";
import Button from "@/components/ui/Button";
import DrawerContainer from "@/components/ui/DrawerContainer";
import SelectInput from "@/components/ui/SelectInput";
import { scrollToErrorInput } from "@/helper/formHelper";
import { checkValidBankForm, checkValidCryptoForm } from "@/helper/validationForm/walletFormValidation";
import { useWalletContext } from "@/hooks/useWalletContext";
import { useForm } from "@/hooks/useForm";
import type { WalletFormDetail, WalletUser } from "@/types/wallet.type";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import InputCryptoForm from "./InputCryptoForm";
import InputBankForm from "./InputBankForm";

const DrawerWalletDetailData = ({
  walletData,
  onCloseDrawer,
  isOpen,
  onShowPopupDeleteWallet
}: {
  walletData: WalletUser | null;
  onCloseDrawer: () => void;
  isOpen: boolean;
  onShowPopupDeleteWallet: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const { setWallets, fetchWallet } = useWalletContext();
  const formWallet = useForm<WalletFormDetail>({
    method: walletData ? walletData.method : "bank",
    accountNumber: walletData ? walletData.data.accountNumber : "",
    bank: (walletData && walletData.method === "bank") ? walletData.data.bank : "",
    username: (walletData && walletData.method === "bank") ? walletData.data.username : "",
    token: (walletData && walletData.method === "crypto") ? walletData.data.token : "USDT",
    network: (walletData && walletData.method === "crypto") ? walletData.data.network : "BNB"
  });

  useEffect(() => {
    if (walletData) {
      let isSameValue;
      if (walletData.method === "bank") {
        const stringFormDetail = JSON.stringify({
          bank: formWallet.values.bank,
          accountNumber: formWallet.values.accountNumber,
          username: formWallet.values.username
        });
        const stringBankData = JSON.stringify({
          bank: walletData.data.bank,
          accountNumber: walletData.data.accountNumber,
          username: walletData.data.username
        });
        isSameValue = stringFormDetail === stringBankData;
      } else {
        const stringFormDetail = JSON.stringify({
          token: formWallet.values.token,
          accountNumber: formWallet.values.accountNumber,
          network: formWallet.values.network
        });
        const stringCryptoData = JSON.stringify({
          token: walletData.data.token,
          accountNumber: walletData.data.accountNumber,
          network: walletData.data.network
        });
        isSameValue = stringFormDetail === stringCryptoData;
      }

      setIsEdited(!isSameValue);
    }

    if ((formWallet.values.bank && formWallet.values.bank.trim() === "") 
      || (formWallet.values.username && formWallet.values.username.trim() === "") 
      || formWallet.values.accountNumber.trim() === ""
    ) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
    }
  }, [formWallet.values, walletData]);

  const submitBankForm = async () => {
    const { isValidate, errorInput } = formWallet.validate(checkValidBankForm);
    if (!isValidate && errorInput !== null) {
      scrollToErrorInput(errorInput);
      return;
    }
    let responseApi;
    if (walletData) {
      responseApi = await BankAPI.updateBankUser({ form: formWallet.values, bankId: walletData.id });
    } else {
      responseApi = await BankAPI.createBankUser({ form: formWallet.values });
    }
    if (!responseApi.error && responseApi.data) {
      if (walletData) {
        setWallets((prev) => 
          prev.map((item) => {
            if (item.id === walletData.id && item.method === "bank") {
              return {
                ...item,
                data: {
                  bank: formWallet.values.bank,
                  accountNumber: formWallet.values.accountNumber,
                  username: formWallet.values.username,
                },
                status: "pending"
              }
            }
            return item;
          }
        ));
      } else {
        const newBank: WalletUser = {
          id: responseApi.data.id,
          method: "bank",
          data: {
            bank: formWallet.values.bank,
            accountNumber: formWallet.values.accountNumber,
            username: formWallet.values.username,
          },
          status: "pending" as const
        };
        setWallets((prev) => [...prev, newBank]);
        
        await fetchWallet();
      }
      toast.success("Berhasil memperbarui data bank");
      onCloseDrawer();
    } else {
      toast.error(responseApi.message);
    }
  };
  const submitCryptoForm = async () => {
    const { isValidate, errorInput } = formWallet.validate(checkValidCryptoForm);
    if (!isValidate && errorInput !== null) {
      scrollToErrorInput(errorInput);
      return;
    }
    let responseApi;
    if (walletData) {
      responseApi = await CryptoAPI.updateCryptoUser({ form: formWallet.values, cryptoId: walletData.id });
    } else {
      responseApi = await CryptoAPI.createCryptoUser({ form: formWallet.values });
    }
    if (!responseApi.error && responseApi.data) {
      if (walletData) {
        setWallets((prev) => 
          prev.map((item) => {
            if (item.id === walletData.id && item.method === "crypto") {
              return {
                ...item,
                data: {
                  accountNumber: formWallet.values.accountNumber,
                  token: formWallet.values.token,
                  network: formWallet.values.network,
                }
              }
            }
            return item;
          }
        ));
      } else {
        const newCrypto: WalletUser = {
          id: responseApi.data.id,
          method: "crypto",
          data: {
            token: formWallet.values.token,
            accountNumber: formWallet.values.accountNumber,
            network: formWallet.values.network,
          },
          status: "approved" as const
        };
        setWallets((prev) => [...prev, newCrypto]);
        
        await fetchWallet();
      }
      toast.success("Berhasil memperbarui data bank");
      onCloseDrawer();
    } else {
      toast.error(responseApi.message);
    }
  }
  
  const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !isEdited) return;
    setIsLoading(true);
    
    try {
      if (formWallet.values.method === "bank") {
        await submitBankForm();
      } else if (formWallet.values.method === "crypto") {
        await submitCryptoForm();
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
          <div className={`pt-2 2xl:pt-4 pb-4 px-5 flex flex-col gap-4 w-full overflow-y-auto overflow-x-hidden
            ${walletData !== null ? "h-[calc(100%-140px)] 2xl:h-[calc(100%-180px)]" : "h-[calc(100%-80px)] 2xl:h-[calc(100%-100px)]"}    
          `}>
            <div className="flex flex-wrap gap-2.5 2xl:gap-4">
              <div className="w-full">
                <SelectInput 
                  id="method" 
                  label={"Pilih Metode"}
                  defaultValue={`<Pilih Metode>`} 
                  value={formWallet.values.method} 
                  onChangeForm={formWallet.handleChange} 
                  optionData={["bank", "crypto"]}
                  labelOptions={["Bank", "Crypto"]}
                  errorMessage={formWallet.errors.method}
                  labelClassName="text-sm! 2xl:text-lg! text-black/60!"
                  selectClassName="py-2.5! px-2! w-full"
                  gap={8}
                  disabled={isLoading || walletData !== null}
                  required 
                />
              </div>
              {formWallet.values.method === "bank" ? 
                <InputBankForm 
                  values={formWallet.values}
                  handleChange={formWallet.handleChange}
                  errors={formWallet.errors}
                /> 
                : 
                <InputCryptoForm
                  values={formWallet.values}
                  handleChange={formWallet.handleChange}
                  errors={formWallet.errors}
                />
              }
            </div>
          </div>
          <div className="absolute px-5 py-2 left-0 bottom-0 space-y-1 w-full bg-white border-t border-[#D2CEE1]">
            <Button 
              buttonType="submit"
              disabled={!isEdited || isLoading}
              loading={isLoading} 
              variant="primary-light" 
              className="py-3! w-full! rounded-lg!"
            > Simpan Wallet
            </Button>
            {walletData &&
              <Button 
                buttonType="button"
                disabled={isLoading}
                variant="no-bg" 
                onClick={onShowPopupDeleteWallet}
                className="py-3! w-full! rounded-lg! text-my-red! font-medium! hover:bg-[#F5F5F5]"
              > Hapus Akun
              </Button>
            }
          </div>
        </form>
      </div>
    </DrawerContainer>
  )
}

export default DrawerWalletDetailData;
