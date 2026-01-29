type TextInputType = "text" | "number";

interface TextInputProps {
  id: string;
  label: string;
  icon: string;
  altIcon: string;
  placeholder: string;
  value: string;
  onChangeForm: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  typeInput: TextInputType;
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
  pattern?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute,
  inputClassName?: string;
  disabled?: boolean;
}

const TextInput = ({
  id,
  label,
  icon,
  altIcon,
  placeholder,
  value,
  onChangeForm,
  typeInput,
  inputMode,
  pattern,
  autoComplete,
  inputClassName,
  disabled
}: TextInputProps) => {
  const styleInput =`pl-[54px] pr-4 py-4 2xl:py-6 w-full bg-white text-base 2xl:text-xl placeholder:text-[#747474] border border-[#D0D5DD] rounded-lg focus:outline-primary disabled:bg-black/5 disabled:cursor-not-allowed ${inputClassName}`;
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
        <input
          type={typeInput}
          name={id}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChangeForm}
          inputMode={inputMode}
          pattern={pattern}
          autoComplete={autoComplete}
          className={styleInput}
          disabled={disabled}
        />
      </div>
      {placeholder !== undefined &&
        <span className="inline-block md:hidden text-sm text-black/50">
          {placeholder}
        </span>
      }
    </div>
  )
}

export default TextInput;
