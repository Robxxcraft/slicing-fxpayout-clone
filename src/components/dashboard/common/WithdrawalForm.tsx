import BankSelectWithdrawal from "@/components/ui/BankSelectWithdrawal";
import TextInput from "@/components/ui/TextInput";
import { formattingUsd } from "@/helper/formattingCurrency";
import type { BankUser } from "@/types/bank.type";
import type { FormWithdrawalRequest } from "@/types/withdrawal.type";

type WithdrawalFormProps = {
  form: FormWithdrawalRequest;
  methodsInput: BankUser[];
  selectedMethod: BankUser;
  setSelectedMethod: React.Dispatch<React.SetStateAction<BankUser>>;
  handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onSubmitWithdrawal: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  errors: Partial<Record<keyof FormWithdrawalRequest, string>>;
  errorSyncAmount: string;
  availableBalance: number;
  isLoading: boolean;
};

const WithdrawalForm = ({
  form,
  methodsInput,
  selectedMethod,
  setSelectedMethod,
  handleFormChange,
  onSubmitWithdrawal,
  errors,
  errorSyncAmount,
  availableBalance,
  isLoading
}: WithdrawalFormProps) => {
  const helperAmount = errorSyncAmount ? undefined : `Sisa saldo anda: ${formattingUsd(availableBalance)} USD`;
  const errorAmount = errorSyncAmount ? undefined : errors.amount;
  return (
    <form onSubmit={onSubmitWithdrawal} id="withdrawal-request" 
      className="flex flex-col gap-4 md:gap-5 w-full max-w-[540px] 2xl:max-w-[640px]">
      <BankSelectWithdrawal 
        objectsInput={methodsInput}
        selectedMethod={selectedMethod} 
        setSelectedMethod={setSelectedMethod} 
        isLoading={isLoading}
      />
      {selectedMethod.bank.toLowerCase() === "crypto" &&
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
          disabled={isLoading}
          required={selectedMethod.bank.toLowerCase() === "crypto"} 
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
          disabled={isLoading}
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
