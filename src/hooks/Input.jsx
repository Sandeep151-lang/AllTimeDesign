import React from "react"

const Input = ({
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  other,
}) => {
  return (
    <>
      <label for="css" className="labels">
        {label}
      </label>
      <br />
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...other}
      />
    </>
  )
}

export default Input
