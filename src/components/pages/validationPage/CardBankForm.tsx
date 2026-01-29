import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import SelectInput from '@/components/ui/SelectInput';
import TextInput from '@/components/ui/TextInput';
import type { FormBank } from './ValidationForm';

const CardBankForm = ({ form, handleChangeForm, selectedBroker }: 
  {
    form: FormBank; 
    handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    selectedBroker: string
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
          optionData={[]} />
        <SelectInput 
          id="bank" 
          label="Nama Bank" 
          icon="bank-icon.svg" 
          altIcon="Icon bank" 
          defaultValue="&lt;Pilih Bank&gt;" 
          value={form.bank} 
          onChangeForm={handleChangeForm} 
          optionData={[]} />
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
          typeInput={"text"} />
        <TextInput
          id="holdingUsername"
          label="Nama Pemegang Rekening"
          icon="user-icon.svg"
          altIcon="Icon user"
          value={form.holdingUsername}
          onChangeForm={handleChangeForm} 
          placeholder="Nama Sesuai Buku Rekening" 
          autoComplete="cc-name" 
          typeInput={"text"} />
      </div>
    </>
  )
}

export default CardBankForm;
