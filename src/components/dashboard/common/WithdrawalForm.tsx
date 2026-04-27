import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { formattingUsd } from "@/helper/formattingCurrency";
import type { FormWithdrawalRequest } from "@/pages/dashboard/common/WithdrawalRequestPage";

const WithdrawalForm = ({
  form,
  handleFormChange,
  onSubmitWithdrawal,
  errors,
  errorSyncAmount,
  availableBalance
}: {
  form: FormWithdrawalRequest;
  handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onSubmitWithdrawal: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  errors: Partial<Record<keyof FormWithdrawalRequest, string>>;
  errorSyncAmount: string;
  availableBalance: number;
}) => {
  const helperAmount = errorSyncAmount ? undefined : `Sisa saldo anda: ${formattingUsd(availableBalance)} USD`;
  const errorAmount = errorSyncAmount ? undefined : errors.amount;
  return (
    <form onSubmit={onSubmitWithdrawal} id="withdrawal-request" 
      className="flex flex-col gap-4 md:gap-5 w-full max-w-[540px] 2xl:max-w-[640px]">
      <SelectInput 
        id="method" 
        icon="/bank-icon.svg"
        altIcon="Icon method"
        label={"Metode Penarikan"}
        defaultValue={`<Pilih Metode>`} 
        value={form.method} 
        onChangeForm={handleFormChange} 
        optionData={["bank", "crypto"]}
        labelOptions={["Internet Banking", "Crypto"]}
        errorMessage={errors.method}
        required />
      {form.method === "crypto" &&
        <TextInput
          id="walletAddress"
          label={"Alamat Wallet"}
          value={form.walletAddress}
          onChangeForm={handleFormChange} 
          placeholder={"Masukkan alamat wallet"}
          autoComplete="off"
          inputMode="text"
          typeInput={"text"}
          errorMessage={errors.walletAddress}
          isMobileLabel={false}
          required={form.method === "crypto"} 
        />
      }
      <div>
        <TextInput
          id="amount"
          label={"Jumlah Penarikan (USD)"}
          value={form.amount}
          onChangeForm={handleFormChange} 
          placeholder={"Masukkan jumlah penarikan"}
          autoComplete="off"
          inputMode="numeric"
          typeInput={"text"}
          helperText={helperAmount}
          helperTextClassName="text-sm! 2xl:text-lg!"
          errorMessage={errorAmount}
          required />
        {errorSyncAmount &&
          <p className="mt-1 text-sm 2xl:text-lg text-red-500">
            {errorSyncAmount}
          </p>
        }
      </div>
    </form>
  )
}

export default WithdrawalForm;
