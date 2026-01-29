import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TripleBadgeFlow from "@/components/ui/TripleBadgeFlow";
import Button from "@/components/ui/Button";
import CardValidation from "./CardValidation";
import CardBankForm from "./CardBankForm";
import { useForm } from "@/hooks/useForm";

export type FormValidation = {
  broker: string;
  identityUsername: string;
  email: string;
  accountNumber: string;
  tradingUsername: string;
  handphoneNumber: string;
}
export type FormBank = {
  rebate: string;
  bank: string;
  rekeningNumber: string;
  holdingUsername: string;
}

const ValidationForm = () => {
  const recaptchaRef = useRef<never>(null);
  const formValidation = useForm<FormValidation>({
    broker: "",
    identityUsername: "",
    email: "",
    accountNumber: "",
    tradingUsername: "",
    handphoneNumber: ""
  });
  const formBank = useForm<FormBank>({
    rebate: "",
    bank: "",
    rekeningNumber: "",
    holdingUsername: "",
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleCaptchaChange = (value: string | null) => {
    if (value) setIsVerified(true);
  }
  const handleSubmit = () => {
    if (!isVerified) return;
  }

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 mt-6 lg:mt-8 2xl:mt-10">
      <div className="p-4 md:p-8 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
        <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
          <div className="xl:max-w-[540px]">
            <h2 className="text-xl md:text-[1.75rem] 2xl:text-[2rem] text-black font-semibold">
              Validasi Akun Trading
            </h2>
            <p className="mt-2 w-full text-base 2xl:text-2xl font-medium text-black/60 leading-[160%]">
              Lengkapi formulir di bawah ini untuk  dan ikuti panduan untuk memverifikasi akun trading Anda.
            </p>
          </div>
          <div className="flex justify-end w-full">
            <TripleBadgeFlow first="Isi Data Akun Trading" second="Isi Data Bank Pencairan" third="Kirim & Tunggu Verifikasi" />
          </div>
        </div>
        <div className="mt-6 md:mt-8 grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
          <div className="py-6 2xl:py-8 col-span-12 xl:col-span-7 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
            <CardValidation 
              form={formValidation.values} 
              handleChangeForm={formValidation.handleChange} />
          </div>
          <div className="py-6 2xl:py-8 col-span-12 xl:col-span-5 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
            <CardBankForm 
              selectedBroker={formValidation.values.broker} 
              form={formBank.values} 
              handleChangeForm={formBank.handleChange}/>
          </div>
          <div className="col-span-12 xl:col-span-7 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#222222]/80 leading-[142%]">
              *Data Anda dijaga kerahasiaannya dan hanya digunakan untuk proses verifikasi serta pencairan rebate fxpayout.
            </p>
            <div className="flex justify-start md:justify-end w-full h-fit">
              <ReCAPTCHA 
                ref={recaptchaRef}
                sitekey={import.meta.env["VITE_KEY_CAPTHCA"]}
                onChange={handleCaptchaChange}
                className="g-recaptcha"
              />
            </div>
          </div>
          <div className="col-span-12 xl:col-span-5">
            <Button onClick={handleSubmit} variant="primary-light" className="py-4! 2xl:py-5! md:text-[20px]! 2xl:text-[24px]! font-medium! w-full">
              Submit Validasi
            </Button>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default ValidationForm;
