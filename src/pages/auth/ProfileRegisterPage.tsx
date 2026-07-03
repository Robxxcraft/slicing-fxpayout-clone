import { AuthAPI } from "@/api";
import AuthLayoutHeader from "@/components/auth/AuthLayoutHeader";
import ProfileRegisterForm from "@/components/auth/ProfileRegisterForm";
import UserContext from "@/context/UserContext";
import { scrollToErrorInput } from "@/helper/formHelper";
import { checkValidProfileRegister } from "@/helper/validationForm/authValidation";
import { useForm } from "@/hooks/useForm";
import { useRedirectByRole } from "@/hooks/useRedirectByRole";
import { UserModel } from "@/models/user.model";
import { getLocalStorage, removeLocalStorage } from "@/services/apiClient";
import type { FormUpdateProfile } from "@/types/auth.type";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileRegisterPage = () => {
  const formProfile = useForm<FormUpdateProfile>({
    username: "",
    fullname: "",
    gender: "male",
    phoneNumber: "",
    referral: null
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialization, setInitialization] = useState<boolean>(true);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useContext(UserContext);
  const { redirectUser } = useRedirectByRole();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    
    if (authUser && !UserModel.isIncompleteProfile(authUser)) {
      redirectUser(authUser);
      return;
    }

    formProfile.setSpecificValue("username", authUser.username);
    formProfile.setSpecificValue("fullname", authUser.fullName);
    if (authUser && authUser.role === "user") {
      formProfile.setSpecificValue("referral", getLocalStorage("referral_code") || "");
    }

    setInitialization(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!authUser) return;

    try {
      const { isValidate, errorInput } = formProfile.validate(checkValidProfileRegister);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        setIsLoading(false);
        return;
      }
      const { error, message } = await AuthAPI.updateProfile({ form: formProfile.values, userId: authUser.id });

      if (!error) {
        setAuthUser({
          ...authUser,
          username: formProfile.values.username,
          fullName: formProfile.values.fullname,
          gender: formProfile.values.gender,
          phoneNumber: `62${formProfile.values.phoneNumber}`,
          referralCode: formProfile.values.referral || undefined
        });
        removeLocalStorage("referral_code");
        redirectUser(authUser);
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (initialization) {
    return null;
  }

  return (
    <div className="font-inter flex justify-center w-full max-h-screen h-screen">
      <div className="px-4 md:px-6 py-6 md:py-10 flex flex-col items-center w-full h-fit max-w-[560px] 3xl:max-w-[560px] bg-white rounded-4xl">
        <AuthLayoutHeader 
          title="Selamat datang di FXPayout"
          paragraph="Lengkapi data diri Anda dan Anda siap menggunakan platform FXPayout. Data dapat diperbarui dikemudian hari."
        />
        <ProfileRegisterForm
          onSubmitData={handleSubmitData}
          form={formProfile.values}
          handleChangeForm={formProfile.handleChange}
          errors={formProfile.errors}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ProfileRegisterPage;
