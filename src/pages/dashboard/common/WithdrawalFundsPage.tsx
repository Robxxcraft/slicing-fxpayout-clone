import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { BankAPI, CryptoAPI, WithdrawalAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";
import type { MetaPage } from "@/types/metapage.type";
import BalanceContext from "@/context/BalanceContext";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useWalletContext } from "@/hooks/useWalletContext";
import { formattingUsd } from "@/helper/formattingCurrency";
import type { WalletUser } from "@/types/wallet.type";
import type { PendingWithdrawal, ResponseWithdrawalAPI } from "@/types/withdrawal.type";

import ModalConfirmation from "@/components/ui/ModalConfirmation";
import TinyButton from "@/components/dashboard/common/TinyButton";
import NoDataFound from "@/components/dashboard/common/NoDataFound";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import NextPreviousButton from "@/components/dashboard/common/NextPreviousButton";
import CardWalletAccount from "@/components/dashboard/common/CardWalletAccount";
import DrawerWalletDetailData from "@/components/dashboard/common/DrawerWalletDetailData";
import TablePendingWithdrawal from "@/components/dashboard/common/TablePendingWithdrawal";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import SelectDropdown from "@/components/ui/SelectDropdown";

import { IoIosAdd } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";

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
  const [addWalletDrawer, setAddWalletDrawer] = useState<boolean>(false);
  const [showPopupDeleteWallet, setShowPopupDeleteWallet] = useState<boolean>(false);

  const { wallets, setWallets, fetchWallet } = useWalletContext();
  const [selectedWallet, setSelectedWallet] = useState<WalletUser | null>(null);
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
              walletAddress: useCrypto ? item.crypto_wallet_address || "-" : item.bank_account_number || "-",
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
      setIsLoading(false);
    }
  }, [authUser, metaPage.limit, metaPage.pageIndex]);

  useEffect(() => {
    const fetchInitData = async () => {
      await fetchWallet();
      await fetchData();

      setInitLoad(false);
    }
    fetchInitData();
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

  const handleDeleteBankUser = async (bankId: number) => {
    const { error, message } = await BankAPI.deleteUserBank({ bankId });
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
      setWallets((prev) => {
        return prev.filter((item) => {
          const deleteItem = item.id === bankId && item.method === "bank"
          return !deleteItem;
        });
      });
      setSelectedWallet(null);
    }
  };
  const handleDeleteCryptoUser = async (cryptoId: number) => {
    const { error, message } = await CryptoAPI.deleteUserCrypto({ cryptoId });
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
      setWallets((prev) => {
        return prev.filter((item) => {
          const deleteItem = item.id === cryptoId && item.method === "crypto"
          return !deleteItem;
        });
      });
      setSelectedWallet(null);
    }
  };
  const handleDeleteWalletUser = async () => {
    if (!selectedWallet) return;

    try {
      if (selectedWallet.method === "bank") {
        await handleDeleteBankUser(selectedWallet.id);
      } else {
        await handleDeleteCryptoUser(selectedWallet.id);
      }
    } finally {
      setShowPopupDeleteWallet(false);
    }
  };

  useLockBodyScroll(addWalletDrawer || selectedWallet !== null);
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

        {/* BALANCE & INFO WALLET */}
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
              Akun Wallet
            </h2>
            {wallets.filter((wallet) => wallet.status === "rejected").length > 0 &&
              <p className="w-full md:w-[420px] 2xl:w-[540px] text-sm 2xl:text-base leading-[160%]">
                {wallets.filter((wallet) => wallet.status === "rejected").length} {" "} 
                akun wallet memerlukan perhatian. Perbaiki akun wallet untuk dapat melakukan penarikan dengan akun terkait.
              </p>
            }
            {wallets.length === 0 && initLoad ?
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
                {wallets.length === 0 ? 
                  <Button 
                    type="button"
                    variant="primary-light"
                    onClick={() => setAddWalletDrawer(true)}
                    icon={<IoIosAdd className="text-2xl 2xl:text-3xl" />}
                    iconPosition="left"
                    className="py-3! w-full! rounded-full! text-base! 2xl:text-xl! font-medium!"
                  >
                    Tambahkan akun wallet
                  </Button>
                :
                <div className="py-4 pl-4 pr-2 md:py-5 md:pl-5 md:pr-3 bg-white overflow-x-hidden rounded-2xl">
                  <div className="scrollbar-thin pr-2 max-h-60 overflow-y-auto overflow-x-hidden">
                    {wallets.map((wallet) => (
                      <React.Fragment key={wallet.id}>
                        <CardWalletAccount 
                          wallet={wallet}
                          onClickCard={() => setSelectedWallet(wallet)}
                        />
                      </React.Fragment>
                    ))}
                    {wallets.length < 5 &&
                      <button
                        onClick={() => setAddWalletDrawer(true)}
                        className="py-2.5 2xl:py-4 w-full text-[14px] 2xl:text-lg font-medium text-primary rounded-full hover:bg-[#F5F5F5] transition-colors duration-300 cursor-pointer"
                      >
                        Tambahkan akun wallet
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
      {/* ADD WALLET */}
      {addWalletDrawer &&
        <DrawerWalletDetailData 
          walletData={null}
          onCloseDrawer={() => setAddWalletDrawer(false)} 
          isOpen={addWalletDrawer}
          onShowPopupDeleteWallet={() => {}}
        />
      }
      {/* UPDATE WALLET */}
      {selectedWallet &&
        <DrawerWalletDetailData 
          walletData={selectedWallet}
          onCloseDrawer={() => setSelectedWallet(null)} 
          isOpen={selectedWallet !== null}
          onShowPopupDeleteWallet={() => setShowPopupDeleteWallet(true)}
        />
      }

      {/* POPUP DELETE CONFIRM */}
      {showPopupDeleteWallet && <ModalConfirmation
        title={`Hapus Akun`}
        paragraph="Akun akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali."
        handleConfirmation={handleDeleteWalletUser}
        btnConfirmation="danger" 
        isVisible={showPopupDeleteWallet} 
        handleClose={() => setShowPopupDeleteWallet(false)}
        cancelText="Batal"
        confirmText="Hapus" 
      />}  
    </WrapperDashboardComponent>
  )
}

export default WithdrawalFundsPage;
