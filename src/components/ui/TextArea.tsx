interface TextAreaProps {
  id: string;
  label: string;
  icon?: string;
  altIcon?: string;
  placeholder: string;
  value: string;
  onChangeForm: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxLength?: number;
  isMobileLabel?: boolean;
  gap?: number;
}

const TextArea = ({
  id,
  label,
  icon,
  altIcon,
  placeholder,
  value,
  onChangeForm,
  inputClassName,
  labelClassName,
  required,
  maxLength,
  helperText,
  gap,
  isMobileLabel=true,
  errorMessage = ""
}: TextAreaProps) => {
  const styleInput =`
    ${errorMessage === "" ? "border-[#D0D5DD]" : "border-red-500"} 
    ${icon !== undefined && altIcon !== undefined ? "pl-[54px]" : "pl-4"}
    py-4 3xl:py-6 w-full bg-white text-base 3xl:text-xl placeholder:text-[#747474] border rounded-lg focus:outline-primary disabled:bg-[#F5F5F5] disabled:cursor-not-allowed resize-none
    ${inputClassName}
  `;
  return (
    <div className="flex flex-col"
      style={{ gap: gap === undefined ? "12px" : `${gap}px` }}>
      <label
        htmlFor={id}
        className={`${labelClassName} text-base 3xl:text-xl font-medium text-[#344054]`}>
        {label}
        {!required &&
          <span className="ml-1 text-base text-black/50">(opsional)</span>
        }
      </label>
      <div className="relative w-full">
        {icon !== undefined && altIcon !== undefined &&
          <img src={icon} alt={altIcon}
            className="absolute left-4 top-7 pointer-events-none" />
        }
        <textarea
          name={id}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChangeForm}
          className={styleInput}
          rows={3}
          maxLength={maxLength}
        />
      </div>
      {errorMessage !== "" &&
        <span className="-mt-1 text-sm text-red-500">
          {errorMessage}
        </span>
      }
      {helperText !== undefined &&
        <span className="-mt-1 text-sm 3xl:text-base text-black/50">
          {helperText}
        </span>
      }
      {errorMessage === "" && helperText === undefined && placeholder !== undefined && isMobileLabel &&
        <span className="inline-block md:hidden text-sm 3xl:text-base text-black/50">
          {placeholder}
        </span>
      }
    </div>
  )
}

export default TextArea;
