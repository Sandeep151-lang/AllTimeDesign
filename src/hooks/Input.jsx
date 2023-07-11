import React from "react"

const Input = ({ label, placeholder, type = "text", onChange, ...other }) => {
  return (
    <>
      <label for="css" className="labels">
        {label}
      </label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...other}
      />
    </>
  )
}

export default Input
