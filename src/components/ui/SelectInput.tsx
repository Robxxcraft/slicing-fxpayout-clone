import { FaChevronDown } from "react-icons/fa6";

interface SelectInputProps {
  id: string;
  label: string;
  icon: string;
  altIcon: string;
  defaultValue: string;
  value: string;
  onChangeForm: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  optionData: string[];
}

const SelectInput = ({
  id,
  label,
  icon,
  altIcon,
  defaultValue,
  value,
  onChangeForm,
  optionData
}: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="text-base 2xl:text-xl font-medium text-[#344054]">
        {label}
      </label>
      <div className="relative w-full">
        <img src={icon} alt={altIcon} 
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          name={id}
          id={id}
          value={value}
          onChange={onChangeForm}
          className="_select-no-arrow px-[54px] py-4 2xl:py-6 w-full bg-white text-base 2xl:text-xl has-[option[value='']:checked]:text-[#747474] border border-[#D0D5DD] rounded-lg focus:outline-primary">
            <option value="" disabled>
              {defaultValue}
            </option>
          {optionData.map((data, idx) => (
            <option key={idx} value={data}>
              {data}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#667085]" />
      </div>
    </div>
  )
}

export default SelectInput;
