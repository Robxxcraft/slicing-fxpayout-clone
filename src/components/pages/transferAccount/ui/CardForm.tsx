import TextInput from "@/components/ui/TextInput";
import type { TransferFormState } from "../TransferForm"
import SelectInput from "@/components/ui/SelectInput";
import { brokers } from "@/utils/dataBroker/brokers";
import BoundedIcon from "../../brokerDetail/ui/BoundedIcon";

const CardForm = ({ form, handleChangeForm }: 
  {
    form: TransferFormState; 
    handleChangeForm: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  }) => {
  const allBrokers = Object.values(brokers).map(broker => broker.name);
  
  return (
    <div className="py-6 2xl:py-8 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
      <div className="pb-5 2xl:pb-6 px-6 2xl:px-8 flex items-center gap-4 md:gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/form-icon.svg" alt="icon"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          Lengkapi Formulir
        </h3>
      </div>
      <div className="px-6 2xl:px-8 mt-6 flex flex-col gap-4">
        <SelectInput 
          id="broker" 
          label="Pilih Broker" 
          icon="bank-icon.svg" 
          altIcon="Icon broker" 
          defaultValue="&lt;Pilih&gt;" 
          value={form.broker} 
          onChangeForm={handleChangeForm} 
          optionData={allBrokers} />
        <TextInput 
          id="numberAccount"
          label="Nomor Akun" 
          icon="/number-account-icon.svg"
          altIcon="Icon Number Account" 
          placeholder="Masukkan Nomor Akun"
          value={form.numberAccount} 
          onChangeForm={handleChangeForm} 
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          typeInput={"text"} />
        <TextInput 
          id="username"
          label="Nama Pemegang Rekening" 
          icon="/user-icon.svg"
          altIcon="Icon User" 
          placeholder="Nama Sesuai Pemegang Rekening"
          value={form.username} 
          onChangeForm={handleChangeForm} 
          autoComplete="cc-name" 
          typeInput={"text"} />
      </div>
    </div>
  )
}

export default CardForm