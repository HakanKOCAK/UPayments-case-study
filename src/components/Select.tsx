import React, { ChangeEvent } from 'react'

interface SelectProps {
  extraClasses?: string,
  placeholder: string,
  onChange: (value: string) => void,
  value?: string,
  disabled?: boolean,
  options?: Array<any>,
  error?: boolean
}


const Select = (props: SelectProps) => {
  const {
    extraClasses,
    placeholder,
    value,
    onChange,
    disabled,
    error,
    options
  } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    return onChange(e.target.value);
  }
  return (
    <select
      disabled={disabled || false}
      className={`${extraClasses} h-10 p-2 w-32 md:w-52 lg:w-64 rounded-lg focus:outline-none text-sm shadow-xl ${value ? 'text-black' : 'text-gray-400'} ${error ? 'border-2 border-red-500' : ''}`}
      onChange={handleChange}
      value={value}
    >
      <option className="text-black" value="" hidden={!value ? true : false}>{!value ? placeholder : "Remove selected"}</option>
      {(options || []).map((opt) => (
        <option className="text-black" key={opt.id} value={opt.name}>{opt.name}</option>
      ))}
    </select>
  )
}

export default Select