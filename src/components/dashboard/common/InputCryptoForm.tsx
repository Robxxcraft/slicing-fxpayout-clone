import TextInput from "@/components/ui/TextInput";
import type { WalletFormDetail } from "@/types/wallet.type";
import { TiInfoLarge } from "react-icons/ti";

const InputCryptoForm = ({ values, handleChange, errors }: { 
  values: WalletFormDetail;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: Partial<Record<keyof WalletFormDetail, string>>;  
}) => {
  return (
    <>
      <div className="w-full">
        <TextInput 
          id="token" 
          label="Token"
          placeholder="Contoh: USDT" 
          value={values.token || ""} 
          onChangeForm={handleChange} 
          typeInput="text"
          labelClassName="text-sm! 2xl:text-lg! text-black/60!"
          inputClassName="py-2.5! px-2! w-full"
          gap={8}
          errorMessage={errors.token}
          required
          disabled
        />
      </div>
      <div className="w-full">
        <TextInput 
          id="network" 
          label="Jaringan"
          placeholder="Contoh: BNB" 
          value={values.network || ""} 
          onChangeForm={handleChange} 
          typeInput="text" 
          labelClassName="text-sm! 2xl:text-lg! text-black/60!"
          inputClassName="py-2.5! px-2! w-full"
          gap={8}
          errorMessage={errors.network}
          required
          disabled
        />
      </div>
      <div className="w-full">
        <TextInput 
          id="accountNumber" 
          label="Alamat Wallet"
          placeholder="Masukkan alamat wallet" 
          value={values.accountNumber} 
          onChangeForm={handleChange} 
          typeInput="text"
          labelClassName="text-sm! 2xl:text-lg! text-black/60!"
          inputClassName="py-2.5! px-2! w-full"
          gap={8}
          errorMessage={errors.accountNumber}
          required
        />
        <div className="mt-3">
          <div className="flex gap-2">
            <span className="mt-1 flex shrink-0 items-center justify-center size-4 2xl:size-7 border border-primary rounded-full">
              <TiInfoLarge className="text-sm 2xl:text-base text-primary" />
            </span>
            <p className="w-fit text-base md:text-sm font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
              Pastikan alamat wallet yang Anda input adalah alamat USDT dengan jaringan BNB Smart Chain (BEP20) yang benar dan valid.
              <br />
              Kesalahan pengimputan alamat wallet, penggunaan jaringan yang tidak sesuai, atau pengiriman ke alamat yang salah sepenuhnya menjadi tanggung jawab pengguna. Transaksi blockchain bersifat final dan tidak dapat dibatalkan maupun dipulihkan setelah diproses.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputCryptoForm;
