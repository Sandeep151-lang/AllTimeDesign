import React from "react"

const Button = ({ text, onClick, className }) => {
  return (
    <button type="btn" className={`button  ${className}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
