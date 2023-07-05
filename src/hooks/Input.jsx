import React from "react"

const Input = ({ label, placeholder, type = "text", onChange, ...other }) => {
  return (
    <p>
      <label for="css" className="label">
        {label}
      </label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...other}
      />
    </p>
  )
}

export default Input
