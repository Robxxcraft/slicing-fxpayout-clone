import TextInput from "@/components/ui/TextInput";
import type { WalletFormDetail } from "@/types/wallet.type";

const InputBankForm = ({ values, handleChange, errors }: { 
  values: WalletFormDetail;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: Partial<Record<keyof WalletFormDetail, string>>;  
}) => {
  return (
    <>
      <div className="w-full">
        <TextInput 
          id="bank" 
          label="Bank"
          placeholder="Contoh: BRI, BNI, Dana, dll" 
          value={values.bank || ""} 
          onChangeForm={handleChange} 
          typeInput="text" 
          labelClassName="text-sm! 3xl:text-lg! text-black/60!"
          inputClassName="py-2.5! px-2! w-full"
          gap={8}
          errorMessage={errors.bank}
          required
        />
      </div>
      <div className="w-full">
        <TextInput 
          id="accountNumber" 
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening" 
          value={values.accountNumber} 
          onChangeForm={handleChange} 
          typeInput="text"
          inputMode="numeric"
          labelClassName="text-sm! 3xl:text-lg! text-black/60!"
          inputClassName="py-2.5! px-2! w-full"
          gap={8}
          errorMessage={errors.accountNumber}
          helperText="Gunakan angka saja tanpa tanda baca" 
          helperTextClassName="text-sm! 3xl:text-lg!"
          required
        />
      </div>
      <div className="w-full">
        <TextInput 
          id="username" 
          label="Nama Pemilik Rekening"
          placeholder="Masukkan nama pemilik rekening" 
          value={values.username || ""} 
          onChangeForm={handleChange} 
          typeInput="text"
          inputMode="text"
          autoComplete="name"
          labelClassName="text-sm! 3xl:text-lg! text-black/60!"
          inputClassName="py-2.5! px-2! w-full"
          gap={8}
          errorMessage={errors.username} 
          helperText="Pastikan nama sesuai dengan yang tertera di buku tabungan atau aplikasi m-banking Anda."
          helperTextClassName="text-sm! 3xl:text-lg!"
          required
        />
      </div>
    </>
  )
}

export default InputBankForm;