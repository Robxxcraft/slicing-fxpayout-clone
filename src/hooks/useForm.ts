import { useState } from "react";

export function useForm<T>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => setValues(initialState);

  const setSpecificValue = (name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    handleChange,
    resetForm,
    setSpecificValue,
    setValues
  };
}