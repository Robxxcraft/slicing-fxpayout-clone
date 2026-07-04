import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { IoCloseOutline } from "react-icons/io5";

const OtpModalForm = ({ 
  isVisible, 
  handleClose,
  onBackModal,
  onSubmitButton,
  otpValue,
  emailValue,
  handleChangeForm,
  errors,
  timerResendOtp,
  resendOtp,
  isLoading
}: {
    isVisible: boolean;
  handleClose: () => void;
  onBackModal: () => void;
  onSubmitButton: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  otpValue: string;
  emailValue: string;
  handleChangeForm: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  errors?: string;
  isLoading: boolean;
  resendOtp: () => Promise<{
    error: boolean;
    message: string;
  }>,
  timerResendOtp: number
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
          <h3 className="text-xl md:text-2xl 3xl:text-[2rem] font-semibold leading-[180%]">
            Masukkan Kode OTP
          </h3>
          <p className="mb-8 text-sm md:text-base 3xl:text-xl text-black/80 leading-[180%]">
            Kode verifikasi dikirimkan ke {" "} 
            {emailValue[0]}{"*".repeat(emailValue.split("@")[0].length - 1)}{emailValue.split("@")[1]}. 
            Silahkan periksa kotak masuk atau folder spam Anda. Belum menerima kode? Tunggu atau {" "}
            {timerResendOtp > 0 ?
              <span>Anda dapat meminta kode baru lagi dalam 00:{timerResendOtp.toString().padStart(2, "0")}</span>
            :
              <span
                onClick={resendOtp}
                className="text-primary font-medium cursor-pointer"
              >Kirim Ulang</span>
            }
            .
          </p>
        </div>
        <form id="otp-form" onSubmit={onSubmitButton}>
          <TextInput 
            id="otp" 
            label="Kode OTP" 
            placeholder="Masukkan kode otp" 
            value={otpValue} 
            onChangeForm={handleChangeForm} 
            typeInput="text" 
            autoComplete="off"
            isMobileLabel={false}
            errorMessage={errors}
            disabled={isLoading}
            required
          />
          <div className="mt-4 md:mt-8 grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              buttonType="button" 
              onClick={() => {
                if (isLoading) return;
                onBackModal(); 
              }}
              disabled={isLoading}
              className="py-3! 3xl:py-4! text-lg! md:text-2xl font-medium!"
            > Kembali
            </Button>
            <Button 
              variant="primary-light" 
              buttonType="submit"
              form="otp-form" 
              disabled={isLoading}
              loading={isLoading}
              className="py-3! 3xl:py-4! text-lg! md:text-2xl font-medium!"
            > Perbarui
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default OtpModalForm;
