import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import SelectInput from '@/components/ui/SelectInput';
import TextInput from '@/components/ui/TextInput';
import type { FormBank } from './ValidationForm';

const SUPPORT_BANK = ["BCA","BRI","MANDIRI","BNI","BSI","LAINNYA"]

const CardBankForm = ({ form, handleChangeForm, selectedBroker, errors }: 
  {
    form: FormBank; 
    handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    selectedBroker: string;
    errors: Partial<Record<keyof FormBank, string>>;
  }) => {
  
  return (
    <>
      <div className="pb-4 md:pb-6 px-4 md:px-6 2xl:px-8 flex items-center gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/bank-icon.svg" alt="icon" maskColor="bg-primary"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          Data Bank Deposit & Pencairan
        </h3>
      </div>
      <div className="px-4 md:px-6 2xl:px-8 mt-4 md:mt-6 flex flex-col gap-4">
        <SelectInput 
          id="rebate" 
          label="Rebate Ke" 
          icon="bank-icon.svg" 
          altIcon="Icon rebate" 
          mobileHelperText="Pilih Broker Terlebih Dahulu"
          showMobileHelperText={selectedBroker.trim() === ""}
          defaultValue={selectedBroker.trim() === "" ? `<Pilih Broker Terlebih Dahulu>` : "<Pilih Rebate>"}
          value={form.rebate} 
          onChangeForm={handleChangeForm} 
          disabled={selectedBroker.trim() === ""}
          optionData={["Akun Trading", "Bank"]}
          errorMessage={errors.rebate}
          required />
        <SelectInput 
          id="tempBank" 
          label="Bank" 
          icon="bank-icon.svg" 
          altIcon="Icon bank" 
          defaultValue="&lt;Pilih Bank&gt;" 
          value={form.tempBank} 
          onChangeForm={handleChangeForm} 
          optionData={SUPPORT_BANK}
          errorMessage={errors.tempBank}
          required />
        {form.tempBank === "LAINNYA" &&
          <TextInput
            id="bank"
            label="Nama Bank"
            icon="bank-icon.svg"
            altIcon="Icon bank"
            value={form.bank}
            onChangeForm={handleChangeForm} 
            placeholder="Contoh: SeaBank" 
            typeInput={"text"}
            errorMessage={errors.bank}
            helperText="Pastikan sesuai dengan rekening tujuan untuk menghindari kesalahan transfer."
            required />
        }
        <TextInput
          id="rekeningNumber"
          label="Nomor Rekening"
          icon="wallet-icon.svg"
          altIcon="Icon card"
          value={form.rekeningNumber}
          onChangeForm={handleChangeForm} 
          placeholder="Masukkan Nomor Rekening" 
          inputMode="numeric"
          autoComplete="off"
          typeInput={"text"}
          errorMessage={errors.rekeningNumber}
          required />
        <TextInput
          id="holdingUsername"
          label="Nama Pemegang Rekening"
          icon="user-icon.svg"
          altIcon="Icon user"
          value={form.holdingUsername}
          onChangeForm={handleChangeForm} 
          placeholder="Nama Sesuai Buku Rekening" 
          autoComplete="cc-name" 
          typeInput={"text"}
          errorMessage={errors.holdingUsername}
          required />
      </div>
    </>
  )
}

export default CardBankForm;
