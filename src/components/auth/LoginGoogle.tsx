import { AuthAPI } from '@/api';
import UserContext from '@/context/UserContext';
import { getLocalizedPath } from '@/helper/pathHelper';
import { useRedirectByRole } from '@/hooks/useRedirectByRole';
import { UserModel } from '@/models/user.model';
import { putAccessToken } from '@/services/apiClient';
import { GoogleLogin } from '@react-oauth/google';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../ui/Spinner';
import BalanceContext from '@/context/BalanceContext';

const LoginGoogle = ({ role, status }: { role?: string, status: "signin" | "signup" }) => {
  const { i18n } = useTranslation();
  const [, setAuthUser] = useContext(UserContext);
  const [, setBalance] = useContext(BalanceContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { redirectUser } = useRedirectByRole();
  const navigate = useNavigate();
  return (
    <div 
      className="relative mt-8 py-2 flex justify-center gap-4 w-full border border-black/60 rounded-lg cursor-pointer hover:bg-[#F5F5F5] active:bg-black/10 transition-all duration-300 overflow-hidden"
    >
      <GoogleLogin 
        onSuccess={async (credentialResponse) => {
          setIsLoading(true);
          try {
            const response = await fetch("http://localhost:3000/api/v1/auth/login/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                token: credentialResponse.credential, 
                role: role
              })
            });
            const responseJson = await response.json();
  
            if (response.status !== 200) {
              toast.error(responseJson.message);
              return;
            }
            putAccessToken(responseJson.result.accessToken);
            const responseAuth = await AuthAPI.getAuthUser();
            if (!responseAuth.error) {
              const userData = UserModel.mapAuthUser(responseAuth.data);
              setAuthUser(userData);
              
              if (UserModel.isIncompleteProfile(userData)) {
                navigate(getLocalizedPath("profile-register", i18n.language));
              } else {
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
                redirectUser(userData);
              }
            } else {
              toast.error(responseAuth.message);
            }
          } finally {
            setIsLoading(false);
          }
        }}

        onError={() => {
          toast.error("Error menghubungkan ke Google. Silahkan coba beberapa saat lagi.");
        }}
        text={status === "signin" ? "signin_with" : "signup_with"}
        containerProps={{ 
          style: {
            width: "100%",
            position: "absolute",
            top: "0px",
            opacity: 0,
            zIndex: 99,
            inset: 0
          }
        }}
      />
      {isLoading ?
        <div className="flex items-center gap-2">
          <Spinner w="w-7" />
          <p className="text-base text-black/60">Processing...</p>
        </div>
        :
        <>
          <img src="/google-icon.svg" alt="Icon google" 
          />
          <p className="text-base font-semibold text-black/60">
            {status === "signin" ? "Login dengan Google" 
            :
              "Daftar dengan Google"
            }
          </p>
        </>
      }
    </div>
  )
}

export default LoginGoogle;
