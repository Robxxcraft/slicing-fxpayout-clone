import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TripleBadgeFlow from "@/components/ui/TripleBadgeFlow";
import Button from "@/components/ui/Button";
import CardValidation from "./CardValidation";
import CardBankForm from "./CardBankForm";
import { useForm } from "@/hooks/useForm";
import SuccessModal from "@/components/ui/SuccessModal";
import { scrollToErrorInput, validateOnlyNumber } from "@/helper/formHelper";
import { postFormValidationData } from "@/utils/api";
import type { ValidationData } from "@/models/validationData";
import type { FormBank, FormValidation, ModalResponse } from "@/types/validationForm.type";
import { checkValidFormValidation } from "@/helper/validationForm/formValAccount";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useLockBodyScroll } from "@/hooks/useBodyLockScroll";

const ValidationForm = () => {
  const { t, i18n } = useTranslation(["validationpage"]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formValidation = useForm<FormValidation>({
    broker: "",
    identityUsername: "",
    email: "",
    accountNumber: "",
    platform: "",
    handphoneNumber: ""
  });
  const formBank = useForm<FormBank>({
    rebate: "",
    tempBank: "",
    bank: "",
    rekeningNumber: "",
    holdingUsername: "",
  });
  const [captchaValue, setCaptcaValue] = useState<string>("");
  const [errorMessageCapthca, setErrorMessageCapthca] = useState<string>("");
  const [showModal, setShowModal] = useState<ModalResponse>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const otherBank = t("validationpage:card.bankForm.otherBank");

  useLockBodyScroll(showModal !== null);
  
  const handleTempBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    formBank.handleChange(e);

    if (value !== otherBank) {
      formBank.setSpecificValue("bank", value);
    } else if (value === otherBank) {
      formBank.setSpecificValue("bank", "");
    }
  }

  const checkValidFormBank = (vals: FormBank) => {
    const errors: Partial<Record<keyof FormBank, string>> = {};
    const key = "validationpage:card.bankForm.errors";
    if (!vals.rebate) errors.rebate = `${key}.rebateRequired`;
    
    if (formBank.values.tempBank === otherBank) {
      if (!vals.bank.trim()) errors.bank = `${key}.bankRequired`;
    } else {
      formBank.setSpecificValue("bank", formBank.values.tempBank);
    }
    if (!vals.tempBank) {
      errors.tempBank = `${key}.otherBankRequired`;
    }
    
    if (!vals.rekeningNumber.trim()) {
      errors.rekeningNumber = `${key}.rekeningNumberRequired`;
    } else if (!validateOnlyNumber(vals.rekeningNumber)) {
      errors.rekeningNumber = `${key}.rekeningNumberInvalid`;
    }  

    if (!vals.holdingUsername.trim()) errors.holdingUsername = `${key}.holdingUsernameRequired`;;  

    return errors;
  }

  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptcaValue(value);
    }
    setErrorMessageCapthca("");
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const checkFormValidation = formValidation.validate(checkValidFormValidation);
      const checkFormBank = formBank.validate(checkValidFormBank);
  
      if (!(checkFormValidation.isValidate && checkFormBank.isValidate)) {
        const errorField = checkFormValidation.errorInput || checkFormBank.errorInput;
        if (errorField) scrollToErrorInput(errorField);
        return;
      }
      if (!captchaValue) {
        setErrorMessageCapthca("validationpage:card.errors.captcha");
        return;
      }
      const item: ValidationData = {
        id: "0",
        full_name: formValidation.values.identityUsername,
        email: formValidation.values.email,
        broker: formValidation.values.broker,
        platform: formValidation.values.platform,
        trading_account_number: formValidation.values.accountNumber,
        phone_number: formValidation.values.handphoneNumber,
        rebate: formBank.values.rebate === "Bank" ? "bank" : "trading",
        bank: formBank.values.bank,
        bank_account_name: formBank.values.holdingUsername,
        bank_account_number: formBank.values.rekeningNumber,
      }
  
      const { error, message } = await postFormValidationData({ item, captchaValue });
  
      if (error) {
        toast.error(t(message));
        if (recaptchaRef.current !== null) recaptchaRef.current.reset();
        setCaptcaValue("");
      } else {
        setShowModal("SUCCESS");
        formValidation.resetForm();
        formBank.resetForm();
        if (recaptchaRef.current !== null) recaptchaRef.current.reset();
        setCaptcaValue("");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const isValidationFilled = Object.values(formValidation.values).every((v) => v?.toString().trim() !== "");
  const isBankFilled = Object.values(formBank.values).every((v) => v?.toString().trim() !== "");
  const stepperActive = isBankFilled && isValidationFilled ? 2 : isValidationFilled ? 1 : 0;

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 mt-6 lg:mt-8 3xl:mt-10">
      <div className="p-4 md:p-8 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
        <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
          <div className="xl:max-w-[540px]">
            <h2 className="text-xl md:text-[1.75rem] 3xl:text-[2rem] text-black font-semibold">
              {t("validationpage:card.title")}
            </h2>
            <p className="mt-2 w-full text-base 3xl:text-2xl font-medium text-black/60 leading-[160%]">
              {t("validationpage:card.paragraph")}
            </p>
          </div>
          <div className="flex justify-end w-full">
            <TripleBadgeFlow 
              stepperActive={stepperActive}
              steps={[t("validationpage:card.steps.0"), t("validationpage:card.steps.1"), t("validationpage:card.steps.2")]} 
            />
          </div>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="mt-6 md:mt-8 grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6"
        >
          <div className="py-6 3xl:py-8 col-span-12 xl:col-span-7 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
            <CardValidation 
              form={formValidation.values} 
              handleChangeForm={formValidation.handleChange}
              errors={formValidation.errors} />
          </div>
          <div className="py-6 3xl:py-8 col-span-12 xl:col-span-5 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
            <CardBankForm 
              selectedBroker={formValidation.values.broker} 
              form={formBank.values} 
              handleChangeForm={formBank.handleChange}
              handleTempBankChange={handleTempBankChange}
              errors={formBank.errors} />
          </div>
          <div className="col-span-12 xl:col-span-7 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#222222]/80 leading-[142%]">
              {t("validationpage:card.warning")}
            </p>
            <div>
              <div className="flex justify-start md:justify-end w-full h-fit">
                <ReCAPTCHA 
                  key={i18n.language}
                  ref={recaptchaRef}
                  sitekey={import.meta.env["VITE_KEY_CAPTHCA"]}
                  onChange={handleCaptchaChange}
                  onExpired={() => setCaptcaValue("")}
                  className="g-recaptcha"
                  hl={i18n.language}
                />
              </div>
              {errorMessageCapthca &&
                <span className="text-sm 3xl:text-base text-red-500">
                  {t(errorMessageCapthca)}
                </span>
              }
            </div>
          </div>
          <div className="col-span-12 xl:col-span-5">
            <Button 
              loading={isLoading}
              disabled={isLoading}
              buttonType="submit" 
              variant="primary-light" 
              className="py-4! 3xl:py-5! md:text-[20px]! 3xl:text-[24px]! font-medium! w-full">
              {t("validationpage:card.button")}
            </Button>
          </div>
        </form>
      </div>

      {showModal === "SUCCESS" && 
      <SuccessModal 
        title={t("validationpage:success.title")}
        paragraph={t("validationpage:success.paragraph")}
        closeText={t("validationpage:success.back")}
        isVisible={showModal === "SUCCESS"} 
        toggleModal={() => setShowModal(null)} />}
    </section>
  )
}

export default ValidationForm;
