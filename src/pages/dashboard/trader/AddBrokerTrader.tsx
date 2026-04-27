import { BrokerAPI } from "@/api";
import Button from "@/components/ui/Button";
import SelectInput from "@/components/ui/SelectInput";
import SuccessModal from "@/components/ui/SuccessModal";
import TextInput from "@/components/ui/TextInput";
import UserContext from "@/context/UserContext";
import { scrollToErrorInput } from "@/helper/formHelper";
import { getLocalizedPath } from "@/helper/pathHelper";
import { checkValidFormConnectBroker } from "@/helper/validationForm/connetBrokerValidation";
import { useForm } from "@/hooks/useForm";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import { useRedirectGuest } from "@/hooks/useRedirectGuest";
import type { FormConnectBroker } from "@/types/broker.type";
import type { ModalResponse } from "@/types/validationForm.type";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type BrokerList = {
  id: number;
  name: string;
  createdAt: string;
};

type LoadBrokers = {
  loading: boolean;
  listBrokers: BrokerList[];
  error: string;
}

const AddBrokerTrader = () => {
  const { i18n } = useTranslation();
  const [authUser] = useContext(UserContext);
  const formConnectBroker = useForm<FormConnectBroker>({
    broker: "",
    accountNumber: "",
    platform: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { redirectLogin } = useRedirectGuest();
  const { redirectUser } = useRedirectByRole();
  const [showModal, setShowModal] = useState<ModalResponse>(null);
  const [resLoadBrokers, setResLoadBrokers] = useState<LoadBrokers>({
    loading: true,
    listBrokers: [],
    error: ""
  });

  useEffect(() => {
    if (!authUser) {
      redirectLogin();
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBrokerList = async () => {
    setResLoadBrokers((prev) => ({...prev, loading: true}));
    const { error, data } = await BrokerAPI.getBrokersList();
    if (!error && data) {
      console.log(data);
      const temp = data.map((item: {
        id: number; name: string; created_at: string
      }) => ({
        id: item.id,
        name: item.name,
        createdAt: item.created_at
      }));
      setResLoadBrokers((prev) => ({...prev, listBrokers: temp}));
    } 
    setResLoadBrokers((prev) => ({...prev, loading: false}));
  }

  useEffect(() => {
    fetchBrokerList();
  }, []);

  const handleSubmitConnectBroker = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { isValidate, errorInput } = formConnectBroker.validate(checkValidFormConnectBroker);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
      
      const { error, message } = await BrokerAPI.connectBrokerUser({
        form: {
          brokerId: Number(formConnectBroker.values.broker),
          accountNumber: formConnectBroker.values.accountNumber,
          platform: formConnectBroker.values.platform as "MT4" | "MT5"
        }
      });
      if (!error) {
        setShowModal("SUCCESS");
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!authUser) {
    redirectLogin();
    return;
  }
  return (
    <>
      <div className="font-inter flex justify-center w-full max-h-screen h-screen">
        <div className="px-4 md:px-6 py-6 md:py-10 flex flex-col items-center w-full h-fit max-w-[760px] 2xl:max-w-[840px] bg-white rounded-4xl">
          {/* HEADER */}
          <div className="relative flex flex-col gap-2 items-center text-center">
            <Link to={getLocalizedPath("trader/broker", i18n.language)}
              className="absolute top-0 left-0 flex justify-center items-center size-8 2xl:size-12 rounded-full border border-[#DDDDDD] hover:bg-[#F5F5F5] transition-all duration-300"
            >
              <FaChevronLeft className="mr-px text-primary text-base 2xl:text-2xl" />
            </Link>
            <Link to={getLocalizedPath("", i18n.language)} className="flex gap-2 items-center cursor-pointer">
              <img
                src="/fxpayout-blue.svg"
                alt="logo fx payout"
                className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-8"
              />
              <span className="text-2xl 2xl:text-3xl font-bold text-primary">
                FXPAYOUT
              </span>
            </Link>
            <h1 className="text-2xl 2xl:text-[2rem] font-semibold">
              Hubungkan Akun Broker
            </h1>
            <p className="text-base 2xl:text-xl leading-[169.2%]">
              Lengkapi formulir di bawah ini untuk menghubungkan akun broker dan memperoleh rebate.
            </p>
          </div>

          <form onSubmit={handleSubmitConnectBroker} className="mt-8 flex flex-col gap-3 2xl:gap-5 w-full">
            <div>
              <SelectInput 
                id="broker" 
                label={"Pilih Broker"}
                icon="/bank-icon.svg" 
                altIcon="Icon broker" 
                defaultValue={`<Pilih>`} 
                value={formConnectBroker.values.broker} 
                onChangeForm={formConnectBroker.handleChange} 
                optionData={resLoadBrokers.listBrokers.map((item) => item.id.toString())}
                labelOptions={resLoadBrokers.listBrokers.map((item) => item.name)}
                errorMessage={formConnectBroker.errors.broker}
                disabled={isLoading || resLoadBrokers.loading || resLoadBrokers.error !== ""}
                required />
              {resLoadBrokers.loading && 
                <p className="mt-2 text-sm 2xl:text-lg text-black/60">Sedang memuat data broker...</p>
              }
              {resLoadBrokers.error && !resLoadBrokers.loading && 
                <p className="mt-2 text-sm 2xl:text-lg text-black/60">Data broker gagal dimuat. {" "}
                  <span onClick={fetchBrokerList} className="text-[#DF1E1E] underline cursor-pointer">Coba lagi</span>.
                </p>
              }
            </div>
            <TextInput
              id="accountNumber"
              label={"Nomor Akun Trading"}
              icon="/number-account-icon.svg"
              altIcon="Icon Account Number"
              value={formConnectBroker.values.accountNumber}
              onChangeForm={formConnectBroker.handleChange} 
              placeholder={"Nomor akun trading"}
              autoComplete="off"
              inputMode="numeric"
              typeInput={"text"}
              errorMessage={formConnectBroker.errors.accountNumber}
              isMobileLabel={false}
              disabled={isLoading}
              required />
            <div className="flex flex-col md:flex-row gap-4 2xl:gap-5">
              <div className="w-full md:w-1/2">
                <TextInput
                  id="fullname"
                  label={"Nama Lengkap"}
                  icon="/user-icon.svg"
                  altIcon="Icon User"
                  value={authUser.fullName}
                  onChangeForm={() => {}} 
                  placeholder={"Masukkan nama lengkap"}
                  inputMode="text"
                  typeInput={"text"}
                  isMobileLabel={false}
                  disabled
                  required />
              </div>
              <div className="w-full md:w-1/2">
                <TextInput
                  id="email"
                  label={"Alamat Email"}
                  icon="/email-icon.svg"
                  altIcon="Icon Email"
                  value={authUser.email}
                  onChangeForm={() => {}} 
                  placeholder={"Masukkan alamat email"}
                  inputMode="email"
                  autoComplete="email" 
                  typeInput={"text"}
                  isMobileLabel={false}
                  disabled
                  required />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 2xl:gap-5">
              <div className="w-full md:w-1/2">
                <SelectInput 
                  id="platform" 
                  label={"Pilih Platform"}
                  icon="/bank-icon.svg" 
                  altIcon="Icon broker" 
                  defaultValue={`<Pilih>`} 
                  value={formConnectBroker.values.platform} 
                  onChangeForm={formConnectBroker.handleChange} 
                  optionData={["MT4", "MT5"]}
                  errorMessage={formConnectBroker.errors.platform}
                  disabled={isLoading}
                  required />
              </div>
              <div className="w-full md:w-1/2">
                <TextInput
                  id="phoneNumber"
                  label={"Nomor Telepon"}
                  icon="/phone-icon.svg"
                  altIcon="Icon Phone"
                  value={authUser.phoneNumber}
                  onChangeForm={() => {}}
                  placeholder={"Masukkan nomor telepon"}
                  inputMode="numeric"
                  typeInput={"text"}
                  isMobileLabel={false}
                  disabled
                  required />
              </div>
            </div>
            <div className="mt-2 flex flex-col md:flex-row gap-4 2xl:gap-5">
              <div className="w-full md:w-1/2">
                <p className="text-base 2xl:text-xl text-black/80">
                  *Mohon periksa kembali detail akun Anda. Kesalahan pengisian data dapat menghambat proses verifikasi dan sinkronisasi rebate Anda.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Button 
                  disabled={isLoading} 
                  loading={isLoading} 
                  variant="primary-light" 
                  buttonType="submit" 
                  className="mt-2 w-full! py-4! 2xl:py-5!">
                  Verifikasi
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showModal === "SUCCESS" && 
        <SuccessModal 
          title={"Broker berhasil ditambahkan"}
          paragraph={"Broker telah berhasil ditambahkan. Silakan lanjutkan untuk melakukan transaksi atau kelola broker Anda."}
          closeText={"Tutup"}
          isVisible={showModal === "SUCCESS"} 
          toggleModal={() => {
            setShowModal(null);
            redirectUser(authUser, "broker");
          }} />}
    </>
  )
}

export default AddBrokerTrader;
