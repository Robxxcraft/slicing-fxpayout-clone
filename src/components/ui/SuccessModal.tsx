import { useTranslation } from "react-i18next";
import Button from "./Button";
import Modal from "./Modal";

const SuccessModal = ({ 
  isVisible, toggleModal 
}: {
  isVisible: boolean;
  toggleModal: () => void
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isVisible} onClose={toggleModal}>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <img 
            src="/success-icon.webp" 
            alt="Success" 
            className="size-32 md:size-40 object-contain"
          />
        </div>
        <h3 className="text-xl md:text-2xl 2xl:text-[2rem] font-bold text-gray-900 leading-[180%]">
          {t("validationPage.success.title")}
        </h3>
        <p className="mb-8 text-base 2xl:text-2xl text-gray-500 leading-[180%]">
          {t("validationPage.success.paragraph")}
        </p>
        <Button 
          variant="primary-light" 
          buttonType="button" 
          onClick={toggleModal}
          className="py-4! w-full! text-lg! md:text-2xl font-medium!"
        >
          {t("validationPage.success.back")}
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
