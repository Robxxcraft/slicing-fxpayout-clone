import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { scrollToErrorInput } from "@/helper/formHelper";
import { useForm } from "@/hooks/useForm";
import { checkValidLoginInput } from "@/helper/validationForm/loginValidation";
import type { UserProfile } from "@/models/user";
import type { FormLogin } from "@/types/login";
import { login, putAccessToken } from "@/utils/api";

const LoginPage = ({ authUser }: { authUser: UserProfile | null }) => {
  const formLogin = useForm<FormLogin>({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard/validation-data");
    }
  }, [authUser, navigate]);

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { isValidate, errorInput } = formLogin.validate(checkValidLoginInput);
    if (!isValidate && errorInput !== null) {
      scrollToErrorInput(errorInput);
      setIsLoading(false);
      return;
    }
    
    const { error, message, token } = await login(formLogin.values);
    setIsLoading(false);
    
    if (!error) {
      putAccessToken(token);
      navigate("/dashboard/validation-data");
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="font-inter flex justify-center items-center w-full max-h-screen h-screen bg-primary">
      <div className="mx-4 px-4 md:px-6 py-6 md:py-10 flex flex-col items-center w-full h-fit max-w-[450px] 2xl:max-w-[560px] bg-white rounded-4xl">
        <img
          src="/fxpayout-blue.svg"
          alt="logo fx payout"
          className="w-8 2xl:w-10"
        />
        <h1 className="mt-3 md:mt-4 text-2xl 2xl:text-4xl font-semibold text-primary">
          FX Payout Login
        </h1>
        <form onSubmit={handleLoginUser} className="mt-3 flex flex-col gap-3 w-full">
          <TextInput 
            id="username" 
            label="Username" 
            icon="/user-icon.svg" 
            altIcon="Icon user" 
            placeholder="Masukkan username" 
            value={formLogin.values.username} 
            onChangeForm={formLogin.handleChange} 
            typeInput="text" 
            autoComplete="username"
            isMobileLabel={false}
            errorMessage={formLogin.errors.username}
            required
          />
          <TextInput 
            id="password" 
            label="Password" 
            icon="/lock-icon.svg"
            altIcon="Icon lock" 
            placeholder="Masukkan password" 
            value={formLogin.values.password} 
            onChangeForm={formLogin.handleChange} 
            typeInput="password" 
            autoComplete="off"
            isMobileLabel={false}
            errorMessage={formLogin.errors.password}
            required
          />
          <Button 
            disabled={isLoading} 
            loading={isLoading} 
            variant="primary-light" 
            buttonType="submit" 
            className="mt-2 w-full! py-4! 2xl:py-5!">
            Login
          </Button>
        </form>
        <div className="mt-6">
          <p className="text-sm 2xl:text-base text-black/60 font-semibold">
            Wrong page direction? Go back <Link to="/" className="text-primary underline">here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
