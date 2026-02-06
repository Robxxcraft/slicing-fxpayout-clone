import { FaChevronDown } from "react-icons/fa6";

interface SelectInputProps {
  id: string;
  label: string;
  icon: string;
  altIcon: string;
  defaultValue: string;
  value: string;
  onChangeForm: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionData: string[];
  mobileHelperText?: string;
  showMobileHelperText?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
}

const SelectInput = ({
  id,
  label,
  icon,
  altIcon,
  defaultValue,
  value,
  onChangeForm,
  optionData,
  disabled,
  mobileHelperText,
  required,
  showMobileHelperText = false,
  errorMessage = "",
}: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="flex text-base 2xl:text-xl font-medium text-[#344054]">
        {label}
        {!required &&
          <span className="ml-1 text-base text-black/50">(opsional)</span>
        }
      </label>
      <div className="relative w-full">
        <img src={icon} alt={altIcon} 
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          name={id}
          id={id}
          value={value}
          onChange={onChangeForm}
          disabled={disabled}
          className={`
            ${errorMessage === "" ? "border-[#D0D5DD]" : "border-red-500"}
            _select-no-arrow px-[54px] py-4 2xl:py-6 w-full bg-white text-base 2xl:text-xl has-[option[value='']:checked]:text-[#747474] border rounded-lg focus:outline-primary disabled:bg-black/5 disabled:cursor-not-allowed
          `}>
            <option value="" disabled>
              {defaultValue}
            </option>
          {optionData.map((data, idx) => (
            <option key={idx} value={data} className="text-black">
              {data}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#667085]" />
      </div>
      {errorMessage !== "" &&
        <span className="-mt-1 text-sm text-red-500">
          {errorMessage}
        </span>
      }
      {errorMessage === "" && showMobileHelperText &&
        <span className="inline-bloc md:hidden text-sm 2xl:text-base text-black/50">
          {mobileHelperText}
        </span>
      }
    </div>
  )
}

export default SelectInput;
