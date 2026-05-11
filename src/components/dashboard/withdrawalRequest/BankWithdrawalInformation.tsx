import type { BankUser } from "@/types/bank.type";
import TitleDashboard from "../common/TitleDashboard";
import ParagraphDashboard from "../common/ParagraphDashboard";

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
        <div className="mt-4 2xl:mt-6 px-4 py-2 w-full bg-[#FAD4D4] border-b border-[#DF1E1E]">
          <p className="text-base 2xl:text-xl text-black/80">{messageWarningBank}</p>
        </div> : <></>
      }
      <div className="mt-7 2xl:mt-10 max-w-[720px]">
        <div className="flex flex-col gap-2">
          <TitleDashboard>
            Informasi Rekening Bank Anda
          </TitleDashboard>
          <ParagraphDashboard maxW="w-fit" colorCL="text-black/80">
            Rekening tujuan penarikan saldo
          </ParagraphDashboard>
        </div>
        <div className="mt-4 2xl:mt-5 flex flex-col gap-3 md:gap-2.5 2xl:gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
            <p className="shrink-0 font-semibold w-full max-w-[200px] 2xl:max-w-[260px] text-nowrap text-base 2xl:text-xl">
              Nama Bank:
            </p>
            <p className="w-full p-2.5 2xl:p-3 text-base 2xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
              {bank?.status === "approved" ? bank.bank : ""}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
            <p className="shrink-0 font-semibold w-full max-w-[200px] 2xl:max-w-[260px] text-nowrap text-base 2xl:text-xl">
              Nomor Rekening:
            </p>
            <p className="w-full p-2.5 2xl:p-3 text-base 2xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
              {bank?.status === "approved" ? bank.accountNumber : ""}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-5 w-full">
            <p className="shrink-0 font-semibold w-full max-w-[200px] 2xl:max-w-[260px] text-nowrap text-base 2xl:text-xl">
              Nama Pemilik Rekening:
            </p>
            <p className="w-full p-2.5 2xl:p-3 text-base 2xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
              {bank?.status === "approved" ? bank.username : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BankWithdrawalInformation;
