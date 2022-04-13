import React, { ChangeEvent } from 'react'

interface SelectProps {
  extraClasses?: string,
  placeholder: string,
  onChange: (value: string) => void,
  value?: string
}


const Select = (props: SelectProps) => {
  const {
    extraClasses,
    placeholder,
    value,
    onChange
  } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    return onChange(e.target.value);
  }
  return (
    <select
      className={`h-10 p-2 w-32 md:w-52 lg:w-64 rounded focus:outline-none text-sm shadow-xl ${extraClasses}`}
      onChange={handleChange}
      value={value}
    >
      <option value="" hidden={!value ? true : false}>{!value ? placeholder : "Remove selected"}</option>
      <option value="Category1">Category 1</option>
      <option value="Category2">Category 2</option>
      <option value="Category3">Category 3</option>
    </select>
  )
}

export default Select