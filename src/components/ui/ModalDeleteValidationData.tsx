import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const ModalDeleteValidationData = ({ 
  isVisible, 
  title,
  handleClose,
  handleDelete,
}: {
  title: string;
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
        <p className="mb-8 text-sm md:text-base 2xl:text-2xl text-gray-500 leading-[180%]">
          Data yang dipilih akan dihapus permanen dari sistem dan tidak dapat dipulihkan kembali.
        </p>
        <div className="flex gap-3 justify-end">
          <Button 
            variant="no-bg" 
            buttonType="button" 
            onClick={handleClose}
            className="py-3! 2xl:py-4! text-lg! md:text-2xl font-medium!"
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
            className="py-3! 2xl:py-4! text-lg! md:text-2xl font-medium!"
          > Hapus Data
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteValidationData;
