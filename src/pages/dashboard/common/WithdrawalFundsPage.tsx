import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { BankAPI, WithdrawalAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import type { MetaPage } from "@/types/metapage.type";
import BalanceContext from "@/context/BalanceContext";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useBankContext } from "@/hooks/useBankContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import { showLastFourWalletAddress } from "@/helper/formattingWithdrawal";
import type { BankUser } from "@/types/bank.type";
import type { PendingWithdrawal, ResponseWithdrawalAPI } from "@/types/withdrawal.type";

import ModalConfirmation from "@/components/ui/ModalConfirmation";
import TinyButton from "@/components/dashboard/common/TinyButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import DrawerBankDetailData from "@/components/dashboard/common/DrawerBankDetailData";
import TablePendingWithdrawal from "@/components/dashboard/common/TablePendingWithdrawal";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { BsBank2 } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const supportEntry = [
  { "key": "20", "value": "20" }, 
  { "key": "50", "value": "50" },
  { "key": "100", "value": "100" }
];

const WithdrawalFundsPage = () => {
  const { i18n } = useTranslation();
  const [authUser] = useContext(UserContext);
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addBankDrawer, setAddBankDrawer] = useState<boolean>(false);
  const [showPopupDeleteBank, setShowPopupDeleteBank] = useState<boolean>(false);

  const { banks, setBanks, fetchBank } = useBankContext();
  const [selectedBank, setSelectedBank] = useState<BankUser | null>(null);
  const [balance] = useContext(BalanceContext);
  const [dataWithdrawal, setDataWithdrawal] = useState<PendingWithdrawal[]>([]);
  const [metaPage, setMetaPage] = useState<MetaPage>({
    pageIndex: 1,
    pageTotal: 1,
    limit: 20,
    totalData: 0
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      if (!authUser) return;
      if (authUser.role === "user" || authUser.role === "affiliator") {
        const { error, data } = await WithdrawalAPI.getWithdrawalUser({
          role: authUser.role === "user" ? "trader" : "affiliate",
          status: "pending",
          limit: metaPage.limit,
          page: metaPage.pageIndex
        });
        if (!error && data) {
          const raw = data.data;
          const temp = raw.data.map((item: ResponseWithdrawalAPI) => {
            const useCrypto = item.bank_name === null && item.bank_account_name === null && item.bank_account_number === null;
            return {
              withdrawalId: item.id,
              createdAt: item.created_at,
              method: useCrypto ? "Crypto" : item.bank_name || "-",
              walletAddress: useCrypto ? item.wallet_address : item.bank_account_number || "-",
              currency: item.currency as "USD" | "IDR",
              amount: item.currency === "USD" ? item.amount_usd : item.amount_idr
            }
          });
          setDataWithdrawal(temp);
          setMetaPage((prev) => {
            if (
              prev.pageIndex === raw.meta.page &&
              prev.pageTotal === raw.meta.totalPages &&
              prev.totalData === raw.meta.total &&
              prev.limit === raw.meta.limit
            ) return prev;
    
            return {
              ...prev,
              pageIndex: raw.meta.page,
              pageTotal: raw.meta.totalPages,
              totalData: raw.meta.total,
              limit: raw.meta.limit
            };
          });
        }
      }
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  }, [authUser, metaPage.limit, metaPage.pageIndex]);

  useEffect(() => {
    const fetchBankData = async () => {
      await fetchBank();
    }
    fetchBankData();
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  const handleNextPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex < metaPage.pageTotal) {
      setMetaPage((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    }
  };
  const handlePreviousPage = () => {
    if (isLoading) return;
    if (metaPage.pageIndex > 1) {
      setMetaPage((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1
      }));
    }
  };
  const handleDeleteBankUser = async () => {
    if (!selectedBank) return;

    try {
      const { error, message } = await BankAPI.deleteUserBank({ bankId: selectedBank.id });
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
        setBanks((prev) => {
          return prev.filter((item) => item.id !== selectedBank.id);
        });
        setSelectedBank(null);
      }
    } finally {
      setShowPopupDeleteBank(false);
    }
  }

  useLockBodyScroll(addBankDrawer || selectedBank !== null);
  return (
    <WrapperDashboardComponent>
      <section>
        {/* HEADER */}
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

        {/* BALANCE & INFO BANK */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row gap-5 md:gap-8">
          <div className="px-8 py-5 w-full md:w-[420px] h-fit bg-linear-to-t from-dark-primary to-primary rounded-2xl text-white">
            <div className="flex items-center gap-2">
              <IoWalletOutline className="text-xl 2xl:text-3xl" />
              <p className="font-medium text-lg 2xl:text-2xl">Current Balance</p>
            </div>
            <p className="mt-2.5 2xl:mt-5 font-semibold text-5xl">
              {formattingUsd(balance?.balance || 0)}
            </p>
            <p className="mt-2.5 font-medium text-base 2xl:text-xl">
              Available to withdrawal
            </p>
          </div>
          <div className="">
            <h2 className="font-medium text-xl 2xl:text-2xl">
              Akun Bank
            </h2>
            {banks.filter((bank) => bank.status === "rejected").length > 0 &&
              <p className="w-full md:w-[420px] 2xl:w-[540px] text-sm 2xl:text-base leading-[160%]">
                {banks.filter((bank) => bank.status === "rejected").length} {" "} 
                akun bank memerlukan perhatian. Perbaiki akun bank untuk dapat melakukan penarikan dengan akun terkait.
              </p>
            }
            {banks.length === 0 && initLoad ?
              <div className="p-3 2xl:p-5 mt-4 w-full md:w-[420px] 2xl:w-[540px] rounded-lg bg-black/5">
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
                {banks.length === 0 ? 
                  <Button 
                    type="button"
                    variant="primary-light"
                    onClick={() => setAddBankDrawer(true)}
                    icon={<IoIosAdd className="text-2xl 2xl:text-3xl" />}
                    iconPosition="left"
                    className="py-3! w-full! rounded-full! text-base! 2xl:text-xl! font-medium!"
                  >
                    Tambahkan akun bank
                  </Button>
                :
                <div className="py-4 pl-4 pr-2 md:py-5 md:pl-5 md:pr-3 bg-white overflow-x-hidden rounded-2xl">
                  <div className="scrollbar-thin pr-2 max-h-60 overflow-y-auto overflow-x-hidden">
                    {banks.map((bank) => (
                      <div 
                        key={bank.id}
                        onClick={() => setSelectedBank(bank)}
                        className={`${bank.status === "pending" ? "border-[#DDDDDD]" : bank.status === "rejected" ? "border-[#DF1E1E]" : "border-primary"}
                          mb-2 px-3 md:px-5 2xl:px-6 py-2.5 2xl:py-4 gap-3 flex items-center justify-between w-full lg:w-[420px] 2xl:w-[540px] lg:max-w-[420px] 2xl:max-w-[540px] rounded-lg border hover:bg-[#F5F5F5] transition-colors duration-300 cursor-pointer select-none`}
                    >
                        <div className="flex items-center gap-4 w-full">
                          <BsBank2 className={`shrink-0 text-2xl 2xl:text-3xl
                            ${bank.status === "approved" ? "text-primary" 
                              : bank.status === "rejected" ?  "text-[#DF1E1E]" : "text-black/60"}
                          `} />
                          <div className="w-full">
                            <div className="flex gap-1 w-fit">
                              <span className="text-base 2xl:text-xl font-semibold max-w-[200px] text-nowrap truncate">
                                {bank.bank}
                              </span>
                              <span className="text-base 2xl:text-xl font-semibold max-w-[150px] text-nowrap truncate">
                                •••• {showLastFourWalletAddress(bank.accountNumber)}
                              </span>
                            </div>
                            
                            <p className={`max-w-[280px] 2xl:max-w-[350px] text-sm 2xl:text-lg
                              ${bank.status === "pending" ? "text-black/60" 
                                : bank.status === "rejected" ? "text-[#DF1E1E]"
                                : "text-black"}  
                            `}>
                              {bank.status === "pending" ? "Verifikasi akun bank sedang diproses." 
                                : bank.status === "rejected" ? "Verifikasi akun bank gagal." 
                                : bank.username
                              }
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {bank.status === "approved" ?
                            <img src="/check.svg" alt="check icon"
                              className="mt-px scale-90"
                            /> 
                          : bank.status === "rejected" ? 
                              <RiErrorWarningFill className="text-2xl text-[#DF1E1E]" />
                            : 
                              <MdOutlineAccessTimeFilled className="text-2xl text-[#BE5409]" />
                          }
                        </div>
                      </div>
                    ))}
                    {banks.length < 5 &&
                      <button
                        onClick={() => setAddBankDrawer(true)}
                        className="py-2.5 2xl:py-4 w-full text-[14px] 2xl:text-lg font-medium text-primary rounded-full hover:bg-[#F5F5F5] transition-colors duration-300 cursor-pointer"
                      >
                        Tambahkan akun bank
                      </button>
                    }
                  </div>
                </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      {/* PENDING WITHDRAWAL */}
      <section className="mt-8 2xl:mt-10">
        <h2 className="font-medium text-xl 2xl:text-2xl">
          Pending Withdrawal
        </h2>

        {/* FILTER TABLE */}
        <div className="mt-3 md:mt-4 mb-4 2xl:mt-5 2xl:mb-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 2xl:gap-2.5 text-[#212529]">
              <span className="text-base 2xl:text-xl">Tampilkan</span>
              <SelectDropdown 
                selectedInput={metaPage.limit.toLocaleString()} 
                handleChangeInput={(key) => setMetaPage((prev) => ({
                  ...prev,
                  limit: Number(key),
                  page: 1
                }))} 
                objectInput={supportEntry}     
                inputCL="w-[72px]!"
                wrapperCL="w-fit!"         
              />
            </div>
            <div className="flex items-center gap-2 2xl:gap-3 w-fit">
              <Tooltip 
                disabled={isLoading}
                icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
                handleClick={() => fetchData()} 
                detail={"Reload Data"} />
              <NextPreviousButton 
                onNextPage={handleNextPage} 
                onPreviousPage={handlePreviousPage} 
                disabledNext={metaPage.pageIndex >= metaPage.pageTotal} 
                disabledPrev={metaPage.pageIndex <= 1} 
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <TablePendingWithdrawal dataWithdrawal={dataWithdrawal} isLoading={isLoading} />

        {/* LOADING & 0 DATA TABLE */}
        {dataWithdrawal.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataWithdrawal.length === 0 && !initLoad && !isLoading &&
          <NoDataFound>
            Saat ini, Anda tidak memiliki antrean penarikan dana.
          </NoDataFound>
        }
        <div className="mt-4">
          <p className="text-base 2xl:text-xl text-black/80">
            {`Menampilkan 
            ${metaPage.pageIndex === 1 ? (dataWithdrawal.length > 0 ? "1":"0") : metaPage.limit * metaPage.pageIndex} 
            hingga  
            ${metaPage.pageIndex === 1 ? dataWithdrawal.length : (metaPage.limit * metaPage.pageIndex) + dataWithdrawal.length} 
            dari ${metaPage.totalData}
            entri.`}
          </p>
        </div>
      </section>

      {/* DRAWER SECTION */}
      {/* ADD BANK */}
      {addBankDrawer &&
        <DrawerBankDetailData 
          bankData={null}
          onCloseDrawer={() => setAddBankDrawer(false)} 
          isOpen={addBankDrawer}
          onShowPopupDeleteBank={() => {}}
        />
      }
      {/* UPDATE BANK */}
      {selectedBank &&
        <DrawerBankDetailData 
          bankData={selectedBank}
          onCloseDrawer={() => setSelectedBank(null)} 
          isOpen={selectedBank !== null}
          onShowPopupDeleteBank={() => setShowPopupDeleteBank(true)}
        />
      }

      {/* POPUP DELETE CONFIRM */}
      {showPopupDeleteBank && <ModalConfirmation
        title={`Hapus Akun`}
        paragraph="Akun akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali."
        handleConfirmation={handleDeleteBankUser}
        btnConfirmation="danger" 
        isVisible={showPopupDeleteBank} 
        handleClose={() => setShowPopupDeleteBank(false)}
        cancelText="Batal"
        confirmText="Hapus" 
      />}  
    </WrapperDashboardComponent>
  )
}

export default WithdrawalFundsPage;
