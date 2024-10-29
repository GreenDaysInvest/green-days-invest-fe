import React from 'react';
import { FieldProps } from 'formik';

interface InputProps extends FieldProps {
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ field, form, type = 'text', placeholder }) => {
  return (
    <input
      {...field}
      type={type}
      placeholder={placeholder}
      className="rounded border border-main p-2 w-full text-secondary"
    />
  );
};

export default Input;
