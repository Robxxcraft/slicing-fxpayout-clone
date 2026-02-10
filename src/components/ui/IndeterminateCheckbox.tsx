import { useEffect, useRef } from "react";

type IndeterminateCheckboxProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    indeterminate?: boolean;
  };

const IndeterminateCheckbox = ({
  indeterminate,
  ...props
}: IndeterminateCheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      className="block size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary"
      {...props}
    />
  );
};

export default IndeterminateCheckbox;
