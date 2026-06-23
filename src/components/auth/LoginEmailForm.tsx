import type { FormLogin } from "@/types/auth.type";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

const LoginEmailForm = ({
  onLoginUser,
  form,
  errors,
  handleChangeForm,
  isLoading
}: {
  onLoginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: FormLogin;
  errors: Partial<Record<keyof FormLogin, string>>;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean
}) => {
  return (
    <form onSubmit={onLoginUser} className="mt-8 flex flex-col gap-3 w-full">
      <TextInput 
        id="email" 
        label="Email" 
        // icon="/email-icon.svg" 
        // altIcon="Icon email" 
        placeholder="Masukkan email" 
        value={form.email} 
        onChangeForm={handleChangeForm} 
        typeInput="text" 
        autoComplete="email"
        isMobileLabel={false}
        errorMessage={errors.email}
        disabled={isLoading}
        inputClassName="py-3! text-base!"
        labelClassName="text-base!"
        required
      />
      <TextInput 
        id="password" 
        label="Password" 
        // icon="/lock-icon.svg"
        // altIcon="Icon lock" 
        placeholder="Masukkan password" 
        value={form.password} 
        onChangeForm={handleChangeForm} 
        typeInput="password" 
        autoComplete="off"
        isMobileLabel={false}
        errorMessage={errors.password}
        disabled={isLoading}
        inputClassName="py-3! text-base!"
        labelClassName="text-base!"
        required
      />
      <Button 
        disabled={isLoading} 
        loading={isLoading} 
        variant="primary-light" 
        buttonType="submit" 
        className="mt-2 w-full! py-3! text-base!">
        Masuk
      </Button>
    </form>
  )
}

export default LoginEmailForm;
