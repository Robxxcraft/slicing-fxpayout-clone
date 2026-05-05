import { AuthAPI } from '@/api';
import UserContext from '@/context/UserContext';
import { getLocalizedPath } from '@/helper/pathHelper';
import { useRedirectByRole } from '@/hooks/useRedirectByRole';
import { UserModel } from '@/models/user.model';
import { BASE_URL, putAccessToken } from '@/services/apiClient';
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BalanceContext from '@/context/BalanceContext';

const LoginGoogle = ({ 
  role, 
  status,
  handleChangeLoading
}: { 
  role?: string, 
  status: "signin" | "signup";
  handleChangeLoading: (status: boolean) => void;
}) => {
  const { i18n } = useTranslation();
  const [, setAuthUser] = useContext(UserContext);
  const [, setBalance] = useContext(BalanceContext);
  const { redirectUser } = useRedirectByRole();
  const navigate = useNavigate();
  return (
    <div 
      className="mt-8 w-full"
    >
      <GoogleLogin 
        onSuccess={async (credentialResponse) => {

          handleChangeLoading(true);
          try {
            const response = await fetch(`${BASE_URL}/auth/login/google`, {
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
            handleChangeLoading(false);
          }
        }}

        onError={() => {
          toast.error("Unable to connect to Google. Please try again in a few moments.");
        }}
        text={status === "signin" ? "signin_with" : "signup_with"}
        theme="outline"
        shape="pill"
        width="100%"
        containerProps={{ 
          style: {
            width: "100%",
            position: "relative",
            top: "0px",
            opacity: 100,
            zIndex: 99,
            inset: 0
          }
        }}
      />
    </div>
  )
}

export default LoginGoogle;
