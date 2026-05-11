import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthAPI, WithdrawalAPI } from "@/api";
import BalanceContext from "@/context/BalanceContext";
import UserContext from "@/context/UserContext";
import { useBankContext } from "@/hooks/useBankContext";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import { useForm } from "@/hooks/useForm";
import { scrollToErrorInput } from "@/helper/formHelper";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import { formattingRp, formattingUsd } from "@/helper/formattingCurrency";
import { checkValidWithdrawalForm } from "@/helper/validationForm/withdrawalFormValidation";
import type { ModalResponse } from "@/types/validationForm.type";

import WithdrawalForm from "@/components/dashboard/common/WithdrawalForm";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import BankWithdrawalInformation from "@/components/dashboard/withdrawalRequest/BankWithdrawalInformation";

import Button from "@/components/ui/Button";
import SuccessModal from "@/components/ui/SuccessModal";

import { TiInfoLarge } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa6";

export type FormWithdrawalRequest = {
  method: "bank" | "crypto";
  amount: string;
  walletAddress: string;
}

const EXCHANGE_RATE = 16150;

const WithdrawalRequestPage = () => {
  const { redirectUser } = useRedirectByRole();
  const [authUser] = useContext(UserContext);
  const [balance, setBalance] = useContext(BalanceContext);
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<ModalResponse>(null);
  const formWithdrawal = useForm<FormWithdrawalRequest>({
    method: "bank",
    amount: "0",
    walletAddress: ""
  });
  const [errorSyncAmount, setErrorSyncAmount] = useState<string>("");
  const { bank, fetchBank } = useBankContext();

  // ? Inisialisasi fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!authUser) return;

      await fetchBank();
      const respBalance = await AuthAPI.getBalanceUser();
      if (!respBalance.error && respBalance.data) {
        const tempBalance = {
          userId: authUser.id,
          balance: respBalance.data.amount,
          currency: respBalance.data.currency
        };
        setBalance(tempBalance);
      } else {
        setBalance({
          userId: authUser.id,
          balance: 0,
          currency: "USD"
        });
      }
      setInitLoad(false);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ? Setiap perubahan data amount akan di cek apakah dana yang ditarik available
  useEffect(() => {
    const amount = Number(formWithdrawal.values.amount);
    const maxAmount = balance?.balance || 0;

    if (amount < 1) {
      setErrorSyncAmount(`Minimal dana yang bisa ditarik sebesar $1.00 USD`);
    } else if (amount > maxAmount) {
      setErrorSyncAmount(`Maksimal dana yang bisa ditarik sebesar $${maxAmount}.00 USD`);
    } else {
      setErrorSyncAmount("");
    }
  }, [balance, formWithdrawal.values.amount]);

  const handleSubmitWithdrawal = async () => {
    if (isLoading || !authUser) return;
    setIsLoading(true);
    
    try {
      const { isValidate, errorInput } = formWithdrawal.validate(checkValidWithdrawalForm);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
      let responseCreateWithdrawal;
      if (formWithdrawal.values.method === "bank" && bank) {
        formWithdrawal.setSpecificValue("walletAddress", bank.accountNumber);
        responseCreateWithdrawal = await WithdrawalAPI.createWithdrawal({
          form: formWithdrawal.values,
          bankId: bank.id,
          amountIdr: ((Number(formWithdrawal.values.amount) || 0) * EXCHANGE_RATE).toString(),
          currency: "IDR"
        });
      } else if (formWithdrawal.values.method === "crypto") {
        responseCreateWithdrawal = await WithdrawalAPI.createWithdrawal({
          form: formWithdrawal.values,
          amountIdr: ((Number(formWithdrawal.values.amount) || 0) * EXCHANGE_RATE).toString(),
          currency: "USD"
        });
      } else {
        return;
      }
      
      if (responseCreateWithdrawal.error) {
        toast.error(responseCreateWithdrawal.message);
      } else {
        const respBalance = await AuthAPI.getBalanceUser();
        if (!respBalance.error && respBalance.data) {
          const tempBalance = {
            userId: respBalance.data.userId,
            balance: respBalance.data.amount,
            currency: respBalance.data.currency
          };
          setBalance(tempBalance);
        } else {
          setBalance((prev) => {
            if (!prev) {
              return {
                userId: authUser.id,
                balance: 0,
                currency: "USD"
              }
            }

            return {
              ...prev,
              balace: prev.balance - parseFloat(formWithdrawal.values.amount)
            }
          });
        }
        setShowModal("SUCCESS");
        formWithdrawal.resetForm();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useLockBodyScroll(showModal === "SUCCESS");

  const bankStatusMessage = {
    empty: "Anda belum menambahkan data bank. Silakan tambahkan terlebih dahulu untuk dapat melakukan penarikan melalui bank.",
    pending: "Data bank Anda sedang dalam proses verifikasi. Silakan tunggu hingga proses selesai sebelum melakukan penarikan melalui bank.",
    rejected: "Verifikasi data bank Anda gagal. Silakan periksa kembali data yang Anda masukkan dan lakukan pengajuan ulang.",
  };
  const messageWarningBank = !bank
    ? bankStatusMessage.empty
    : bankStatusMessage[bank.status as "pending" | "rejected"] || "";

  const isEmptyForm =
    !formWithdrawal.values.method ||
    Number(formWithdrawal.values.amount) === 0 ||
    (formWithdrawal.values.method === "crypto" && !formWithdrawal.values.walletAddress);

  const isDisabledButtonSubmit =
    (formWithdrawal.values.method === "bank" && messageWarningBank !== "") ||
    errorSyncAmount !== "" ||
    isEmptyForm ||
    initLoad || isLoading;

  return (
    <div className="font-inter md:mx-10 xl:mx-[140px] flex justify-center">
      <WrapperDashboardComponent className="w-full! min-h-screen">
        
        {/* HEADER */}
        <div className="flex gap-4 md:gap-8 items-center">
          <button onClick={() => redirectUser(authUser, "withdrawal")}
            className="flex justify-center items-center size-8 2xl:size-12 rounded-full border border-[#DDDDDD] hover:bg-[#F5F5F5] transition-all duration-300 cursor-pointer"
          >
            <FaChevronLeft className="mr-px text-primary text-base 2xl:text-2xl" />
          </button>
          <TitleDashboard>
            Withdrawal Request
          </TitleDashboard>
        </div>
        <p className="my-4 md:my-6 text-base md:text-lg 2xl:text-xl text-black/80">
          Silakan lengkapi formulir di bawah ini untuk menarik saldo Anda. Pastikan kembali nominal dan detail tujuan penarikan sebelum menekan tombol lanjutkan.
        </p>

        {/* FORM WITHDRAWAL */}
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-4">
          {balance && 
            <WithdrawalForm 
              form={formWithdrawal.values}
              handleFormChange={formWithdrawal.handleChange}
              onSubmitWithdrawal={handleSubmitWithdrawal}
              errors={formWithdrawal.errors}
              errorSyncAmount={errorSyncAmount}
              availableBalance={balance.balance}
              isLoading={initLoad || isLoading}
            />
          }
          <div className="px-4 md:px-8 py-5 max-w-[360px] 2xl:max-w-[400px] w-fit bg-[#FAFAFA] border border-dashed border-primary rounded-2xl">
            <p className="text-lg 2xl:text-2xl font-medium">
              Saldo yang akan diterima
            </p>
            {formWithdrawal.values.method === "bank" ? 
              <>
                <p className="my-2.5 2xl:my-4 text-4xl 2xl:text-[40px] font-semibold">
                  {formattingRp(Number(formWithdrawal.values.amount) * EXCHANGE_RATE || 0)}
                </p>
                <p className="text-xs 2xl:text-lg text-black/80 leading-[160%]">
                  Note: Estimasi saldo diterima dihitung berdasarkan kurs real-time dari pihak payment provider/broker saat proses withdraw berlangsung. Nilai akhir yang diterima dapat berbeda mengikuti kurs masing-masing broker. Apabila broker menggunakan sistem fixed rate, maka nominal akan otomatis disesuaikan berdasarkan kurs tersebut.
                </p>
              </>  
              : 
              <p className="my-2.5 2xl:my-4 text-4xl 2xl:text-[40px] font-semibold">
                {balance && 
                formattingUsd(Number(formWithdrawal.values.amount) <= balance.balance 
                  ? Number(formWithdrawal.values.amount) : 0)}
              </p>
            }
          </div>
        </div>

        {/* INFORMATiON METHOD BANK / CRYPTO */}
        {formWithdrawal.values.method === "bank" &&
          <BankWithdrawalInformation 
            initLoad={initLoad} messageWarningBank={messageWarningBank} bank={bank}            
          />
        }
        {formWithdrawal.values.method === "crypto" &&
          <div className="mt-7 max-w-[640px]">
            <div className="p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
              <span className="flex shrink-0 items-center justify-center size-6 2xl:size-[30px] border border-primary rounded-full">
                <TiInfoLarge className="text-base 2xl:text-[20px] text-primary" />
              </span>
              <p className="w-fit text-base md:text-sm font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
                Penarikan dana melalui Crypto hanya tersedia dalam mata uang USDT dengan menggunakan jaringan BNB. Pastikan alamat wallet tujuan Anda mendukung jaringan yang sama.
              </p>
            </div>
          </div>
        }

        {/* BUTTON CONFIRM */}
        <div className="mt-6 md:mt-9 flex items-center gap-3 md:gap-4">
          <Button 
            onClick={() => redirectUser(authUser, "withdrawal")}
            buttonType="button"
            variant="outline"
            disabled={isLoading}
            className="rounded-lg!"
          >
            Kembali
          </Button>
          <Button 
            buttonType="submit" 
            onClick={(e) => {
              e.preventDefault();
              handleSubmitWithdrawal();
            }}
            variant="primary-light"
            className="rounded-lg!"
            disabled={isDisabledButtonSubmit}
            loading={isLoading}
          >
            Lanjutkan Penarikan
          </Button>
        </div>
      </WrapperDashboardComponent>

      {showModal === "SUCCESS" && 
        <SuccessModal 
          title={"Permintaan penarikan dana berhasil"}
          paragraph={"Penarikan dana sedang diproses. Lakukan pengecekan antrean penarikan dana secara berkala."}
          closeText={"Tutup"}
          isVisible={showModal === "SUCCESS"} 
          toggleModal={() => {
            setShowModal(null);
            redirectUser(authUser, "withdrawal");
          }} 
        />}
    </div>
  )
}

export default WithdrawalRequestPage;
