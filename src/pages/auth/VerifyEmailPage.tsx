import { AuthAPI } from '@/api';
import AuthLayoutHeader from '@/components/auth/AuthLayoutHeader';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';
import UserContext from '@/context/UserContext';
import { scrollToErrorInput } from '@/helper/formHelper';
import { getLocalizedPath } from '@/helper/pathHelper';
import { useForm } from '@/hooks/useForm';
import { useRedirectByRole } from '@/hooks/useRedirectByRole';
import { UserModel } from '@/models/user.model';
import { putAccessToken } from '@/services/apiClient';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmailPage = () => {
  const { i18n } = useTranslation();
  const formOtp = useForm<{otp: string}>({
    otp: ""
  });
  const [initialization, setInitialization] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailVerification, setEmailVerification] = useState<string>("");
  const [timerResendOtp, setTimerResendOtp] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [authUser, setAuthUser] = useContext(UserContext);
  const { redirectUser } = useRedirectByRole();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimerResendOtp((prev) => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          sessionStorage.removeItem("countdown_resend_otp");
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        sessionStorage.setItem("countdown_resend_otp", newValue.toString());
        return newValue;
      });
    }, 1000);
  }

  useEffect(() => {
    redirectUser(authUser);
    
    const email = location.state?.emailVerification || sessionStorage.getItem("email_verification");
    if (!email) {
      navigate(getLocalizedPath("login", i18n.language));
      return;
    }
    setEmailVerification(email);
    setInitialization(false);
  }, [authUser, i18n.language, location.state?.emailVerification, navigate, redirectUser]);

  useEffect(() => {
    const timer = sessionStorage.getItem("countdown_resend_otp");
    if (timer && Number(timer) > 0) {
      setTimerResendOtp(Number(timer));
      startTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, []);

  const handleSubmitVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { isValidate, errorInput } = formOtp.validate((vals: { otp: string }) => {
        const errors: Partial<Record<"otp", string>> = {};
        if (vals.otp.trim() === "") {
          errors.otp = "Kode otp tidak boleh kosong";
        }
        return errors;
      });
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
      
      const { error, message, accessToken } = await AuthAPI.verifyOtp({
        otp: formOtp.values.otp,
        email: emailVerification
      });

      if (!error && accessToken) {
        putAccessToken(accessToken);
        const responseAuth = await AuthAPI.getAuthUser();
        if (!responseAuth.error) {
          const userData = UserModel.mapAuthUser(responseAuth.data);
          setAuthUser(userData);
          
          navigate(getLocalizedPath("profile-register", i18n.language));
        } else {
          toast.error(responseAuth.message);
        }
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const resendEmailOtp = async () => {
    if (timerResendOtp > 0) return;
    setTimerResendOtp(59);

    const { error, message } = await AuthAPI.generateOtp({ email: emailVerification });
    if (error) {
      toast.error(message);
      setTimerResendOtp(0);
      return;
    }

    startTimer();
  }

  if (initialization) {
    return null;
  }

  return (
    <div className="font-inter flex justify-center w-full max-h-screen h-screen">
      <div className="px-4 md:px-6 py-6 md:py-10 flex flex-col items-center w-full h-fit max-w-[560px] 3xl:max-w-[560px] bg-white rounded-4xl">
        <AuthLayoutHeader 
          title="Verifikasi Email"
          paragraph={<>
            Kode verifikasi dikirimkan ke {" "}
            {emailVerification[0]}{"*".repeat(emailVerification.split("@")[0].length - 1)}{emailVerification.split("@")[1]}. 
            Silahkan periksa kotak masuk atau folder spam Anda. Belum menerima kode? Silahkan tunggu atau {" "} 
            {timerResendOtp > 0 ?
              <span>Anda dapat meminta kode baru lagi dalam 00:{timerResendOtp.toString().padStart(2, "0")}</span>
            :
              <span
                onClick={resendEmailOtp}
                className="text-primary font-medium cursor-pointer"
              >Kirim Ulang</span>
            }
            .
          </>}
        />
        <VerifyEmailForm
          onSubmitVerification={handleSubmitVerification}
          form={formOtp.values}
          handleChangeForm={formOtp.handleChange}
          errors={formOtp.errors}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default VerifyEmailPage;
