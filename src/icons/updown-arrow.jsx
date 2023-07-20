import React from "react"

const UpdownIcon = ({ className, width }) => {
  return (
    <svg
      width={width}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M18 9 12 3 6 9H18ZM18 15 12 21 6 15H18Z"></path>
    </svg>
  )
}

export default UpdownIcon
