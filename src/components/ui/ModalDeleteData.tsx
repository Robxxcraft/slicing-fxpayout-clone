import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const ModalDeleteData = ({ 
  isVisible, 
  title,
  paragraph,
  handleClose,
  handleDelete,
}: {
  title: string;
  paragraph: string;
  isVisible: boolean;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <div className="flex flex-col">
        <h3 className="text-xl md:text-2xl 2xl:text-[2rem] font-bold text-gray-900 leading-[180%]">
          {title}
        </h3>
        <p className="mb-8 text-sm md:text-base 2xl:text-2xl text-black/80 leading-[180%]">
          {paragraph}
        </p>
        <div className="flex gap-3 justify-end">
          <Button 
            variant="no-bg" 
            buttonType="button" 
            onClick={handleClose}
            className="py-3! 2xl:py-4! text-lg! font-medium!"
          > Batal
          </Button>
          <Button 
            variant="danger" 
            disabled={isLoading}
            loading={isLoading}
            buttonType="button" 
            onClick={async () => {
              setIsLoading(true);
              await handleDelete();
              setIsLoading(false);
            }}
            className="py-3! 2xl:py-4! text-lg! font-medium!"
          > Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteData;
