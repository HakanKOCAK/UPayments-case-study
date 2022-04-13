import React, { ChangeEvent } from 'react';

interface InputProps {
  extraClasses?: string,
  placeholder: string,
  onChange: (value: string) => void,
  value?: string
}

const Input = (props: InputProps) => {
  const {
    extraClasses,
    placeholder,
    value,
    onChange
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return onChange(e.target.value);
  };

  return (
    <input
      className={`h-10 p-2 w-40 md:w-60 lg:w-72 rounded-lg truncate focus:outline-none text-sm shadow-xl ${extraClasses}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default Input;
