import React, { ChangeEvent } from 'react';

interface InputProps {
  extraClasses?: string,
  placeholder: string,
  onChange: (value: string) => void,
  value?: string,
  disabled?: boolean
}

const Input = (props: InputProps) => {
  const {
    extraClasses,
    placeholder,
    value,
    onChange,
    disabled
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return onChange(e.target.value);
  };

  return (
    <input
      className={`${extraClasses} h-10 p-2 w-40 md:w-60 lg:w-72 rounded-lg truncate focus:outline-none text-sm shadow-xl`}
      placeholder={placeholder}
      value={value}
      disabled={disabled || false}
      onChange={handleChange}
    />
  );
}

export default Input;
