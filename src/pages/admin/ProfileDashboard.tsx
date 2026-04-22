import { useState } from "react";
import { toast } from "react-toastify";
import EditProfile from "@/components/admin/EditProfile";
import UpdatePassword from "@/components/admin/UpdatePassword";
import { scrollToErrorInput } from "@/helper/formHelper";
import { useForm } from "@/hooks/useForm";
import type { UserProfile } from "@/types/user.type";
import type { InputChangePassword, InputEditProfil, LoadingState } from "@/types/profile";
import { changePasswordUser, updateProfilUser } from "@/utils/api";
import { validatePassword, validateProfile } from "@/helper/validationForm/profileValidation";

const ProfileDashboard = ({ authUser }: {
  authUser: UserProfile
}) => {
  const [canUpdateProfile, setCanUpdateProfile] = useState<boolean>(false);
  const [loading, setLoading] = useState<LoadingState>({
    isLoad: false,
    place: ""
  });
  const formProfile = useForm<InputEditProfil>({
    username: authUser.username,
    role: authUser.role
  });
  const formChangePassword = useForm<InputChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmationPassword: ""
  });

  const submitEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canUpdateProfile) return;
    setLoading({ isLoad: true, place: "edit-profile" });
    
    const { isValidate, errorInput } = formProfile.validate(validateProfile);
    if (!isValidate && errorInput !== null) {
      scrollToErrorInput(errorInput);
      setLoading({ isLoad: false, place: "" });
      return;
    }

    const { error, message } = await updateProfilUser({ 
      userId: authUser.id, 
      username: formProfile.values.username.trim(),
      role: formProfile.values.role 
    });
    if (error) {
      toast.error(message);
    } else {
      setLoading({ isLoad: false, place: "" });
      window.location.reload();
    }
    setLoading({ isLoad: false, place: "" });
  };

  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ isLoad: true, place: "change-password" });
    
    const { isValidate, errorInput } = formChangePassword.validate(validatePassword);
    if (!isValidate && errorInput !== null) {
      scrollToErrorInput(errorInput);
      setLoading({ isLoad: false, place: "" });
      return;
    }

    const { error, message } = await changePasswordUser({ 
      userId: authUser.id, 
      oldPassword: formChangePassword.values.oldPassword,
      newPassword: formChangePassword.values.newPassword,
      confirmationPassword: formChangePassword.values.confirmationPassword 
    });
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
      formChangePassword.resetForm();
    }
    setLoading({ isLoad: false, place: "" });
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if (!canUpdateProfile) setCanUpdateProfile(true);
    if (e.target.value.trim() === "") setCanUpdateProfile(false);
    if (e.target.value === authUser.username) setCanUpdateProfile(false);

    formProfile.handleChange(e);
  };

  return (
    <>
      <EditProfile 
        form={formProfile.values} 
        errors={formProfile.errors} 
        handleChangeForm={handleChangeProfile} 
        submitEditProfile={submitEditProfile} 
        canUpdateProfile={canUpdateProfile}
        loadingState={loading}
      />
      <UpdatePassword 
        form={formChangePassword.values} 
        errors={formChangePassword.errors} 
        handleChangeForm={formChangePassword.handleChange} 
        submitChangePassword={submitChangePassword} 
        loadingState={loading}
      />
    </>
  )
}

export default ProfileDashboard;
