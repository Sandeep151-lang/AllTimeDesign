import React from "react"

const DeleteIcon = ({ onClick, className }) => {
  return (
    <svg
      width={16}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
    </svg>
  )
}

export default DeleteIcon
