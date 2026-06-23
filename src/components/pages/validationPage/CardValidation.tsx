import SelectInput from '@/components/ui/SelectInput';
import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import TextInput from '@/components/ui/TextInput';
import { brokers } from '@/utils/dataBroker/brokers';
import type { FormValidation } from '@/types/validationForm.type';
import { useTranslation } from 'react-i18next';

const CardValidation = ({ form, handleChangeForm, errors }: 
  {
    form: FormValidation; 
    errors: Partial<Record<keyof FormValidation, string>>;
    handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  }) => {
  const { t } = useTranslation(["common", "validationpage"]);
  const allBrokers = Object.values(brokers).map((broker) => broker.name);
  return (
    <>
      <div className="pb-4 md:pb-6 px-4 md:px-6 2xl:px-8 flex items-center gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/check.svg" alt="icon"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          {t("validationpage:card.validationForm.title")}
        </h3>
      </div>
      <div className="px-4 md:px-6 2xl:px-8 mt-4 md:mt-6 flex flex-col gap-4">
        <SelectInput 
          id="broker" 
          label={t("validationpage:card.validationForm.brokerLabel")}
          icon="/bank-icon.svg" 
          altIcon="Icon broker" 
          defaultValue={`<${t("text.select")}>`} 
          value={form.broker} 
          onChangeForm={handleChangeForm} 
          optionData={allBrokers}
          errorMessage={errors.broker && t(errors.broker)}
          required />
        <TextInput
          id="identityUsername"
          label={t("validationpage:card.validationForm.usernameLabel")}
          icon="/user-icon.svg"
          altIcon="Icon user"
          value={form.identityUsername}
          onChangeForm={handleChangeForm} 
          placeholder={t("validationpage:card.validationForm.usernamePlaceholder")}
          autoComplete="name" 
          typeInput={"text"}
          errorMessage={errors.identityUsername && t(errors.identityUsername)}
          required />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <TextInput
              id="email"
              label={t("validationpage:card.validationForm.emailLabel")}
              icon="/email-icon.svg"
              altIcon="Icon Email"
              value={form.email}
              onChangeForm={handleChangeForm} 
              placeholder={t("validationpage:card.validationForm.emailPlaceholder")}
              inputMode="email"
              autoComplete="email" 
              typeInput={"text"}
              errorMessage={errors.email && t(errors.email)}
              required />
          </div>
          <div className="w-full md:w-1/2">
            <TextInput
              id="accountNumber"
              label={t("validationpage:card.validationForm.accountNumberLabel")}
              icon="/number-account-icon.svg"
              altIcon="Icon Account Number"
              value={form.accountNumber}
              onChangeForm={handleChangeForm} 
              placeholder={t("validationpage:card.validationForm.accountNumberPlaceholder")}
              autoComplete="off"
              inputMode="numeric"
              typeInput={"text"}
              errorMessage={errors.accountNumber && t(errors.accountNumber)}
              required />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <SelectInput 
              id="platform" 
              label={t("validationpage:card.validationForm.platformLabel")}
              icon="/bank-icon.svg" 
              altIcon="Icon platform" 
              defaultValue={`<${t("text.select")}>`}  
              value={form.platform} 
              onChangeForm={handleChangeForm} 
              optionData={["MT4", "MT5"]}
              errorMessage={errors.platform && t(errors.platform)}
              required />
          </div>
          <div className="w-full md:w-1/2">
            <TextInput
              id="handphoneNumber"
              label={t("validationpage:card.validationForm.handphoneNumberLabel")}
              icon="/phone-icon.svg"
              altIcon="Icon Phone"
              value={form.handphoneNumber}
              onChangeForm={handleChangeForm} 
              placeholder={t("validationpage:card.validationForm.handphoneNumberPlaceholder")}
              inputMode="tel"
              autoComplete="tel"
              typeInput={"text"}
              errorMessage={errors.handphoneNumber && t(errors.handphoneNumber)}
              required />
          </div>
        </div>
      </div>
    </>
  )
}

export default CardValidation;
