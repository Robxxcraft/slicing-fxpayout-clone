import { useEffect, useRef } from "react";

const CheckboxFilter = ({ 
  id, 
  label, 
  isChild = false, 
  checked, 
  indeterminate,
  onChange 
}: {
  id: string;
  label: string;
  isChild?: boolean;
  indeterminate?: boolean;
  checked: boolean;
  onChange: (event: unknown) => void;
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  return (
    <div className={`flex items-center w-full accent-primary ${isChild ? 'ml-4' : ''}`}>
      <input 
        ref={checkboxRef}
        type="checkbox" 
        name={id} 
        id={id} 
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
      />
      <label htmlFor={id} className="py-1.5 pl-2 w-full text-sm font-medium text-gray-700 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default CheckboxFilter;
