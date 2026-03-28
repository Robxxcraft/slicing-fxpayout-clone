import Button from "./Button";
import Modal from "./Modal";

const SuccessModal = ({ 
  title,
  paragraph,
  closeText,
  isVisible, 
  toggleModal 
}: {
  title: string;
  paragraph: string;
  closeText: string;
  isVisible: boolean;
  toggleModal: () => void
}) => {
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
          {title}
        </h3>
        <p className="mb-8 text-base 2xl:text-2xl text-gray-500 leading-[180%]">
          {paragraph}
        </p>
        <Button 
          variant="primary-light" 
          buttonType="button" 
          onClick={toggleModal}
          className="py-4! w-full! text-lg! md:text-2xl font-medium!"
        >
          {closeText}
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
