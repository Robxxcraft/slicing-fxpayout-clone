import { useState } from "react";

export function useForm<T>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => setValues(initialState);

  const validate = (schema: (vals: T) => Partial<Record<keyof T, string>>) => {
    const validationsErrors = schema(values);
    setErrors(validationsErrors);
    return Object.keys(validationsErrors).filter((error) => error !== "").length === 0;
  } 

  const setSpecificValue = (name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    validate,
    setSpecificValue,
    setValues
  };
};
