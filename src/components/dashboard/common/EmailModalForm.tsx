import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { IoCloseOutline } from "react-icons/io5";

const EmailModalForm = ({ 
  isVisible, 
  handleClose,
  onSubmitButton,
  emailValue,
  handleChangeForm,
  errors,
  isLoading
}: {
  isVisible: boolean;
  handleClose: () => void;
  onSubmitButton: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  emailValue: string;
  handleChangeForm: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  errors?: string;
  isLoading: boolean
}) => {
  return (
    <Modal 
      isOpen={isVisible} 
      isOverlayClose={false} 
      maxWCL="max-w-[550px]" 
      onClose={() => {
        if (isLoading) return;
        handleClose(); 
      }}>
      <div className="font-inter">
        <div className="text-center">
          <IoCloseOutline 
            onClick={() => {
              if (isLoading) return;
              handleClose(); 
            }} 
            className="ml-auto text-black text-2xl cursor-pointer"/>
          <h3 className="text-xl md:text-2xl 2xl:text-[2rem] font-semibold leading-[180%]">
            Masukkan Email Baru
          </h3>
          <p className="mb-4 text-sm md:text-base 2xl:text-xl text-black/80 leading-[180%]">
            Kode OTP akan dikirimkan ke email baru Anda untuk melakukan verifikasi
          </p>
        </div>
        <form id="email-form" onSubmit={onSubmitButton}>
          <TextInput 
            id="email" 
            label="Alamat Email" 
            placeholder="Masukkan alamat email" 
            value={emailValue} 
            onChangeForm={handleChangeForm}
            inputMode="email" 
            typeInput="text" 
            errorMessage={errors}
            isMobileLabel={false}
            disabled={isLoading}
            required
          />
          <div className="mt-4 md:mt-8 grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              buttonType="button" 
              onClick={() => {
                if (isLoading) return;
                handleClose(); 
              }}
              disabled={isLoading}
              className="py-3! 2xl:py-4! text-lg! md:text-2xl font-medium!"
            > Batal
            </Button>
            <Button 
              variant="primary-light" 
              buttonType="submit" 
              form="email-form"
              loading={isLoading}
              disabled={isLoading}
              className="py-3! 2xl:py-4! text-lg! md:text-2xl font-medium!"
            > Lanjutkan
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EmailModalForm;
