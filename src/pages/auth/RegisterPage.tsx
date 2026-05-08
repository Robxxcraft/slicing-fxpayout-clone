import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { scrollToErrorInput } from "@/helper/formHelper";
import { useForm } from "@/hooks/useForm";
import { checkValidRegisterInput } from "@/helper/validationForm/authValidation";
import type { UserRole } from "@/types/user.type";
import { AuthAPI } from "@/api";
import type { FormRegister } from "@/types/auth.type";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import UserContext from "@/context/UserContext";
import LoginGoogle from "@/components/auth/LoginGoogle";
import AuthLayoutHeader from "@/components/auth/AuthLayoutHeader";
import RegisterEmailForm from "@/components/auth/RegisterEmailForm";
import RoleRegisterSwitch from "@/components/auth/RoleRegisterSwitch";
import { getLocalStorage, setLocalStorage } from "@/services/apiClient";

const RegisterPage = () => {
  const { i18n } = useTranslation();
  const formRegister = useForm<FormRegister>({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [authUser] = useContext(UserContext);
  const { redirectUser } = useRedirectByRole();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    redirectUser(authUser);
  }, [authUser, redirectUser]);

  useEffect(() => {
    const referralCode = searchParams.get("ref");
    if (referralCode) {
      const existingRefCode = getLocalStorage("referral_code");
      if (!existingRefCode) {
        setLocalStorage("referral_code", referralCode);
      }
    }
  }, [searchParams]);

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { isValidate, errorInput } = formRegister.validate(checkValidRegisterInput);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
      
      const { error, message } = await AuthAPI.register({
        form: formRegister.values,
        role: selectedRole
      });
      
      if (!error) {
        await AuthAPI.generateOtp({ email: formRegister.values.email });
        sessionStorage.setItem("email_verification", formRegister.values.email);
        navigate(getLocalizedPath("verify-email", i18n.language), {
          state: { emailVerification: formRegister.values.email }
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeLoading = (status: boolean) => {
    setIsLoading(status);
  }

  return (
    <div className="font-inter flex justify-center w-full max-h-screen h-screen">
      <div className="px-4 md:px-6 py-6 md:py-10 flex flex-col items-center w-full h-fit max-w-[400px] bg-white rounded-4xl">
        <AuthLayoutHeader 
          title="Buat akun baru FXPayout"
          paragraph="Pilih role yang diingikan terlebih dahulu, kemudian daftar akun menggunakan email atau google."
        />
        <RoleRegisterSwitch
          role={selectedRole}
          changeRole={setSelectedRole}
        />
        <LoginGoogle 
          role={selectedRole} 
          status="signup" 
          handleChangeLoading={handleChangeLoading}
        />
        <div className="mt-8 relative text-center w-full">
          <div className="h-px w-full border border-light-gray"></div>
          <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 bg-white">
            <span className="text-sm 2xl:text-base font-medium text-black/60">
              Atau
            </span>
          </div>
        </div>
        <RegisterEmailForm
          onRegisterUser={handleRegisterUser}
          form={formRegister.values}
          handleChangeForm={formRegister.handleChange}
          errors={formRegister.errors}
          isLoading={isLoading}
          role={selectedRole}
        />
        
        <p className="mt-8 text-sm 2xl:text-base text-black/80">
          Sudah memiliki akun? {" "} 
          <Link to={getLocalizedPath("login", i18n.language)} className="font-medium text-primary cursor-pointer hover:underline">
            Login Sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage;
