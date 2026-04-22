import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { AuthAPI } from "@/api";
import UserContext from "@/context/UserContext";
import { useForm } from "@/hooks/useForm";
import { getLocalizedPath } from "@/helper/pathHelper";
import { scrollToErrorInput, validateValidEmail } from "@/helper/formHelper";
import { checkValidProfileRegister } from "@/helper/validationForm/authValidation";
import type { FormUpdateProfile } from "@/types/auth.type";
import type { ModalResponse } from "@/types/validationForm.type";

import TinyButton from "@/components/dashboard/common/TinyButton";
import OtpModalForm from "@/components/dashboard/common/OtpModalForm";
import EmailModalForm from "@/components/dashboard/common/EmailModalForm";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import SuccessModal from "@/components/ui/SuccessModal";

import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { TbGenderBigender } from "react-icons/tb";

type ProfileLayout = {
  icon: React.ReactNode,
  title: string;
  content: string;
};

const ProfilePage = () => {
  const { i18n } = useTranslation();
  const [authUser, setAuthUser] = useContext(UserContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<ModalResponse>(null);
  const [showModalUpdateEmail, setShowModalUpdateEmail] = useState<{email: boolean; otp: boolean}>({
    email: false,
    otp: false
  });
  const formProfile = useForm<FormUpdateProfile>({
    username: authUser?.username || "",
    fullname: authUser?.fullName || "",
    gender: authUser?.gender || "male",
    phoneNumber: authUser?.phoneNumber.substring(2) || "",
    referral: authUser?.referralCode || null
  });
  const formEmailUpdate = useForm<{email: string; otp: string}>({
    email: "",
    otp: ""
  })
  const navigate = useNavigate();
  const role = authUser?.role === "admin" ? "admin" 
    : authUser?.role === "affiliator" ? "affiliator" 
    : "trader";

  useEffect(() => {
    if (
      formProfile.values.username.trim() === "" || 
      formProfile.values.fullname.trim() === "" || 
      formProfile.values.gender.trim() === "" || 
      formProfile.values.phoneNumber.trim() === ""
    ) {
      setCanSubmitUpdate(false);
    } else {
      setCanSubmitUpdate(true);
    }
  }, [formProfile.values]);

  const profileData: ProfileLayout[] = [
    { 
      icon: <FaUser className="text-black/60" />,
      title: "Username",
      content: authUser?.username || ""
    },
    { 
      icon: <FaUser className="text-black/60" />,
      title: "Nama Lengkap",
      content: authUser?.fullName || ""
    },
    { 
      icon: <TbGenderBigender className="text-2xl text-black/60" />,
      title: "Jenis Kelamin",
      content: authUser?.gender === "male" ? "Laki-laki" : authUser?.gender === "female" ? "Perempuan" : ""
    },
    { 
      icon: <IoIosMail className="text-xl text-black/60" />,
      title: "Alamat Email",
      content: authUser?.email || ""
    },
    { 
      icon: <FaPhoneAlt className="text-black/60" />,
      title: "Nomor Telp",
      content: authUser?.phoneNumber || ""
    },
  ];

  const handleSubmitUpdate = async () => {
    if (!authUser || isLoading || !canSubmitUpdate) return;
    setIsLoading(true);

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
        setIsEditing(false);
        setShowModal("SUCCESS");
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleButtonProfil = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    handleSubmitUpdate();
  };

  const redirecRouteToChangePassword = () => {
    if (isEditing) setIsEditing(false);
    navigate(getLocalizedPath(`${role}/profile/change-password`, i18n.language));
  };

  const [timerResendOtp, setTimerResendOtp] = useState<number>(0);
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
    const timer = sessionStorage.getItem("countdown_resend_otp");
    if (timer && Number(timer) > 0) {
      setTimerResendOtp(Number(timer));
      startTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, []);

  const sendOtpChangeEmail = async () => {
    if (!authUser) return { error: true, message: "Failed to process. Please try again later." };
    
    if (timerResendOtp <= 1) {
      setTimerResendOtp(59);
      const { error, message } = await AuthAPI.changeEmail({ 
        userId: authUser.id,
        email: formEmailUpdate.values.email
      });
      
      if (error) {
        setTimerResendOtp(0);
      } 
      startTimer();
      return { error, message };
    } else {
      return { error: false, message: "Processing to verify OTP." };
    }
  }

  const handleNextOtpModal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authUser) return;
    setIsLoading(true);

    try {
      const { isValidate, errorInput } = formEmailUpdate.validate((vals: { email: string }) => {
        const errors: Partial<Record<"email", string>> = {};
        if (vals.email.trim() === "") {
          errors.email = "Email tidak boleh kosong";
        } else if (!validateValidEmail(vals.email)) {
          errors.email = "Format email tidak valid";
        }
        return errors;
      });
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }
  
      const { error, message } = await sendOtpChangeEmail();
      if (!error) {
        setShowModalUpdateEmail({
          email: false,
          otp: true
        });
      } else {
        formEmailUpdate.setSpecificError("email", message);
        scrollToErrorInput("email");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyChangeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authUser) return;
    setIsLoading(true);

    try {
      const { isValidate, errorInput } = formEmailUpdate.validate((vals: { otp: string }) => {
        const errors: Partial<Record<"otp", string>> = {};
        if (vals.otp.trim() === "") {
          errors.otp = "Kode OTP tidak boleh kosong";
        } 
        return errors;
      });
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }

      const { error, message } = await AuthAPI.verifyChangeEmail({ 
        userId: authUser.id,
        oldEmail: authUser.email,
        email: formEmailUpdate.values.email,
        otp: formEmailUpdate.values.otp
      });
  
      if (!error) {
        setShowModalUpdateEmail({
          email: false,
          otp: false
        });
        setAuthUser((prev) => {
          if (prev) {
            return {
              ...prev,
              email: formEmailUpdate.values.email
            }
          }
          return prev;
        });
        formEmailUpdate.resetForm();
        setIsEditing(false);
        setShowModal("SUCCESS");
      } else {
        formEmailUpdate.setSpecificError("otp", message);
        scrollToErrorInput("otp");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    <WrapperDashboardComponent>
      <section>
        <div className="flex justify-between items-center">
          <TitleDashboard>
            Informasi Profil
          </TitleDashboard>
          <TinyButton 
            buttonType="submit" 
            onClick={(e) => {
              e.preventDefault();
              handleButtonProfil();
            }} 
            disabled={!canSubmitUpdate || isLoading} 
            loading={isLoading}
            form="profile-update"
          >
            {isEditing ? "Simpan Perubahan" : "Perbarui Profil"}
          </TinyButton>
        </div>
        {isEditing ? 
          <>
            <form id="profile-update" className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
              <TextInput 
                id="username" 
                label="Username" 
                placeholder="Masukkan username" 
                value={formProfile.values.username} 
                onChangeForm={formProfile.handleChange} 
                typeInput="text" 
                isMobileLabel={false}
                errorMessage={formProfile.errors.username}
                disabled={isLoading}
                required
              />
              <TextInput 
                id="fullname" 
                label="Nama Lengkap" 
                placeholder="Masukkan nama lengkap" 
                value={formProfile.values.fullname} 
                onChangeForm={formProfile.handleChange} 
                typeInput="text"
                isMobileLabel={false}
                errorMessage={formProfile.errors.fullname}
                disabled={isLoading}
                required
              />
              <SelectInput 
                id="gender" 
                label="Jenis Kelamin"
                defaultValue="Pilih Jenis Kelamin" 
                value={formProfile.values.gender} 
                onChangeForm={formProfile.handleChange} 
                optionData={["male", "female"]}
                labelOptions={["Laki-laki", "Perempuan"]}
                errorMessage={formProfile.errors.gender}
                disabled={isLoading}
                required />
              <TextInput 
                id="phoneNumber" 
                label="Nomor Telepon" 
                placeholder="Masukkan nomor telepon" 
                value={formProfile.values.phoneNumber} 
                onChangeForm={formProfile.handleChange} 
                typeInput="text"
                inputMode="tel"
                isMobileLabel={false}
                errorMessage={formProfile.errors.phoneNumber}
                disabled={isLoading}
                required
              />
            </form>
            <div className="mt-4 md:mt-5 flex flex-col items-end w-full md:w-1/2">
              <div className="w-full">
                <TextInput 
                  id="email" 
                  label="Alamat Email" 
                  placeholder="Masukkan alamat email" 
                  value={authUser?.email || ""} 
                  onChangeForm={() => {}} 
                  typeInput="text" 
                  isMobileLabel={false}
                  disabled
                  required
                />
              </div>
              {authUser && !authUser.isGoogle ?
                <button 
                  onClick={() => setShowModalUpdateEmail(prev => ({ ...prev, email: true}))} 
                  className="mt-3 font-medium underline text-primary cursor-pointer">
                  Perbarui email
                </button>
              :
                <p className="mt-3 text-sm text-black/60">
                  Email Anda terhubung dengan akun Google dan tidak dapat diubah melalui pengaturan profil.
                </p>
              }
            </div>
          </>
          :
          <div className="mt-4 md:mt-6 px-4 2xl:px-6 py-5 2xl:py-8 bg-white border border-[#EAEAEA] rounded-xl">
            <div className="flex flex-col gap-3 md:gap-2">
              {profileData.map((data, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-8">
                  <div className="shrink-0 flex items-center gap-3 2xl:gap-4 w-1/2 md:w-[220px]">
                    <p className="size-5 md:size-7 flex justify-center items-center">
                      {data.icon}
                    </p>
                    <p className="font-medium text-sm md:text-base 2xl:text-lg text-black/60">{data.title}</p>
                  </div>
                  <div className="flex items-center gap-2 w-1/2 md:w-fit break-all">
                    <p className="font-medium text-sm md:text-base 2xl:text-lg break-all">
                      {data.title === "Nomor Telp" && "+"}
                      {data.content}
                    </p>
                    {data.title === "Alamat Email" && authUser?.isVerified && 
                      <img src="/check.svg" alt="check icon"
                        className="mt-px scale-80"
                      />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </section>
      <section className="mt-6 md:mt-8">
        <TitleDashboard>
          Password
        </TitleDashboard>
        <Button 
          buttonType="button"
          onClick={redirecRouteToChangePassword}
          variant="primary-light" 
          className="mt-4 md:mt-6 py-3! rounded-lg!"
        > Perbarui Password
        </Button>
      </section>
    </WrapperDashboardComponent>

    {showModalUpdateEmail.email &&
      <EmailModalForm 
        isVisible={showModalUpdateEmail.email} 
        handleClose={() => {
          formEmailUpdate.resetForm();
          setShowModalUpdateEmail(prev => ({
            ...prev,
            email: false
        }))}} 
        emailValue={formEmailUpdate.values.email}
        handleChangeForm={formEmailUpdate.handleChange}
        errors={formEmailUpdate.errors.email}
        isLoading={isLoading}
        onSubmitButton={handleNextOtpModal} 
      />
    }

    {showModalUpdateEmail.otp &&
      <OtpModalForm 
        isVisible={showModalUpdateEmail.otp} 
        handleClose={() => {
          formEmailUpdate.resetForm();
          setShowModalUpdateEmail(prev => ({
            ...prev,
            otp: false
        }))}} 
        onBackModal={() => {
          formEmailUpdate.setSpecificValue("otp", "");
          setShowModalUpdateEmail({
            otp: false,
            email: true
        })}}
        otpValue={formEmailUpdate.values.otp}
        emailValue={formEmailUpdate.values.email}
        handleChangeForm={formEmailUpdate.handleChange}
        errors={formEmailUpdate.errors.otp}
        isLoading={isLoading}
        resendOtp={sendOtpChangeEmail}
        timerResendOtp={timerResendOtp}
        onSubmitButton={handleVerifyChangeEmail} 
      />
    }

    {showModal === "SUCCESS" && 
      <SuccessModal 
        title={"Perubahan profil berhasil"}
        paragraph={"Perubahan profil Anda telah berhasil disimpan. Informasi terbaru Anda kini sudah diperbarui."}
        closeText={"Tutup"}
        isVisible={showModal === "SUCCESS"} 
        toggleModal={() => setShowModal(null)} />}
    </>
  )
}

export default ProfilePage;