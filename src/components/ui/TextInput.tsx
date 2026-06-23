import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface TextInputProps {
  id: string;
  label: string;
  icon?: string;
  altIcon?: string;
  placeholder: string;
  value: string;
  onChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeInput: "text" | "number" | "password";
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
  pattern?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute,
  inputClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxLength?: number;
  isMobileLabel?: boolean;
  gap?: number;
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
  labelClassName,
  helperTextClassName,
  disabled,
  required,
  maxLength,
  helperText,
  gap,
  isMobileLabel=true,
  errorMessage = ""
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isInputPassword = typeInput === "password";

  const styleInput =`
    ${errorMessage === "" ? "border-[#D0D5DD]" : "border-red-500"} 
    ${isInputPassword ? "pr-[54px]" 
      : icon !== undefined && altIcon !== undefined ? "pr-4" 
      : id === "amount" ? "pr-[64px]" : "pr-4" }
    ${icon !== undefined && altIcon !== undefined ? "pl-[54px]" 
      : id === "phoneNumber" ? "pl-[64px] 2xl:pl-[72px]" : "pl-4"}
    py-4 2xl:py-6 w-full bg-white text-base 2xl:text-xl placeholder:text-[#747474] border rounded-lg focus:outline-primary disabled:bg-[#F5F5F5] disabled:cursor-not-allowed 
    ${inputClassName}
  `;
  return (
    <div className="flex flex-col"
      style={{ gap: gap === undefined ? "12px" : `${gap}px` }}>
      {label !== "" && 
        <label
          htmlFor={id}
          className={`${labelClassName} text-base 2xl:text-xl font-medium text-[#344054]`}>
          {label}
          {!required &&
            <span className="ml-1 text-base text-black/50">(opsional)</span>
          }
        </label>
      }
      <div className="relative w-full">
        {id === "phoneNumber" && icon === undefined && 
          <p
            className="absolute pl-4 pr-2 top-1/2 -translate-y-1/2 pointer-events-none border-r text-base 2xl:text-xl"
          >+62</p>
        }
        {id === "amount" && icon === undefined && 
          <p
            className="absolute pr-4 pl-2 right-0 top-1/2 -translate-y-1/2 pointer-events-none border-l text-base 2xl:text-xl"
          >USD</p>
        }
        {icon !== undefined && altIcon !== undefined &&
          <img src={icon} alt={altIcon}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        }
        <input
          type={!isInputPassword ? typeInput : showPassword ? "text" : "password"}
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
          maxLength={maxLength}
        />
        {isInputPassword && 
          <div
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black/60 text-xl 2xl:text-2xl">{
            showPassword ? <FaEye /> : <FaEyeSlash />
          }</div>
        }
      </div>
      {errorMessage !== "" &&
        <span className="-mt-1 text-sm text-red-500">
          {errorMessage}
        </span>
      }
      {helperText !== undefined &&
        <span className={`${helperTextClassName} -mt-1 text-sm 2xl:text-base text-black/50`}>
          {helperText}
        </span>
      }
      {errorMessage === "" && helperText === undefined && placeholder !== undefined && isMobileLabel &&
        <span className="inline-block md:hidden text-sm 2xl:text-base text-black/50">
          {placeholder}
        </span>
      }
    </div>
  )
}

export default TextInput;
