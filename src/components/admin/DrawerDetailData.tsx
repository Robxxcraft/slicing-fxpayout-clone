import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import TextInput from "../ui/TextInput";
import type { ValidationData } from "@/models/validationData";
import { useForm } from "@/hooks/useForm";
import { brokers } from "@/utils/dataBroker/brokers";
import { scrollToErrorInput } from "@/helper/formHelper";
import { updateValidationData } from "@/utils/api";
import { checkValidForm } from "@/helper/validationForm/editValData";
import SelectInput from "../ui/SelectInput";
import Button from "../ui/Button";

const DrawerDetailData = ({
  validationData,
  closeDrawer,
  setData
}: {
  validationData: ValidationData;
  closeDrawer: () => void;
  setData: Dispatch<SetStateAction<ValidationData[]>>
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const formDetail = useForm<ValidationData>({
    id: validationData.id,
    full_name: validationData.full_name,
    email: validationData.email,
    trading_account_name: validationData.trading_account_name,
    trading_account_number: validationData.trading_account_number,
    phone_number: validationData.phone_number,
    rebate: validationData.rebate,
    bank: validationData.bank,
    bank_account_name: validationData.bank_account_name,
    bank_account_number: validationData.bank_account_number,
    status: validationData.status,
    created_at: validationData.created_at,
    broker: validationData.broker
  });

  const allBrokers = Object.values(brokers).map((broker) => broker.name);

  useEffect(() => {
    formDetail.setValues(validationData);

    setIsEdited(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationData.id]);
  
  useEffect(() => {
    if (validationData.id !== formDetail.values.id) return;

    const stringFormDetail = JSON.stringify(formDetail.values);
    const stringValidationData = JSON.stringify(validationData);

    setIsEdited(stringFormDetail !== stringValidationData);
  }, [formDetail.values, validationData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !isEdited) return;
    setIsLoading(true);
    
    try {
      const { isValidate, errorInput } = formDetail.validate(checkValidForm);
      if (!isValidate && errorInput !== null) {
        scrollToErrorInput(errorInput);
        return;
      }

      const { error, message } = await updateValidationData({ item: formDetail.values });
      if (error) {
        toast.error(message);
      } else {
        setData((prev) => {
          const exits = prev.some((item) => item.id === formDetail.values.id);
          if (exits === undefined) return prev;

          return prev.map((item) => 
            item.id === formDetail.values.id ?
            { ...item, ...formDetail.values } : 
            item 
          );
        });
        toast.success(message);
        setIsEdited(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-100 fixed py-5 top-20 right-0 max-w-[460px] w-full h-[calc(100vh-80px)] border-t border-l border-[#D2CEE1] bg-white">
      <div className="px-5 pb-2 relative pr-5 flex items-center justify-between border-b border-[#D2CEE1]">
        <h2 className="text-xl font-medium">
          Detail Data
        </h2>
        <IoCloseOutline 
          onClick={closeDrawer}
          className="text-2xl cursor-pointer" />
      </div>
      <form onSubmit={handleSubmit} className="h-full">
        <div className="pt-2 pb-4 px-5 flex flex-col gap-4 w-full h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              Profil
            </h3>
            <div className="mt-2 flex flex-wrap gap-2.5">
              <div className="w-full">
                <TextInput 
                  id="full_name" 
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap" 
                  value={formDetail.values.full_name} 
                  onChangeForm={formDetail.handleChange} 
                  typeInput="text" 
                  autoComplete="name"
                  labelClassName="text-sm! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  errorMessage={formDetail.errors.full_name}
                  required
                />
              </div>
              <div className="w-full">
                <TextInput 
                  id="email" 
                  label="Email"
                  placeholder="Masukkan email aktif" 
                  value={formDetail.values.email} 
                  onChangeForm={formDetail.handleChange} 
                  typeInput="text"
                  inputMode="email"
                  autoComplete="email"
                  labelClassName="text-sm! text-black/60!"
                  inputClassName="py-2.5! px-2! w-full"
                  gap={8}
                  errorMessage={formDetail.errors.email} 
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              Akun Trading
            </h3>
            <div className="mt-2 flex flex-col gap-2.5">
              <SelectInput 
                id="broker"
                label="Broker"
                value={formDetail.values.broker}
                onChangeForm={formDetail.handleChange}
                defaultValue="&lt;Pilih&gt;" 
                optionData={allBrokers}
                labelClassName="text-sm! text-black/60!"
                selectClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.broker}
                required 
              />
              <TextInput 
                id="trading_account_name" 
                label="Username Akun Trading"
                placeholder="Masukan username akun trading" 
                value={formDetail.values.trading_account_name} 
                onChangeForm={formDetail.handleChange} 
                typeInput="text"
                inputMode="text"
                autoComplete="name"
                labelClassName="text-sm! text-black/60!"
                inputClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.trading_account_name} 
                required
              />
              <TextInput 
                id="trading_account_number" 
                label="Nomor Akun Trading"
                placeholder="Masukkan nomor akun trading" 
                value={formDetail.values.trading_account_number} 
                onChangeForm={formDetail.handleChange} 
                typeInput="text"
                inputMode="numeric"
                autoComplete="off"
                labelClassName="text-sm! text-black/60!"
                inputClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.trading_account_number} 
                required
              />
              <TextInput 
                id="phone_number" 
                label="Nomor Handphone"
                placeholder="Masukkan nomor handphone" 
                value={formDetail.values.phone_number} 
                onChangeForm={formDetail.handleChange} 
                typeInput="text"
                inputMode="tel"
                autoComplete="tel"
                labelClassName="text-sm! text-black/60!"
                inputClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.phone_number} 
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              Bank
            </h3>
            <div className="mt-2 flex flex-col gap-2.5">
              <SelectInput 
                id="rebate"
                label="Rebate Ke"
                value={formDetail.values.rebate}
                onChangeForm={formDetail.handleChange}
                defaultValue="&lt;Pilih&gt;" 
                optionData={["trading", "bank"]}
                labelOptions={["Akun Trading", "Bank"]}
                labelClassName="text-sm! text-black/60!"
                selectClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.rebate}
                required 
              />
              <TextInput 
                id="bank" 
                label="Nama Bank"
                placeholder="Masukkan nama bank" 
                value={formDetail.values.bank} 
                onChangeForm={formDetail.handleChange} 
                typeInput="text"
                inputMode="text"
                labelClassName="text-sm! text-black/60!"
                inputClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.bank} 
                required
              />
              <TextInput 
                id="bank_account_number" 
                label="Nomor Rekening"
                placeholder="Masukkan nomor rekening" 
                value={formDetail.values.bank_account_number} 
                onChangeForm={formDetail.handleChange} 
                typeInput="text"
                inputMode="numeric"
                autoComplete="off"
                labelClassName="text-sm! text-black/60!"
                inputClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.bank_account_number} 
                required
              />
              <TextInput 
                id="bank_account_name" 
                label="Username Akun Bank"
                placeholder="Masukkan nama pemegang rekening" 
                value={formDetail.values.bank_account_name} 
                onChangeForm={formDetail.handleChange} 
                typeInput="text"
                inputMode="text"
                autoComplete="cc-name"
                labelClassName="text-sm! text-black/60!"
                inputClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.bank_account_name} 
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              Status
            </h3>
            <div className="mt-2 flex flex-col gap-2.5">
              <SelectInput 
                id="status"
                label="Status"
                value={formDetail.values.status!}
                onChangeForm={formDetail.handleChange}
                defaultValue="&lt;Pilih&gt;"
                optionData={["pending", "approved", "rejected"]}
                labelOptions={["Pending", "Approved", "Rejected"]}
                labelClassName="text-sm! text-black/60!"
                selectClassName="py-2.5! px-2!"
                gap={8}
                errorMessage={formDetail.errors.status}
                required 
              />
            </div>
          </div>
        </div>
        <div className="absolute px-5 py-2 left-0 bottom-0 w-full bg-white border-t border-[#D2CEE1]">
          <Button 
            buttonType="submit"
            disabled={!isEdited || isLoading}
            loading={isLoading} 
            variant="primary-light" 
            className="py-3! w-full! rounded-lg!"
          > Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default DrawerDetailData;
