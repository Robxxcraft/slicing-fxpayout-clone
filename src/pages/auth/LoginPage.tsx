import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { scrollToErrorInput } from "@/helper/formHelper";
import { getLocalizedPath } from "@/helper/pathHelper";
import { checkValidLoginInput } from "@/helper/validationForm/authValidation";
import { useForm } from "@/hooks/useForm";
import type { FormLogin } from "@/types/auth.type";
import { AuthAPI } from "@/api";
import { putAccessToken } from "@/services/apiClient";
import UserContext from "@/context/UserContext";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import LoginGoogle from "@/components/auth/LoginGoogle";
import AuthLayoutHeader from "@/components/auth/AuthLayoutHeader";
import LoginEmailForm from "@/components/auth/LoginEmailForm";
import { UserModel } from "@/models/user.model";
import BalanceContext from "@/context/BalanceContext";

const LoginPage = () => {
  const { i18n } = useTranslation();
  const formLogin = useForm<FormLogin>({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useContext(UserContext);
  const [, setBalance] = useContext(BalanceContext);
  const { redirectUser } = useRedirectByRole();

  useEffect(() => {
    redirectUser(authUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { isValidate, errorInput } = formLogin.validate(checkValidLoginInput);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
      
      const { error, message, token } = await AuthAPI.login(formLogin.values);
      if (!error) {
        putAccessToken(token);
        const responseAuth = await AuthAPI.getAuthUser();
        if (!responseAuth.error) {
          const userData = UserModel.mapAuthUser(responseAuth.data);
          const respBalance = await AuthAPI.getBalanceUser();
          if (!respBalance.error && respBalance.data) {
            const tempBalance = {
              userId: userData.id,
              balance: respBalance.data.amount,
              currency: respBalance.data.currency
            };
            setBalance(tempBalance);
          } else {
            setBalance({
              userId: userData.id,
              balance: 0,
              currency: "USD"
            });
          }
          setAuthUser(userData);
          
          const searchParams = new URLSearchParams(window.location.search);
          const nextPath = searchParams.get("next");
          if (nextPath) {
            navigate(nextPath);
          } else {
            redirectUser(userData);
          }
        } else {
          toast.error(responseAuth.message);
        }
      } else if (message === "Email is not verified, please verify your email first") {
        sessionStorage.setItem("email_verification", formLogin.values.email);
        navigate(getLocalizedPath("verify-email", i18n.language), {
          state: { emailVerification: formLogin.values.email }
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
          title="Masuk ke akun FXPayout"
        />
        <LoginGoogle 
          status="signin"
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
        <LoginEmailForm 
          onLoginUser={handleLoginUser}
          form={formLogin.values}
          handleChangeForm={formLogin.handleChange}
          errors={formLogin.errors}
          isLoading={isLoading}
        />
        
        <p className="mt-8 text-sm 2xl:text-base text-black/80">
          Belum memiliki akun? {" "} 
          <Link to={getLocalizedPath("register", i18n.language)} className="font-medium text-primary cursor-pointer hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage;
