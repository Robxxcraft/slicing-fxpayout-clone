import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import type { FormUpdateProfile } from "@/types/auth.type";
import type { UserProfile } from "@/types/user.type";

const EditProfileForm = ({
  authUser,
  setShowModalUpdateEmail,
  form,
  errors,
  handleChangeForm,
  isLoading
}: {
  authUser: UserProfile;
  setShowModalUpdateEmail: React.Dispatch<React.SetStateAction<{
    email: boolean;
    otp: boolean;
  }>>;
  form: FormUpdateProfile;
  errors: Partial<Record<keyof FormUpdateProfile, string>>;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  isLoading: boolean;
}) => {
  return (
    <>
      <form id="profile-update" className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
        <TextInput 
          id="username" 
          label="Username" 
          placeholder="Masukkan username" 
          value={form.username} 
          onChangeForm={handleChangeForm} 
          typeInput="text" 
          isMobileLabel={false}
          errorMessage={errors.username}
          disabled={isLoading}
          required
        />
        <TextInput 
          id="fullname" 
          label="Nama Lengkap" 
          placeholder="Masukkan nama lengkap" 
          value={form.fullname} 
          onChangeForm={handleChangeForm} 
          typeInput="text"
          isMobileLabel={false}
          errorMessage={errors.fullname}
          disabled={isLoading}
          required
        />
        <SelectInput 
          id="gender" 
          label="Jenis Kelamin"
          defaultValue="Pilih Jenis Kelamin" 
          value={form.gender} 
          onChangeForm={handleChangeForm} 
          optionData={["male", "female"]}
          labelOptions={["Laki-laki", "Perempuan"]}
          errorMessage={errors.gender}
          disabled={isLoading}
          required />
        <TextInput 
          id="phoneNumber" 
          label="Nomor Telepon" 
          placeholder="Masukkan nomor telepon" 
          value={form.phoneNumber} 
          onChangeForm={handleChangeForm} 
          typeInput="text"
          inputMode="tel"
          isMobileLabel={false}
          errorMessage={errors.phoneNumber}
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
            className="mt-3 text-base 2xl:text-xl font-medium underline text-primary cursor-pointer">
            Perbarui email
          </button>
        :
          <p className="mt-3 text-base 2xl:text-xl text-black/60">
            Email Anda terhubung dengan akun Google dan tidak dapat diubah melalui pengaturan profil.
          </p>
        }
      </div>
    </>
  )
}

export default EditProfileForm;
