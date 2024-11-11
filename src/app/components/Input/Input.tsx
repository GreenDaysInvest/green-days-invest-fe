import React from 'react';
import { Field, FieldProps } from 'formik';

interface InputProps {
  name: string; // Add the name prop to be passed to Field
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  disabled,
  onFocus,
  onBlur,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="mb-4">
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`rounded border border-main p-2 w-full text-secondary ${
              meta.touched && meta.error ? 'border-red-500' : ''
            }`} // Add error styling
          />
          {meta.touched && meta.error && (
            <div className="text-red-500 text-sm">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default Input;
