import SelectInput from '@/components/ui/SelectInput';
import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import TextInput from '@/components/ui/TextInput';
import { brokers } from '@/utils/dataBroker/brokers';
import type { FormValidation } from './ValidationForm';

const CardValidation = ({ form, handleChangeForm, errors }: 
  {
    form: FormValidation; 
    errors: Partial<Record<keyof FormValidation, string>>;
    handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  }) => {
  const allBrokers = Object.values(brokers).map((broker) => broker.name);
  return (
    <>
      <div className="pb-4 md:pb-6 px-4 md:px-6 2xl:px-8 flex items-center gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/check.svg" alt="icon"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          Formulir Validasi
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
          onChangeForm={handleChangeForm} 
          optionData={allBrokers}
          errorMessage={errors.broker}
          required />
        <TextInput
          id="identityUsername"
          label="Nama"
          icon="user-icon.svg"
          altIcon="Icon user"
          value={form.identityUsername}
          onChangeForm={handleChangeForm} 
          placeholder="Nama Lengkap Sesuai Identitas"
          autoComplete="name" 
          typeInput={"text"}
          errorMessage={errors.identityUsername}
          required />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <TextInput
              id="email"
              label="Email"
              icon="email-icon.svg"
              altIcon="Icon Email"
              value={form.email}
              onChangeForm={handleChangeForm} 
              placeholder="Gunakan Email Aktif" 
              inputMode="email"
              autoComplete="email" 
              typeInput={"text"}
              errorMessage={errors.email}
              required />
          </div>
          <div className="w-full md:w-1/2">
            <TextInput
              id="accountNumber"
              label="Nomor Akun"
              icon="number-account-icon.svg"
              altIcon="Icon Account Number"
              value={form.accountNumber}
              onChangeForm={handleChangeForm} 
              placeholder="Nomor Akun Trading" 
              autoComplete="off"
              inputMode="numeric"
              typeInput={"text"}
              errorMessage={errors.accountNumber}
              required />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <TextInput
              id="tradingUsername"
              label="Atas Nama Akun"
              icon="user-icon.svg"
              altIcon="Icon user"
              value={form.tradingUsername}
              onChangeForm={handleChangeForm} 
              placeholder="Nama Sesuai Akun Trading" 
              autoComplete="name" 
              typeInput={"text"}
              errorMessage={errors.tradingUsername}
              required />
          </div>
          <div className="w-full md:w-1/2">
            <TextInput
              id="handphoneNumber"
              label="No Handphone"
              icon="phone-icon.svg"
              altIcon="Icon Phone"
              value={form.handphoneNumber}
              onChangeForm={handleChangeForm} 
              placeholder="Gunakan Nomor Aktif" 
              inputMode="tel"
              autoComplete="tel"
              typeInput={"text"}
              errorMessage={errors.handphoneNumber}
              required />
          </div>
        </div>
      </div>
    </>
  )
}

export default CardValidation;
