import Button from "./Button";
import Modal from "./Modal";

const ErrorModal = ({ 
  isVisible, toggleModal 
}: {
  isVisible: boolean;
  toggleModal: () => void
}) => {
  return (
    <Modal isOpen={isVisible} onClose={toggleModal}>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <img 
            src="success-icon.webp" 
            alt="Success" 
            className="size-32 md:size-40 object-contain"
          />
        </div>
        <h3 className="text-xl md:text-2xl 2xl:text-[2rem] font-bold text-gray-900 leading-[180%]">
          Permintaan Validasi Akun Trading Gagal Dikirim
        </h3>
        <p className="mb-8 text-base 2xl:text-2xl text-gray-500 leading-[180%]">
          Coba kirimkan ulang formulir anda beberapa saat lagi.
        </p>
        <Button 
          variant="primary-light" 
          buttonType="button" 
          onClick={toggleModal}
          className="py-4! w-full! text-lg! md:text-2xl font-medium!"
        >
          kembali
        </Button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
