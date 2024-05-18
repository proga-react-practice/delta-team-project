
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData} from './interfaces';

interface FormContextType {
  formData: FormData[];
  addFormData: (data: FormData) => void;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData[]>([]);

  const addFormData = (data: FormData) => {
    setFormData((prevData) => [...prevData, data]);
  };

  const resetFormData = () => {
    setFormData([]);
  };

  return (
    <FormContext.Provider value={{ formData, addFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
