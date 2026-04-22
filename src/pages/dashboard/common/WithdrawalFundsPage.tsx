import DrawerBankDetailData from "@/components/dashboard/common/DrawerBankDetailData";
import StatusTag from "@/components/dashboard/common/StatusTag";
import TinyButton from "@/components/dashboard/common/TinyButton";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import BalanceContext from "@/context/BalanceContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useBankContext } from "@/hooks/useBankContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsBank2 } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";

const supportEntry = [5, 10, 20, 50];

const WithdrawalFundsPage = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [totalEntry, setTotalEntry] = useState<number>(20);
  const [activeBankDrawer, setActiveBankDrawer] = useState<boolean>(false);
  const { bank, fetchBank } = useBankContext();
  const [balance] = useContext(BalanceContext);
 
  useEffect(() => {
    const fetchData = async () => {
      await fetchBank();
      setInitLoad(false);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <WrapperDashboardComponent>
      <section>
        <div className="flex justify-between items-center md:items-start">
          <TitleDashboard>
            Withdrawal Request
          </TitleDashboard>
          <TinyButton 
            buttonType="link"
            urlTo={getLocalizedPath("withdrawal/request", i18n.language)}
          >
            Tarik dana sekarang!
          </TinyButton>
        </div>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row gap-5 md:gap-8">
          <div className="px-8 py-5 w-full md:w-[420px] bg-linear-to-t from-dark-primary to-primary rounded-2xl text-white">
            <div className="flex items-center gap-2">
              <IoWalletOutline className="text-xl" />
              <p className="font-medium text-lg">Current Balance</p>
            </div>
            <p className="mt-2.5 font-semibold text-5xl">
              {formattingUsd(balance?.balance || 0)}
            </p>
            <p className="mt-2.5 font-medium text-base">
              Available to withdrawal
            </p>
          </div>
          <div>
            <h2 className="font-medium text-xl">
              Akun Bank
            </h2>
            {!bank && initLoad ?
              <div className="p-3 mt-4  w-full md:w-[420px] rounded-lg bg-black/5">
                <div className="flex items-center gap-3 w-full animate-pulse">
                  <div className="shrink-0 size-9 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-2 w-[80%] bg-gray-300 rounded-full"></div>
                    <div className="h-2 w-full bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            : 
              <div className="mt-4">
                {!bank ? 
                  <div 
                    onClick={() => setActiveBankDrawer(true)}
                    className="flex items-center text-primary cursor-pointer">
                    <IoIosAdd className="text-2xl" />
                    <p className="underline">Tambahkan akun bank</p>
                  </div>
                :
                <>
                  <div 
                    onClick={() => setActiveBankDrawer(true)}
                    className={`${bank.status === "pending" ? "border-black/40" : bank.status === "rejected" ? "border-[#DF1E1E]" : "border-primary"}
                      mb-2 px-5 py-2.5 gap-3 flex items-center justify-between  w-full md:w-[420px] max-w-[420px] rounded-lg border cursor-pointer`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <BsBank2 className={`${bank.status === "approved" ? "text-primary" : "text-black/60"} shrink-0 text-2xl`} />
                      <div className="w-full">
                        <p className="font-medium max-w-[250px] text-nowrap text-ellipsis line-clamp-1">
                          {bank.username}
                        </p>
                        <div className="flex gap-1 w-fit">
                          <span className="text-sm text-black/60 max-w-[100px] text-nowrap text-ellipsis line-clamp-1">{bank.bank}</span>
                          <span className="text-sm text-black/60 max-w-[150px] text-nowrap text-ellipsis line-clamp-1">{bank.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {bank.status === "approved" ?
                        <img src="/check.svg" alt="check icon"
                          className="mt-px scale-90"
                        /> 
                      : bank.status === "rejected" ? 
                          <StatusTag status="rejected" text="Rejected" />
                        : 
                          <StatusTag status="pending" text="Verifying" />
                      }
                    </div>
                  </div>
                  {bank.status === "rejected" &&
                    <p className="text-base text-black/80">
                      Verifikasi akun bank gagal. {" "}
                      <span
                        onClick={() => setActiveBankDrawer(true)} 
                        className="text-primary underline cursor-pointer">Perbarui akun bank</span>
                    </p>
                  }
                  {bank.status === "pending" && <p className="text-base text-black/80">Verifikasi akun bank sedang diproses.</p>}
                </>
                }
              </div>
            }
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="font-medium text-xl">
          Pending Withdrawal
        </h2>
        <div className="flex items-center justify-between">
          <div className="mt-4 flex items-center gap-1.5 text-[#212529]">
            <span className="text-base">Tampilkan</span>
            <select 
              name="entry" 
              id="entry" 
              value={totalEntry}
              onChange={(e) => setTotalEntry(Number(e.target.value))}
              className="px-2 py-1 text-base text-[#495057] bg-white border border-[#CED4DA] rounded-md focus:outline-none"
            >
              {supportEntry.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="flex">
            <button
              onClick={() => {}}
              disabled={true}
              className="p-2 rounded-l-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => {}}
              disabled={false}
              className="p-2 rounded-r-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center w-full h-fit">
          <div className="text-center">
            <p className="text-base text-black/80">Belum ada pending withdrawal request</p>
          </div>
        </div>
        <div className="mt-9">
          <p className="text-base text-black/80">Menampilkan 0 hingga 0 dari 0 entri</p>
        </div>
      </section>

      {activeBankDrawer &&
        <DrawerBankDetailData 
          bankData={bank}
          closeDrawer={() => setActiveBankDrawer(false)} 
        />
      }
    </WrapperDashboardComponent>
  )
}

export default WithdrawalFundsPage;
