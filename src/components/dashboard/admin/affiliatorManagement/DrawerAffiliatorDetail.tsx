import { useEffect, useState } from "react";
import { IoCardOutline, IoCloseOutline } from "react-icons/io5";
import ProfileUserDrawer from "../common/ProfileUserDrawer";
import WalletUserDrawer from "../common/WalletUserDrawer";
import { AdminAPI, BankAPI, CryptoAPI } from "@/api";
import { toast } from "react-toastify";
import type { UserGender } from "@/types/user.type";
import { formattingFullDate } from "@/helper/formattingDate";
import { FaUser } from "react-icons/fa6";
import DrawerContainer from "@/components/ui/DrawerContainer";
import type { WalletUser, ResponseBankUser, ResponseCryptoUser } from "@/types/wallet.type";
import type { AffiliatorAdminManagement } from "@/types/affiliator.type";
import type { FlagState, LoadingState } from "@/types/drawerUserAdmin.type";
import type { StatusType } from "@/types/status.type";

type DataProfile = {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: UserGender;
}

const DrawerAffiliatorDetail = ({
  dataAffiliator,
  onCloseDrawer,
  isOpen
}: {
  dataAffiliator: AffiliatorAdminManagement;
  onCloseDrawer: () => void;
  isOpen: boolean;
}) => {
  const [menu, setMenu] = useState<"profile" | "wallet">("profile");
  const [flags, setFlags] = useState<FlagState>({
    profile: false,
    wallet: false,
  });
  const [isLoading, setIsLoading] = useState<LoadingState>({
    profile: false,
    wallet: false,
    general: true,
  });

  const [dataWallets, setDataWallets] = useState<WalletUser[]>([]);
  const [dataProfile, setDataProfile] = useState<DataProfile | null>(null)

  const fetchProfileUser = async () => {
    setIsLoading((prev) => ({
      ...prev,
      profile: true,
      general: true
    }));
    try {
      const { error, message, data } = await AdminAPI.getProfileById({
        userId: dataAffiliator.id
      });
      
      if (!error && data) {
        setDataProfile({
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          email: data.email,
          phone_number: data.phone_number,
          gender: data.gender
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        profile: false,
        general: false
      }));
      setFlags((prev) => ({
        ...prev,
        profile: true
      }));
    }
  };
  const getBankUser = async (): Promise<WalletUser[]> => {
    const { error, data } = await BankAPI.getBankByUser({
      userId: dataAffiliator.id
    });
  
    if (!error && data) {
      const temp = data.map((item: ResponseBankUser): WalletUser => ({
        id: item.id,
        method: "bank",
        data: {
          bank: item.name,
          username: item.account_name,
          accountNumber: item.account_number
        },
        status: item.status as StatusType
      }))
      return temp;
    } 

    return [];
  }
  const getCryptoUser = async (): Promise<WalletUser[]> => {
    const { error, data } = await CryptoAPI.getCryptoByUser({
      userId: dataAffiliator.id
    });
  
    if (!error && data) {
      const temp = data.map((item: ResponseCryptoUser): WalletUser => ({
        id: item.id,
        method: "crypto",
        data: {
          token: item.token as "USDT",
          network: item.network as "BNB",
          accountNumber: item.wallet_address
        },
        status: "approved"
      }))
      return temp;
    } 

    return [];
  }
  const fetchWalletUser = async () => {
    setIsLoading((prev) => ({
      ...prev,
      general: true,
      wallet: true
    }));
    try {
      const respBank = await getBankUser();
      const respCrypto = await getCryptoUser();

      const concatWallet = respBank.concat(respCrypto);
      setDataWallets(concatWallet);
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        general: false,
        wallet: false
      }));
      setFlags((prev) => ({
        ...prev,
        wallet: true
      }));
    }
  };

  useEffect(() => {
    if (menu === "wallet" && !flags.wallet) {
      fetchWalletUser();
    }
    if (menu === "profile" && (!dataProfile || !flags.profile)) {
      fetchProfileUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  return (
    <DrawerContainer 
      isOpen={isOpen} 
      onClose={onCloseDrawer}
      maxWCL="max-w-[460px] 2xl:max-w-[540px]"
    >
    <div className="primary-scrollbar py-5 h-[calc(100dvh-64px)] 2xl:h-[calc(100dvh-90px)] border-t border-l border-[#D2CEE1] bg-white overflow-y-auto">
      <div className="px-5 space-y-8 ">
        <div className="2xl:pb-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-xl 2xl:text-2xl font-semibold">
              Affiliator Information
            </h2>
            <div
              onClick={onCloseDrawer} 
              className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
              <IoCloseOutline 
                className="text-2xl 2xl:text-3xl" />
            </div>
          </div>
          <p className="mt-1 text-base 2xl:text-xl text-black/60 leading-[160%]">
            Dibuat pada {formattingFullDate(dataAffiliator.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className={`${menu === "profile" ? 
            "bg-linear-to-t from-dark-primary to-primary border border-primary text-white" : 
            "bg-transparent border border-black/80 text-black/80 hover:bg-light-gray"}
            py-2 w-1/2 h-11 md:h-fit rounded-lg text-center flex items-center justify-center cursor-pointer`}
            onClick={() => setMenu("profile")}  
          >
            <p className="hidden md:block font-medium text-base uppercase">
              Profile
            </p>
            <FaUser className="block md:hidden text-lg" />
          </div>
          <div className={`${menu === "wallet" ? 
          "bg-linear-to-t from-dark-primary to-primary border border-primary text-white" : 
          "bg-transparent border border-black/80 text-black/80 hover:bg-light-gray"}
            py-2 w-1/2 h-11 md:h-fit rounded-lg text-center flex items-center justify-center cursor-pointer`}
            onClick={() => setMenu("wallet")}  
          >
            <p className="hidden md:block font-medium text-base uppercase">
              Wallet
            </p>
            <IoCardOutline className="block md:hidden text-xl" />
          </div>
        </div>

        {/* PROFILE */}
        {menu === "profile" &&
          <ProfileUserDrawer 
            full_name={dataProfile?.full_name ?? ""} 
            username={dataProfile?.username ?? ""} 
            email={dataProfile?.email ?? ""} 
            phone_number={dataProfile?.phone_number ?? ""} 
            gender={dataProfile?.gender ?? "male"}
            status={dataAffiliator.status}   
            tier={dataAffiliator.tier}
            role="affiliator"     
            isLoading={isLoading.profile}
          />
        }

        {/* WALLET */}
        {menu === "wallet" &&
          <WalletUserDrawer 
            wallets={dataWallets} 
            isLoading={isLoading.wallet}
          />
        }
      </div>
    </div>

    </DrawerContainer>
  )
}

export default DrawerAffiliatorDetail;
