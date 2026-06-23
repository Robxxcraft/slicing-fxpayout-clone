import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import SelectInput from '@/components/ui/SelectInput';
import TextInput from '@/components/ui/TextInput';
import type { FormBank } from '@/types/validationForm.type';
import { useTranslation } from 'react-i18next';

const CardBankForm = ({ form, handleChangeForm, selectedBroker, errors, handleTempBankChange }: 
  {
    form: FormBank; 
    handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    selectedBroker: string;
    errors: Partial<Record<keyof FormBank, string>>;
    handleTempBankChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  }) => {
  const { t } = useTranslation(["common", "validationpage"]);
  const SUPPORT_BANK = ["BCA", "BRI", "Mandiri", "BNI", "BSI", t("validationpage:card.bankForm.otherBank")];

  return (
    <>
      <div className="pb-4 md:pb-6 px-4 md:px-6 2xl:px-8 flex items-center gap-6 border-b border-[#D0D0D0]">
        <BoundedIcon variant="third" icon="/bank-icon.svg" alt="icon" maskColor="bg-primary"/>
        <h3 className="text-xl md:text-2xl text-my-purple font-medium leading-[115%]">
          {t("validationpage:card.bankForm.title")}
        </h3>
      </div>
      <div className="px-4 md:px-6 2xl:px-8 mt-4 md:mt-6 flex flex-col gap-4">
        <SelectInput 
          id="rebate" 
          label={t("validationpage:card.bankForm.rebateLabel")} 
          icon="/bank-icon.svg" 
          altIcon="Icon rebate" 
          mobileHelperText={selectedBroker.trim() === "" ? 
            `<${t("validationpage:card.bankForm.rebatePlaceholder")}>` : `<${t("text.select")}>`}
          showMobileHelperText={selectedBroker.trim() === ""}
          defaultValue={selectedBroker.trim() === "" ? 
            `<${t("validationpage:card.bankForm.rebatePlaceholder")}>` : `<${t("text.select")}>`}
          value={form.rebate} 
          onChangeForm={handleChangeForm} 
          disabled={selectedBroker.trim() === ""}
          optionData={["Akun Trading", "Bank"]}
          errorMessage={errors.rebate && t(errors.rebate)}
          required />
        <SelectInput 
          id="tempBank" 
          label={t("validationpage:card.bankForm.bankLabel")} 
          icon="/bank-icon.svg" 
          altIcon="Icon bank" 
          defaultValue={`<${t("text.select")}>`} 
          value={form.tempBank} 
          onChangeForm={handleTempBankChange} 
          optionData={SUPPORT_BANK}
          errorMessage={errors.tempBank && t(errors.tempBank)}
          required />
        {form.tempBank === t("validationpage:card.bankForm.otherBank") &&
          <TextInput
            id="bank"
            label={t("validationpage:card.bankForm.otherBankLabel")} 
            icon="/bank-icon.svg"
            altIcon="Icon bank"
            value={form.bank}
            onChangeForm={handleChangeForm} 
            placeholder={t("validationpage:card.bankForm.otherBankPlaceholder")} 
            typeInput={"text"}
            errorMessage={errors.bank && t(errors.bank)}
            helperText={t("validationpage:card.bankForm.otherBankHelper")} 
            required />
        }
        <TextInput
          id="rekeningNumber"
          label={t("validationpage:card.bankForm.rekeningNumberLabel")} 
          icon="/wallet-icon.svg"
          altIcon="Icon card"
          value={form.rekeningNumber}
          onChangeForm={handleChangeForm} 
          placeholder={t("validationpage:card.bankForm.rekeningNumberPlaceholder")} 
          inputMode="numeric"
          autoComplete="off"
          typeInput={"text"}
          errorMessage={errors.rekeningNumber && t(errors.rekeningNumber)}
          required />
        <TextInput
          id="holdingUsername"
          label={t("validationpage:card.bankForm.holdingUsernameLabel")} 
          icon="/user-icon.svg"
          altIcon="Icon user"
          value={form.holdingUsername}
          onChangeForm={handleChangeForm} 
          placeholder={t("validationpage:card.bankForm.holdingUsernamePlaceholder")} 
          autoComplete="cc-name" 
          typeInput={"text"}
          errorMessage={errors.holdingUsername && t(errors.holdingUsername)}
          required />
      </div>
    </>
  )
}

export default CardBankForm;
