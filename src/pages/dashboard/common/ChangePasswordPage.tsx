import { AuthAPI } from "@/api";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import TinyButton from "@/components/dashboard/common/TinyButton";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import SuccessModal from "@/components/ui/SuccessModal";
import TextInput from "@/components/ui/TextInput";
import UserContext from "@/context/UserContext";
import { scrollToErrorInput } from "@/helper/formHelper";
import { checkValidAddPassword, checkValidChangePassword } from "@/helper/validationForm/authValidation";
import { useForm } from "@/hooks/useForm";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import type { ModalResponse } from "@/types/validationForm.type";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export type FormChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

const ChangePasswordPage = () => {
  const [authUser, setAuthUser] = useContext(UserContext);
  const formChangePassword = useForm<FormChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmationPassword: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<ModalResponse>(null);
  const { redirectUser } = useRedirectByRole();
   
  const handleChangePassword = async () => {
    if (!authUser) return; 
    setIsLoading(true);
    
    try {
      if (authUser.hasPassword) {
        const { isValidate, errorInput } = formChangePassword.validate(checkValidChangePassword);
        if (!isValidate && errorInput !== null) {
          scrollToErrorInput(errorInput);
          return;
        }
      } else {
        const { isValidate, errorInput } = formChangePassword.validate(checkValidAddPassword);
        if (!isValidate && errorInput !== null) {
          scrollToErrorInput(errorInput);
          return;
        }
      }

      const { error, message } = await AuthAPI.changePasword({
        userId: authUser.id,
        oldPassword: formChangePassword.values.oldPassword,    
        newPassword: formChangePassword.values.newPassword,    
        confirmationPassword: formChangePassword.values.confirmationPassword 
      });
      
      if (!error) {
        if (authUser.hasPassword) {
          setAuthUser({
            ...authUser,
            hasPassword: true,
          });
        }
        setShowModal("SUCCESS");
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <WrapperDashboardComponent>
        <form onSubmit={handleChangePassword}>
          <div className="flex justify-between items-center">
            <TitleDashboard>
              Perbarui Password
            </TitleDashboard>
            <TinyButton buttonType="submit"
              onClick={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              loading={isLoading}
              disabled={isLoading}
            >
              Simpan Perubahan
            </TinyButton>
          </div>
          {authUser?.hasPassword ?
            <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <TextInput 
                  id="oldPassword" 
                  label="Password Sekarang" 
                  icon="/lock-icon.svg" 
                  altIcon="Icon Lock" 
                  placeholder="Masukkan password sekarang" 
                  value={formChangePassword.values.oldPassword} 
                  onChangeForm={formChangePassword.handleChange} 
                  typeInput="password" 
                  autoComplete="off"
                  isMobileLabel={false}
                  errorMessage={formChangePassword.errors.oldPassword}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <TextInput 
                  id="newPassword" 
                  label="Password Baru" 
                  icon="/lock-icon.svg"
                  altIcon="Icon lock" 
                  placeholder="Masukkan password baru" 
                  value={formChangePassword.values.newPassword} 
                  onChangeForm={formChangePassword.handleChange} 
                  typeInput="password" 
                  autoComplete="off"
                  isMobileLabel={false}
                  errorMessage={formChangePassword.errors.newPassword}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <TextInput 
                  id="confirmationPassword" 
                  label="Konfirmasi Password" 
                  icon="/lock-icon.svg"
                  altIcon="Icon lock" 
                  placeholder="Masukkan konfirmasi password" 
                  value={formChangePassword.values.confirmationPassword} 
                  onChangeForm={formChangePassword.handleChange} 
                  typeInput="password" 
                  autoComplete="off"
                  isMobileLabel={false}
                  errorMessage={formChangePassword.errors.confirmationPassword}
                  disabled={isLoading}
                  required
                />
              </div>
            </div> : 
            <div className="mt-4">
              <ParagraphDashboard>
                Saat ini Anda terhubung menggunakan Akun Google. Tambahkan password baru untuk mengaktifkan metode login melalui email pada akun Anda.
              </ParagraphDashboard>
              <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <TextInput 
                    id="newPassword" 
                    label="Password Baru" 
                    icon="/lock-icon.svg" 
                    altIcon="Icon Lock" 
                    placeholder="Masukkan password baru" 
                    value={formChangePassword.values.newPassword} 
                    onChangeForm={formChangePassword.handleChange} 
                    typeInput="password" 
                    autoComplete="off"
                    isMobileLabel={false}
                    errorMessage={formChangePassword.errors.newPassword}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <TextInput 
                    id="confirmationPassword" 
                    label="Konfirmasi Password" 
                    icon="/lock-icon.svg"
                    altIcon="Icon lock" 
                    placeholder="Masukkan konfirmasi password" 
                    value={formChangePassword.values.confirmationPassword} 
                    onChangeForm={formChangePassword.handleChange} 
                    typeInput="password" 
                    autoComplete="off"
                    isMobileLabel={false}
                    errorMessage={formChangePassword.errors.confirmationPassword}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>
          }
        </form>
      </WrapperDashboardComponent>
      {showModal === "SUCCESS" && 
        <SuccessModal 
          title={"Perubahan password berhasil"}
          paragraph={"Perubahan password Anda telah berhasil disimpan."}
          closeText={"Tutup"}
          isVisible={showModal === "SUCCESS"} 
          toggleModal={() => {
            redirectUser(authUser, "profile");
            setShowModal(null);
          }} />}
    </>
  )
}

export default ChangePasswordPage;
