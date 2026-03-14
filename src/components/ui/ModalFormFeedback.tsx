import { useRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextInput from "./TextInput";
import { useForm } from "@/hooks/useForm";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import TextArea from "./TextArea";
import { checkValidFormFeedback } from "@/helper/validationForm/formValFeedback";
import { scrollToErrorInput } from "@/helper/formHelper";
import { postFormFeedback } from "@/utils/api";
import { toast } from "react-toastify";
import type { FormFeedback, ModalResponse } from "@/types/validationForm";
import { IoCloseOutline } from "react-icons/io5";

const ModalFormFeedback = ({ 
  isVisible, 
  handleClose,
  setShowResponse
}: {
  isVisible: boolean;
  handleClose: () => void;
  setShowResponse: React.Dispatch<React.SetStateAction<ModalResponse>>
}) => {
  const { t, i18n } = useTranslation(["homepage"]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formFeedback = useForm<FormFeedback>({
    rating: 0,
    username: "",
    location: "",
    review: ""
  }); 
  const [captchaValue, setCaptcaValue] = useState<string>("");
  const [errorMessageCapthca, setErrorMessageCapthca] = useState<string>("");

  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptcaValue(value);
    }
    setErrorMessageCapthca("");
  }

  const handleClickRatingStar = (index: number) => {
    if (formFeedback.values.rating === index + 1) {
      formFeedback.setSpecificValue("rating", 0);
    } else {
      formFeedback.setSpecificValue("rating", index + 1);
    }
  }

  const handleSubmitTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const checkValidationForm = formFeedback.validate(checkValidFormFeedback);

      if (!checkValidationForm.isValidate) {
        const errorField = checkValidationForm.errorInput;
        if (errorField) scrollToErrorInput(errorField);
        return;
      }

      if (!captchaValue) {
        setErrorMessageCapthca("homepage:reviews.modal.errors.captcha");
        return;
      }

      const { error, message } = await postFormFeedback({ item: formFeedback.values, captchaValue: captchaValue });

      if (error) {
        toast.error(t(message));
        if (recaptchaRef.current !== null) recaptchaRef.current.reset();
        setCaptcaValue("");
      } else {
        handleClose();
        setShowResponse("SUCCESS");
        formFeedback.resetForm();
        if (recaptchaRef.current !== null) recaptchaRef.current.reset();
        setCaptcaValue("");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const isEmptyField = !(formFeedback.values.username.trim()) || !(formFeedback.values.location.trim()) || !(formFeedback.values.review.trim());
  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <div className="pr-2 flex flex-col max-h-[calc(100vh-100px)] overflow-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/review-primary-icon.svg" alt="Review Primary Icon" />
            <h3 className="text-xl md:text-2xl 2xl:text-[2rem] font-bold text-transparent bg-linear-to-b from-primary to-dark-primary bg-clip-text leading-[180%]">
              {t("homepage:reviews.modal.title")}
            </h3>
          </div>
          <IoCloseOutline onClick={handleClose} className="text-primary text-4xl cursor-pointer"/>
        </div>
        <div className="my-6 flex flex-col gap-4">
          <p className="text-sm md:text-base 2xl:text-xl font-medium text-black text-center leading-[180%]">
            {t("homepage:reviews.modal.paragraph")}
          </p>
          <div className="grid grid-cols-5 md:flex justify-center gap-2 md:gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <img 
                key={index}
                src={index + 1 <= formFeedback.values.rating  ? "/fill-star.svg" : "/outline-star.svg"}
                alt="Star Rating"
                className="w-[90%] md:w-12 cursor-pointer"
                onClick={() => handleClickRatingStar(index)}
              />
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmitTestimonial}>
          <div className="flex flex-col gap-4">
            <TextInput 
              id="username"
              label={t("homepage:reviews.modal.form.usernameLabel")}
              icon="/user-icon.svg"
              altIcon="Icon User" 
              placeholder={t("homepage:reviews.modal.form.usernamePlaceholder")}
              value={formFeedback.values.username} 
              onChangeForm={formFeedback.handleChange} 
              autoComplete="name" 
              typeInput={"text"}
              errorMessage={formFeedback.errors.username && t(formFeedback.errors.username)}
              required />
            <TextInput 
              id="location"
              label={t("homepage:reviews.modal.form.locationLabel")}
              icon="/location-icon.svg"
              altIcon="Icon Location" 
              placeholder={t("homepage:reviews.modal.form.locationPlaceholder")}
              value={formFeedback.values.location} 
              onChangeForm={formFeedback.handleChange} 
              autoComplete="home city" 
              typeInput={"text"}
              errorMessage={formFeedback.errors.location && t(formFeedback.errors.location)}
              required />
            <TextArea 
              id="review"
              label={t("homepage:reviews.modal.form.reviewLabel")}
              icon="/review-gray-icon.svg"
              altIcon="Icon Review" 
              placeholder={t("homepage:reviews.modal.form.reviewPlaceholder")}
              value={formFeedback.values.review} 
              onChangeForm={formFeedback.handleChange} 
              isMobileLabel={false}
              maxLength={250}
              errorMessage={formFeedback.errors.review && t(formFeedback.errors.review)}
              required />
          </div>
          <div className="my-6 flex justify-start w-full h-fit">
            <ReCAPTCHA 
              key={i18n.language}
              ref={recaptchaRef}
              sitekey={import.meta.env["VITE_KEY_CAPTHCA"]}
              onChange={handleCaptchaChange}
              onExpired={() => setCaptcaValue("")}
              className="g-recaptcha"
              hl={i18n.language}
            />
            {errorMessageCapthca &&
              <span className="text-sm 2xl:text-base text-red-500">
                {t(errorMessageCapthca)}
              </span>
            }
          </div>
          <div>
            <Button 
              variant="primary-light" 
              disabled={isLoading || isEmptyField}
              loading={isLoading}
              buttonType="submit" 
              className="py-4! 2xl:py-5! text-lg! 2xl:text-xl! font-medium! w-full!"
            > {t("homepage:reviews.modal.form.submit")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalFormFeedback;
