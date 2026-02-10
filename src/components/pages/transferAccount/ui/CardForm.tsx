import TextInput from "@/components/ui/TextInput";
import type { TransferFormState } from "../TransferForm"
import SelectInput from "@/components/ui/SelectInput";
import { brokers } from "@/utils/dataBroker/brokers";
import BoundedIcon from "../../brokerDetail/ui/BoundedIcon";
import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";

const CardForm = ({ form, handleChangeForm, setSelectedBroker }: 
{
  form: TransferFormState; 
  handleChangeForm: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
  setSelectedBroker: React.Dispatch<React.SetStateAction<BrokerStruc | null>>;
}) => {
  const allBrokers = Object.values(brokers).map(broker => broker.name);

  const handleChangeBroker = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const broker = Object.values(brokers).filter((broker) => broker.name === e.target.value);
    if (broker.length > 0) setSelectedBroker(broker[0]);
    handleChangeForm(e);
  }
  
  return (
    <div className="py-6 2xl:py-8 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
      <div className="pb-4 md:pb-6 px-4 md:px-6 2xl:px-8 flex items-center gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/form-icon.svg" alt="icon"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          Lengkapi Formulir
        </h3>
      </div>
      <div className="px-4 md:px-6 2xl:px-8 mt-4 md:mt-6 flex flex-col gap-4">
        <SelectInput 
          id="broker" 
          label="Pilih Broker" 
          icon="bank-icon.svg" 
          altIcon="Icon broker" 
          defaultValue="&lt;Pilih&gt;" 
          value={form.broker} 
          onChangeForm={handleChangeBroker} 
          optionData={allBrokers}
          required />
        <TextInput 
          id="accountNumber"
          label="Nomor Akun" 
          icon="/number-account-icon.svg"
          altIcon="Icon Number Account" 
          placeholder="Masukkan Nomor Akun"
          value={form.accountNumber} 
          onChangeForm={handleChangeForm} 
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          typeInput={"text"}
          maxLength={16}
          required />
        <TextInput 
          id="username"
          label="Nama Pemegang Rekening" 
          icon="/user-icon.svg"
          altIcon="Icon User" 
          placeholder="Nama Sesuai Pemegang Rekening"
          value={form.username} 
          onChangeForm={handleChangeForm} 
          autoComplete="cc-name" 
          typeInput={"text"}
          required />
      </div>
    </div>
  )
}

export default CardForm