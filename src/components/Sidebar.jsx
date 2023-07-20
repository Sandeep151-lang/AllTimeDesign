import React from "react"
import Task from "./Task"

const Sidebar = () => {
  return (
    <div className="layout">
      <div className="sidebar">sidebar</div>
      <div>
        <div className="navbar"></div>
        <div className="text-part">
          <p className="head-text">Test</p>
          <a href="Sloovi.com">Sloovi.com</a>
          <p className="text-description">Add description,</p>
          <Task />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
