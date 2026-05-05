import { AdminAPI, BankAPI, BrokerAPI } from "@/api";
import { formattingFullDate } from "@/helper/formattingDate";
import type { DataTradersAdmin } from "@/pages/dashboard/admin/TradersManagement";
import type { SetStatusType, StatusType } from "@/types/status.type";
import type { UserGender } from "@/types/user.type";
import { useEffect, useState } from "react";
import { IoCardOutline, IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ProfileUserDrawer from "../common/ProfileUserDrawer";
import BankUserDrawer from "../common/BankUserDrawer";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import type { DataBrokerDrawer } from "../common/BrokerUserDrawer";
import BrokerUserDrawer from "../common/BrokerUserDrawer";
import { FaUser } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import DrawerContainer from "@/components/ui/DrawerContainer";

type DataProfile = {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: UserGender;
}
type DataBank = {
  id: number;
  name: string;
  account_name: string;
  account_number: string;
  status: StatusType
};
type LoadingState = {
  profile: boolean;
  bank: boolean;
  general: boolean;
  broker: boolean;
};

const DrawerTraderDetail = ({
  dataTrader,
  onCloseDrawer,
  isOpen
}: {
  dataTrader: DataTradersAdmin;
  onCloseDrawer: () => void;
  isOpen: boolean;
}) => {
  const [menu, setMenu] = useState<"profile" | "broker" | "bank">("profile");
  const [isLoading, setIsLoading] = useState<LoadingState>({
    profile: false,
    bank: false,
    broker: false,
    general: true,
  });
  const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState<SetStatusType | null>(null);

  const [dataBank, setDataBank] = useState<DataBank | null>(null);
  const [dataProfile, setDataProfile] = useState<DataProfile | null>(null);
  const [dataBrokers, setDataBrokers] = useState<DataBrokerDrawer[]>([]);

  const fetchProfileUser = async () => {
    setIsLoading((prev) => ({
      ...prev,
      profile: true,
      general: true
    }));
    try {
      const { error, message, data } = await AdminAPI.getProfileById({
        userId: dataTrader.id
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
    }
  };
  const fetchBankUser = async () => {
    setIsLoading((prev) => ({
      ...prev,
      general: true,
      bank: true
    }));
    try {
      const { error, message, data } = await BankAPI.getBankByUser({
        userId: dataTrader.id
      });
    
      if (!error && data) {
        setDataBank({
          id: data.id,
          name: data.name,
          account_name: data.account_name,
          account_number: data.account_number,
          status: data.status
        });
      } else {
        let errorMessage = message;
        if (message === "Bank users not found for the given user ID") {
          errorMessage = "Pengguna belum menambahkan data rekening bank";
          setDataBank({
            id: 0,
            name: "",
            account_name: "",
            account_number: "",
            status: "pending"
          });
        }
        toast.error(errorMessage)
      }
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        general: false,
        bank: false
      }));
    }
  };
  const fetchBrokerUser = async () => {
    setIsLoading((prev) => ({
      ...prev,
      broker: true,
      general: true
    }));

    try {
      const { error, message, data } = await BrokerAPI.getBrokerByUser({
        userId: dataTrader.id
      });
      if (!error && data) {
        const temp = data.map((item: {
          id: number;
          broker: { name: string };
          account_number: string;
          status: string;
          platform: string;
        }) => ({
          connection_id: item.id,
          name: item.broker.name,
          account_number: item.account_number,
          status: item.status,
          platform: item.platform
        }));
        setDataBrokers(temp);
      } else {
        toast.error(message);
      }
    } finally { 
      setIsLoading((prev) => ({
        ...prev,
        broker: false,
        general: false
      })); 
    }
  }

  useEffect(() => {
    if (menu === "bank" && !dataBank) {
      fetchBankUser();
    }
    if (menu === "profile" && !dataProfile) {
      fetchProfileUser();
    }
    if (menu === "broker" && dataBrokers.length === 0) {
      fetchBrokerUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu, dataTrader]);

  const handleChangeStatusBank = async () => {
    if (!dataBank || !selectedStatusChange || isLoading.general || isLoading.profile || isLoading.bank) return;

    setIsLoading((prev) => ({
      ...prev,
      general: true
    }));

    try {
      const { error, message } = await AdminAPI.bulkChangeStatusUserBanks({
        bankIds: [dataBank.id],
        status: selectedStatusChange
      });

      if (!error) {
        toast.success(message);
        await fetchBankUser();
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        general: false
      }));
      setShowPopupStatus(false)
    }
  }

  return (
    <DrawerContainer 
      isOpen={isOpen} 
      onClose={onCloseDrawer}
      maxWCL="max-w-[460px] 2xl:max-w-[540px]"
    >
    <div className="primary-scrollbar py-5 h-[calc(100vh-64px)] 2xl:h-[calc(100vh-90px)] border-t border-l border-[#D2CEE1] bg-white overflow-y-auto">
      <div className="px-5 space-y-8 ">
        <div className="2xl:pb-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-xl 2xl:text-2xl font-semibold">
              Trader Information
            </h2>
            <div
              onClick={onCloseDrawer} 
              className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
              <IoCloseOutline 
                className="text-2xl 2xl:text-3xl" />
            </div>
          </div>
          <p className="mt-1 text-base 2xl:text-xl text-black/60 leading-[160%]">
            Dibuat pada {formattingFullDate(dataTrader.created_at)}
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
          <div className={`${menu === "broker" ? 
          "bg-linear-to-t from-dark-primary to-primary border border-primary text-white" : 
          "bg-transparent border border-black/80 text-black/80 hover:bg-light-gray"}
            py-2 w-1/2 h-11 md:h-fit rounded-lg text-center flex items-center justify-center cursor-pointer`}
            onClick={() => setMenu("broker")}  
          >
            <p className="hidden md:block font-medium text-base uppercase">
              Broker
            </p>
            <BsBank2 className="block md:hidden text-xl" />
          </div>          
          <div className={`${menu === "bank" ? 
          "bg-linear-to-t from-dark-primary to-primary border border-primary text-white" : 
          "bg-transparent border border-black/80 text-black/80 hover:bg-light-gray"}
            py-2 w-1/2 h-11 md:h-fit rounded-lg text-center flex items-center justify-center cursor-pointer`}
            onClick={() => setMenu("bank")}  
          >
            <p className="hidden md:block font-medium text-base uppercase">
              Bank
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
            status={dataTrader.status}        
            isLoading={isLoading.profile}
          />
        }

        {/* BROKER */}
        {menu === "broker" && 
          <BrokerUserDrawer 
            totalUnverified={dataBrokers.filter((broker) => broker.status === "pending").length} 
            brokers={dataBrokers}  
            isLoading={isLoading.broker}          
          />
        }

        {/* BANK */}
        {menu === "bank" &&
          <BankUserDrawer 
            bank={dataBank?.name ?? ""} 
            account_name={dataBank?.account_name ?? ""} 
            account_number={dataBank?.account_number ?? ""} 
            status={dataBank?.status ?? "pending"}
            isLoading={isLoading.bank}
            onApproveBankUser={() => {
              setSelectedStatusChange("approved")
              setShowPopupStatus(true);
            }}
            onRejectBankUser={() => {
              setSelectedStatusChange("rejected")
              setShowPopupStatus(true);
            }}
          />
        }
      </div>
    </div>

    {showPopupStatus && <ModalConfirmation
      title={`Konfirmasi
        ${selectedStatusChange === "approved" ? "Persetujuan":""} 
        ${selectedStatusChange === "rejected" ? "Penolakan":""}
      Bank`}
      paragraph={`Apakah Anda yakin ingin 
        ${selectedStatusChange === "approved" ? "menyetujui":""}
        ${selectedStatusChange === "rejected" ? "menolak":""}
      verifikasi bank untuk pengguna ini?`}
      handleConfirmation={handleChangeStatusBank}
      btnConfirmation={selectedStatusChange === "rejected" ? "danger" : "primary-light"} 
      isVisible={showPopupStatus} 
      handleClose={() => setShowPopupStatus(false)} 
      cancelText="Batal"
      confirmText={selectedStatusChange === "rejected" ? "Reject" : "Approve"}
    />}  
    </DrawerContainer>
  )
}

export default DrawerTraderDetail;
