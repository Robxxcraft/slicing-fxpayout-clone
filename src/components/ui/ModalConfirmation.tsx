import { useState } from "react";
import Button, { type ButtonVariant } from "./Button";
import Modal from "./Modal";

const ModalConfirmation = ({ 
  isVisible, 
  title,
  paragraph,
  handleClose,
  handleConfirmation,
  btnConfirmation,
  confirmText,
  cancelText
}: {
  title: string;
  paragraph: string;
  isVisible: boolean;
  handleClose: () => void;
  handleConfirmation: () => Promise<void>;
  btnConfirmation: ButtonVariant
  confirmText: string;
  cancelText: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <div className="flex flex-col">
        <h3 className="text-xl md:text-2xl 2xl:text-[2rem] font-bold text-gray-900 leading-[180%]">
          {title}
        </h3>
        <p className="mb-8 text-sm md:text-base 2xl:text-xl text-black/80 leading-[180%]">
          {paragraph}
        </p>
        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            buttonType="button" 
            onClick={handleClose}
            className="py-3! 2xl:py-4! text-lg! md:text-2xl font-medium!"
          > {cancelText}
          </Button>
          <Button 
            variant={btnConfirmation}
            disabled={isLoading}
            loading={isLoading}
            buttonType="button" 
            onClick={async () => {
              setIsLoading(true);
              await handleConfirmation();
              setIsLoading(false);
            }}
            className="py-3! 2xl:py-4! text-lg! md:text-2xl font-medium!"
          > {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
