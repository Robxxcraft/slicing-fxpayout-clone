import type { FormRegister } from "@/types/auth.type";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import type { UserRole } from "@/types/user.type";

const RegisterEmailForm = ({
  onRegisterUser,
  form,
  errors,
  handleChangeForm,
  isLoading,
  role
}: {
  onRegisterUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: FormRegister;
  errors: Partial<Record<keyof FormRegister, string>>;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean,
  role: UserRole
}) => {
  return (
    <form onSubmit={onRegisterUser} className="mt-8 flex flex-col gap-3 w-full">
      <TextInput 
        id="username" 
        label="Username" 
        icon="/user-icon.svg" 
        altIcon="Icon user" 
        placeholder="Masukkan username" 
        value={form.username} 
        onChangeForm={handleChangeForm} 
        typeInput="text" 
        autoComplete="username"
        isMobileLabel={false}
        errorMessage={errors.username}
        disabled={isLoading}
        required
      />
      <TextInput 
        id="email" 
        label="Email" 
        icon="/email-icon.svg" 
        altIcon="Icon Email" 
        placeholder="Masukkan email" 
        value={form.email} 
        onChangeForm={handleChangeForm} 
        typeInput="text" 
        autoComplete="email"
        isMobileLabel={false}
        errorMessage={errors.email}
        disabled={isLoading}
        required
      />
      <TextInput 
        id="password" 
        label="Password" 
        icon="/lock-icon.svg"
        altIcon="Icon lock" 
        placeholder="Masukkan password" 
        value={form.password} 
        onChangeForm={handleChangeForm} 
        typeInput="password" 
        autoComplete="off"
        isMobileLabel={false}
        errorMessage={errors.password}
        disabled={isLoading}
        required
      />
      <TextInput 
        id="password2" 
        label="Konfirmasi Password" 
        icon="/lock-icon.svg"
        altIcon="Icon lock" 
        placeholder="Masukkan konfirmasi password" 
        value={form.password2} 
        onChangeForm={handleChangeForm} 
        typeInput="password" 
        autoComplete="off"
        isMobileLabel={false}
        errorMessage={errors.password2}
        disabled={isLoading}
        required
      />
      <Button 
        disabled={isLoading} 
        loading={isLoading} 
        variant="primary-light" 
        buttonType="submit" 
        className="mt-2 w-full! py-4! 2xl:py-5!">
        Daftar {role === "user" ? "Trader" : "Affiliator"}
      </Button>
    </form>
  )
}

export default RegisterEmailForm;
