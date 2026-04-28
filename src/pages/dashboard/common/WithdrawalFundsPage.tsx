import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TraderAPI } from "@/api";
import type { MetaPage } from "@/types/metapage.type";
import BalanceContext from "@/context/BalanceContext";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useBankContext } from "@/hooks/useBankContext";
import { formattingFullDateTime } from "@/helper/formattingDate";
import { formattingEmptyCurrency, formattingUsd } from "@/helper/formattingCurrency";

import Table from "@/components/TableLayout";
import StatusTag from "@/components/dashboard/common/StatusTag";
import TinyButton from "@/components/dashboard/common/TinyButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import DrawerBankDetailData from "@/components/dashboard/common/DrawerBankDetailData";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { BsBank2 } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";

const CONFIG_HEADERS = [
  {key: "createdAt", header: "Tanggal"},
  {key: "method", header: "Metode"}, 
  {key: "walletAddress", header: "Alamat Wallet"}, 
  {key: "currency", header: "Currency"}, 
  {key: "amount", header: "Amount"}, 
];

const supportEntry = [
  { "key": "20", "value": "20" }, 
  { "key": "50", "value": "50" },
  { "key": "100", "value": "100" }
];

type PendingWithdrawal = {
  createdAt: string;
  method: string;
  walletAddress: string;
  currency: "USD" | "IDR";
  amount: number;
};
type ResponsePendingWithdrawal = {
  created_at: string;
  bank: { name: string, account_number: string } | null;
  wallet_address: string;
  currency: string;
  amount_idr: number;
  amount_usd: number;
};

const WithdrawalFundsPage = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeBankDrawer, setActiveBankDrawer] = useState<boolean>(false);

  const { bank, fetchBank } = useBankContext();
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
      const { error, data } = await TraderAPI.getWithdrawalByTrader({
        status: "pending",
        limit: metaPage.limit,
        page: metaPage.pageIndex
      });
      if (!error && data) {
        const raw = data.data;
        const temp = raw.data.map((item: ResponsePendingWithdrawal) => ({
          createdAt: item.created_at,
          method: !item.bank ? "Crypto" : item.bank.name,
          walletAddress: !item.bank ? item.wallet_address : item.bank.account_number,
          currency: item.currency as "USD" | "IDR",
          amount: item.currency === "USD" ? item.amount_usd : item.amount_idr
        }));
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
    } finally {
      setInitLoad(false);
      setIsLoading(false);
    }
  }, [metaPage.limit, metaPage.pageIndex]);

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
          <div className="px-8 py-5 w-full md:w-[420px] bg-linear-to-t from-dark-primary to-primary rounded-2xl text-white">
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
          <div>
            <h2 className="font-medium text-xl 2xl:text-2xl">
              Akun Bank
            </h2>
            {!bank && initLoad ?
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
                {!bank ? 
                  <div 
                    onClick={() => setActiveBankDrawer(true)}
                    className="flex items-center text-primary cursor-pointer">
                    <IoIosAdd className="text-2xl 2xl:text-3xl" />
                    <p className="underline text-base 2xl:text-xl">Tambahkan akun bank</p>
                  </div>
                :
                <>
                  <div 
                    onClick={() => setActiveBankDrawer(true)}
                    className={`${bank.status === "pending" ? "border-black/40" : bank.status === "rejected" ? "border-[#DF1E1E]" : "border-primary"}
                      mb-2 px-5 2xl:px-6 py-2.5 2xl:py-4 gap-3 flex items-center justify-between w-full md:w-[420px] 2xl:w-[540px] max-w-[420px] 2xl:max-w-[540px] rounded-lg border cursor-pointer`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <BsBank2 className={`${bank.status === "approved" ? "text-primary" : "text-black/60"} shrink-0 text-2xl 2xl:text-3xl`} />
                      <div className="w-full">
                        <p className="font-medium max-w-[250px] 2xl:max-w-[350px] text-base 2xl:text-xl text-nowrap truncate">
                          {bank.username}
                        </p>
                        <div className="flex gap-1 w-fit">
                          <span className="text-sm 2xl:text-lg text-black/60 max-w-[100px] text-nowrap truncate">{bank.bank}</span>
                          <span className="text-sm 2xl:text-lg text-black/60 max-w-[150px] text-nowrap truncate">{bank.accountNumber}</span>
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
                    <p className="text-base 2xl:text-xl text-black/80">
                      Verifikasi akun bank gagal. {" "}
                      <span
                        onClick={() => setActiveBankDrawer(true)} 
                        className="text-primary underline cursor-pointer">Perbarui akun bank</span>
                    </p>
                  }
                  {bank.status === "pending" && <p className="text-base 2xl:text-xl text-black/80">Verifikasi akun bank sedang diproses.</p>}
                </>
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
        <Table className="mt-0!">
          <Table.Heading>
            {CONFIG_HEADERS.map((headerEl, cellIndex) => (
              <Table.HeadingItem key={headerEl.key}
                className={`
                  ${cellIndex === CONFIG_HEADERS.length - 1 ? "px-0! pr-2! pl-8! text-right!" : "text-left!"}
                  ${cellIndex === 0 ? "px-0! pl-2! pr-8!":""}
                  py-4! md:py-3! text-nowrap font-medium! text-sm! 2xl:text-lg! select-none
                `}
              >
                {headerEl.header}
              </Table.HeadingItem>
            ))}

          </Table.Heading>
          
          <Table.Body>
            {dataWithdrawal.length > 0 && dataWithdrawal.map((data, rowIndex) => (
              <Table.Row key={rowIndex}>
                {CONFIG_HEADERS.map((header, cellIndex) => {
                  let value;
                  const baseStyle = "py-2! text-nowrap align-middle!";

                  if (header.key === "createdAt") {
                    value = formattingFullDateTime(data.createdAt);
                  } else if (header.key === "amount") {
                    value = `-${formattingEmptyCurrency(data.amount)}`;
                  } else {
                    value = data[header.key as keyof typeof data];
                  }

                  return (
                    <Table.Cell key={cellIndex} rowIndex={rowIndex} className={`${baseStyle}
                      ${cellIndex === CONFIG_HEADERS.length - 1 ? "px-2! text-right!" : "text-left!"}
                      ${header.key === "amount" ? "text-red-700":""}
                      ${cellIndex === 0 ? "px-0! pl-2! pr-8!":""}
                    `}>
                      {value.toString()}
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* LOADING & 0 DATA TABLE */}
        {dataWithdrawal.length === 0 && (initLoad || isLoading) &&
          <div className="mt-4 2xl:mt-5 flex flex-col items-center justify-center w-full h-fit">
            <Spinner />
          </div>
        }
        {dataWithdrawal.length === 0 && !initLoad && !isLoading &&
          <NoDataFound>
            <p className="text-black/80 text-base 2xl:text-xl">
              Saat ini, Anda tidak memiliki antrean penarikan dana.
            </p>
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
