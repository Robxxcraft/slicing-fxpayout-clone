import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import SelectInput from '@/components/ui/SelectInput';
import TextInput from '@/components/ui/TextInput';
import type { FormBank } from './ValidationForm';

const CardBankForm = ({ form, handleChangeForm }: 
  {
    form: FormBank; 
    handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  }) => {
  return (
    <>
      <div className="pb-5 2xl:pb-6 px-6 2xl:px-8 flex items-center gap-4 md:gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/check.svg" alt="icon"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          Data Bank Deposit & Pencairan
        </h3>
      </div>
      <div className="px-6 2xl:px-8 mt-6 flex flex-col gap-4">
        <SelectInput 
          id="rebate" 
          label="Rebate Ke" 
          icon="bank-icon.svg" 
          altIcon="Icon rebate" 
          defaultValue="&lt;Pilih Broker Terlebih Dahulu&gt;" 
          value={form.rebate} 
          onChangeForm={handleChangeForm} 
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
          typeInput={"text"} />
        <TextInput
          id="holdingUsername"
          label="Nama Pemegang Rekening"
          icon="user-icon.svg"
          altIcon="Icon user"
          value={form.holdingUsername}
          onChangeForm={handleChangeForm} 
          placeholder="Nama Sesuai Buku Rekening" 
          typeInput={"text"} />
      </div>
    </>
  )
}

export default CardBankForm;
