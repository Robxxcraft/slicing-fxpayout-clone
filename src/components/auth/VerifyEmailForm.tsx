import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

const VerifyEmailForm = ({
  onSubmitVerification,
  form,
  errors,
  handleChangeForm,
  isLoading
}: {
  onSubmitVerification: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: {otp: string};
  errors: Partial<Record<keyof {otp: string}, string>>;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean
}) => {
  return (
    <form onSubmit={onSubmitVerification} className="mt-8 flex flex-col gap-3 w-full">
      <TextInput 
        id="otp" 
        label="Kode OTP" 
        placeholder="Masukkan kode otp" 
        value={form.otp} 
        onChangeForm={handleChangeForm} 
        typeInput="text" 
        autoComplete="off"
        isMobileLabel={false}
        errorMessage={errors.otp}
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
        Verifikasi
      </Button>
    </form>
  )
}

export default VerifyEmailForm;
