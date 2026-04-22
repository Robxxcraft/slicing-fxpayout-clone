import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import Button from "@/components/ui/Button";
import UserContext from "@/context/UserContext";
import { useBankContext } from "@/hooks/useBankContext";
import { useForm } from "@/hooks/useForm";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";
import { scrollToErrorInput } from "@/helper/formHelper";
import { checkValidWithdrawalForm } from "@/helper/validationForm/withdrawalFormValidation";
import { ExchangeAPI } from "@/api";
import { toast } from "react-toastify";
import { formattingRp, formattingUsd } from "@/helper/formattingCurrency";
import WithdrawalForm from "@/components/dashboard/common/WithdrawalForm";
import type { BankUser } from "@/types/bank.type";
import BalanceContext from "@/context/BalanceContext";

export type FormWithdrawalRequest = {
  method: "bank" | "crypto";
  amount: string;
  walletAddress: string;
}

const WithdrawalRequestPage = () => {
  const { redirectUser } = useRedirectByRole();
  const [authUser] = useContext(UserContext);
  const [balance] = useContext(BalanceContext);
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formWithdrawal = useForm<FormWithdrawalRequest>({
    method: "bank",
    amount: "0",
    walletAddress: ""
  });
  const [errorSyncAmount, setErrorSyncAmount] = useState<string>("");
  const [conversionRate, setConversionRate] = useState<{ conversionRate: number; conversionResult: number }>({
    conversionRate: 0,
    conversionResult: 0
  });
  const { bank, fetchBank } = useBankContext();

  useEffect(() => {
    const fetchData = async () => {
      await fetchBank();
      setInitLoad(false);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const amount = Number(formWithdrawal.values.amount);
    const maxAmount = balance?.balance || 0;

    if (amount > maxAmount) {
      setErrorSyncAmount(`Maksimal dana yang bisa ditarik sebesar $${maxAmount} USD`);
    } else {
      setErrorSyncAmount("");
    }
  }, [balance, formWithdrawal.values.amount]);

  useEffect(() => {
    const amount = Number(formWithdrawal.values.amount);
    const maxAmount = balance?.balance || 0;

    if (formWithdrawal.values.method !== "bank" || amount <= 0 || amount > maxAmount) {
      setConversionRate((prev) => ({
        ...prev,
        conversionResult: 0
      }));
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const { error, message, conversionRate, conversionResult } =
          await ExchangeAPI.exchangeRateUsdtoIdr({ amount });

        if (!error && conversionRate && conversionResult) {
          setConversionRate({
            conversionRate: Number(conversionRate),
            conversionResult: Number(conversionResult) - 300
          });
        } else {
          toast.error(message);
          setConversionRate((prev) => ({
            ...prev,
            conversionResult: 0
          }));
        }
      } catch {
        toast.error("Failed to get exchange rate. Please try again later.");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [balance, formWithdrawal.values.amount, formWithdrawal.values.method]);

  const handleSubmitWithdrawal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const { isValidate, errorInput } = formWithdrawal.validate(checkValidWithdrawalForm);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }

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
    initLoad;

  return (
    <div className="font-inter md:mx-10 xl:mx-[140px] flex justify-center">
      <WrapperDashboardComponent className="w-full! min-h-screen">
        <div className="flex gap-4 md:gap-8 items-center">
          <button onClick={() => redirectUser(authUser, "withdrawal")}
            className="flex justify-center items-center size-8 rounded-full border border-[#DDDDDD] hover:bg-black/5 transition-all duration-300 cursor-pointer"
          >
            <FaChevronLeft className="mr-px text-primary" />
          </button>
          <TitleDashboard>
            Withdrawal Request
          </TitleDashboard>
        </div>
        <p className="my-4 md:my-6 text-base md:text-lg 2xl:text-xl text-black/80">
          Silakan lengkapi formulir di bawah ini untuk menarik saldo Anda. Pastikan kembali nominal dan detail tujuan penarikan sebelum menekan tombol lanjutkan.
        </p>
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-4">
          {balance && 
            <WithdrawalForm 
              form={formWithdrawal.values}
              handleFormChange={formWithdrawal.handleChange}
              onSubmitWithdrawal={handleSubmitWithdrawal}
              errors={formWithdrawal.errors}
              errorSyncAmount={errorSyncAmount}
              availableBalance={balance.balance}
            />
          }
          <div className="px-4 md:px-8 py-5 max-w-[360px] w-fit bg-[#FAFAFA] border border-dashed border-primary rounded-2xl">
            <p className="text-lg font-medium">
              Saldo yang akan diterima
            </p>
            {formWithdrawal.values.method === "bank" ? 
              <>
                <p className="my-2.5 text-4xl font-semibold">
                  {formattingRp(Number(conversionRate.conversionResult))}
                </p>
                {conversionRate.conversionRate !== 0 &&
                  <p className="text-xs text-black/80">
                    Note: estimasi saldo yang Anda terima dihitung berdasarkan nilai tukar real-time sebesar {formattingRp(Number(conversionRate.conversionRate))} per $1 USD.
                  </p>
                }
              </>  
              : 
              <p className="my-2.5 text-4xl font-semibold">
                {balance && 
                formattingUsd(Number(formWithdrawal.values.amount) <= balance.balance 
                  ? Number(formWithdrawal.values.amount) : 0)}
              </p>
            }
          </div>
        </div>
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
        <div className="mt-6 md:mt-9 flex items-center gap-3 md:gap-4">
          <Button 
            onClick={() => redirectUser(authUser, "withdrawal")}
            buttonType="button"
            variant="outline"
            className="rounded-lg!"
          >
            Kembali
          </Button>
          <Button 
            buttonType="button"
            variant="primary-light"
            className="rounded-lg!"
            disabled={isDisabledButtonSubmit}
          >
            Lanjutkan Penarikan
          </Button>
        </div>
      </WrapperDashboardComponent>
    </div>
  )
}

export default WithdrawalRequestPage;

const BankWithdrawalInformation = ({
  initLoad,
  messageWarningBank,
  bank
}: {
  initLoad: boolean;
  messageWarningBank: string;
  bank: BankUser | null;
}) => {
  return (
    <>
      {!initLoad && messageWarningBank ? 
        <div className="mt-4 px-4 py-2 w-full bg-[#FAD4D4] border-b border-[#DF1E1E]">
          <p className="text-black/80">{messageWarningBank}</p>
        </div> : <></>
      }
      <div className="mt-7 max-w-[720px]">
        <div className="flex flex-col gap-2">
          <TitleDashboard>
            Informasi Rekening Bank Anda
          </TitleDashboard>
          <ParagraphDashboard colorCL="text-black/80">
            Rekening tujuan penarikan saldo
          </ParagraphDashboard>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:gap-2.5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
            <p className="shrink-0 font-semibold w-full max-w-[200px] text-nowrap">Nama Bank:</p>
            <p className="w-full p-2.5 bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">{bank?.status ==="approved" ? bank.bank : ""}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
            <p className="shrink-0 font-semibold w-full max-w-[200px] text-nowrap">Nomor Rekening:</p>
            <p className="w-full p-2.5 bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">{bank?.status ==="approved" ? bank.accountNumber : ""}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
            <p className="shrink-0 font-semibold w-full max-w-[200px] text-nowrap">Nama Pemilik Rekening:</p>
            <p className="w-full p-2.5 bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">{bank?.status ==="approved" ? bank.username : ""}</p>
          </div>
        </div>
      </div>
    </>
  )
}
