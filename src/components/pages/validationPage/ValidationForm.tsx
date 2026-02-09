import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TripleBadgeFlow from "@/components/ui/TripleBadgeFlow";
import Button from "@/components/ui/Button";
import CardValidation from "./CardValidation";
import CardBankForm from "./CardBankForm";
import { useForm } from "@/hooks/useForm";
import SuccessModal from "@/components/ui/SuccessModal";
import { scrollToErrorInput, validateOnlyNumber } from "@/helper/formHelper";

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
  tempBank: string;
  bank: string;
  rekeningNumber: string;
  holdingUsername: string;
}

const ValidationForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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
    tempBank: "",
    bank: "",
    rekeningNumber: "",
    holdingUsername: "",
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [errorMessageCapthca, setErrorMessageCapthca] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [stepperActive, setStepperActive] = useState<number>(0);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  
  useEffect(() => {
    const isValidationFilled = Object.values(formValidation.values).every((str) => str.trim() !== "");
    const isBankFilled = Object.values(formBank.values).every((str) => str.trim() !== "");
    
    if (isBankFilled && isValidationFilled) {
      setStepperActive(2);
    } else if (isValidationFilled && !isBankFilled) {
      setStepperActive(1);
    } else {
      setStepperActive(0);
    }
  }, [formBank.values, formValidation.values]);

  const checkValidFormValidation = () => {
    let inputError: string | null = null;
    const isValidFormValidation = formValidation.validate((vals) => {
      const newErrors: Partial<Record<keyof FormValidation, string>> = {};
      if (!vals.broker) newErrors.broker = "Broker harus dipilih";
      if (!vals.identityUsername.trim()) newErrors.identityUsername = "Nama lengkap tidak boleh kosong";
      if (vals.email.trim() === "") {
        newErrors.email = "Email tidak boleh kosong";
      } else if (!vals.email.includes("@")) {
        newErrors.email = "Email tidak valid";
      }
      
      if (!vals.accountNumber.trim()) {
        newErrors.accountNumber = "Nomor akun tidak boleh kosong";
      } else if (!validateOnlyNumber(vals.accountNumber)) {
        newErrors.accountNumber = "Nomor akun tidak valid";
      }

      if (!vals.tradingUsername.trim()) newErrors.tradingUsername = "Nama akun tidak boleh kosong";

      if (!vals.handphoneNumber.trim()) {
        newErrors.handphoneNumber = "Nomor HP tidak boleh kosong";
      } else if (!validateOnlyNumber(vals.handphoneNumber)) {
        newErrors.handphoneNumber = "Nomor HP tidak valid";
      }
      const keys = Object.keys(newErrors);
      if (keys.length > 0) inputError = keys[0];

      return newErrors;
    });
    return {
      inputError,
      isFormValidationOk: isValidFormValidation
    }
  }

  const checkValidFormBank = () => {
    let inputError: string | null = null;
    const isValidFormValidation = formBank.validate((vals) => {
      const newErrors: Partial<Record<keyof FormBank, string>> = {};
      if (!vals.rebate) newErrors.rebate = "Broker harus dipilih";
    
      if (formBank.values.tempBank === "LAINNYA") {
        if (!vals.bank.trim()) newErrors.bank = "Nama bank tidak boleh kosong";
      } else if (!vals.tempBank) {
        newErrors.tempBank = "Bank harus dipilih"
      }
      
      if (!vals.rekeningNumber.trim()) {
        newErrors.rekeningNumber = "Nomor rekening tidak boleh kosong";
      } else if (!validateOnlyNumber(vals.rekeningNumber)) {
        newErrors.rekeningNumber = "Nomor rekening tidak valid";
      }

      if (!vals.holdingUsername.trim()) newErrors.holdingUsername = "Nama pemegang rekening tidak boleh kosong";

      const keys = Object.keys(newErrors);
      if (keys.length > 0) inputError = keys[0];

      return newErrors;
    });
    return {
      inputError,
      isFormBankOk: isValidFormValidation
    }
  }

  const handleCaptchaChange = (value: string | null) => {
    if (value) setIsVerified(true);
    setErrorMessageCapthca("");
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const checkFormValidation = checkValidFormValidation();
    const checkFormBank = checkValidFormBank();

    if (!(checkFormValidation.isFormValidationOk && checkFormBank.isFormBankOk)) {
      const errorField = checkFormValidation.inputError || checkFormBank.inputError;

      if (errorField) scrollToErrorInput(errorField);
      return;
    }
    if (!isVerified) {
      setErrorMessageCapthca("Mohon konfirmasi bahwa Anda bukan robot");
      return;
    }

    if (recaptchaRef.current !== null) recaptchaRef.current.reset();
    setIsVerified(false);
    formValidation.resetForm();
    formBank.resetForm();
    setShowModal(true);
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
            <TripleBadgeFlow 
              stepperActive={stepperActive}
              steps={["Isi Data Akun Trading", "Isi Data Bank Pencairan", "Kirim & Tunggu Verifikasi"]} 
            />
          </div>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="mt-6 md:mt-8 grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6"
        >
          <div className="py-6 2xl:py-8 col-span-12 xl:col-span-7 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
            <CardValidation 
              form={formValidation.values} 
              handleChangeForm={formValidation.handleChange}
              errors={formValidation.errors} />
          </div>
          <div className="py-6 2xl:py-8 col-span-12 xl:col-span-5 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
            <CardBankForm 
              selectedBroker={formValidation.values.broker} 
              form={formBank.values} 
              handleChangeForm={formBank.handleChange}
              errors={formBank.errors} />
          </div>
          <div className="col-span-12 xl:col-span-7 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#222222]/80 leading-[142%]">
              *Data Anda dijaga kerahasiaannya dan hanya digunakan untuk proses verifikasi serta pencairan rebate fxpayout.
            </p>
            <div>
              <div className="flex justify-start md:justify-end w-full h-fit">
                <ReCAPTCHA 
                  ref={recaptchaRef}
                  sitekey={import.meta.env["VITE_KEY_CAPTHCA"]}
                  onChange={handleCaptchaChange}
                  onExpired={() => setIsVerified(false)}
                  className="g-recaptcha"
                />
              </div>
              {errorMessageCapthca &&
                <span className="text-sm 2xl:text-base text-red-500">
                  {errorMessageCapthca}
                </span>
              }
            </div>
          </div>
          <div className="col-span-12 xl:col-span-5">
            <Button buttonType="submit" variant="primary-light" className="py-4! 2xl:py-5! md:text-[20px]! 2xl:text-[24px]! font-medium! w-full">
              Submit Validasi
            </Button>
          </div>
        </form>
      </div>

      {showModal && <SuccessModal isVisible={showModal} toggleModal={() => setShowModal(false)} />}
    </section>
  )
}

export default ValidationForm;
