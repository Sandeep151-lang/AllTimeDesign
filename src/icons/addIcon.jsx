import React from "react"

const AddIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="add-icon"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
    </svg>
  )
}

export default AddIcon
