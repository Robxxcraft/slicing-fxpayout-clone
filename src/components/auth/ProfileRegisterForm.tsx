import type { FormUpdateProfile } from "@/types/auth.type";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";

const ProfileRegisterForm = ({
  onSubmitData,
  form,
  errors,
  handleChangeForm,
  isLoading
}: {
  onSubmitData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: FormUpdateProfile;
  errors: Partial<Record<keyof FormUpdateProfile, string>>;
  handleChangeForm: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
  isLoading: boolean
}) => {
  return (
    <form onSubmit={onSubmitData} className="mt-8 flex flex-col gap-3 w-full">
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
      {form.referral !== null &&
        <TextInput 
          id="referral" 
          label="Kode Referral" 
          placeholder="Masukkan kode referral" 
          value={form.referral} 
          onChangeForm={handleChangeForm} 
          typeInput="text"
          isMobileLabel={false}
          helperText="Kode referral hanya dapat diisi saat ini"
          disabled={isLoading}
          errorMessage={errors.referral}
        />
      }
      <Button 
        disabled={isLoading} 
        loading={isLoading} 
        variant="primary-light" 
        buttonType="submit" 
        className="mt-2 w-full! py-4! 2xl:py-5!">
        Simpan Data
      </Button>
    </form>
  )
}

export default ProfileRegisterForm;
