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
    const errorField = Object.keys(validationsErrors);
    return {
      isValidate: errorField.length === 0,
      errorInput: errorField[0]
    };
  } 

  const setSpecificValue = (name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const setSpecificError = (name: keyof T, value: unknown) => {
    setErrors((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    validate,
    setSpecificValue,
    setSpecificError,
    setValues
  };
};
