import React, { useState } from "react"
import Input from "../hooks/Input"
import Button from "../hooks/Button"
import axios from "axios"
import DeleteIcon from "../icons/DeleteIcon"
import Select from "react-select"
import { DatePicker, TimePicker } from "antd"
import dayjs from "dayjs"
import { headers, companyId } from "../hooks/common"

const Added = ({
  setUpdate,
  update,
  dateUpdate,
  setDateUpdate,
  userDefault,
  id,
  setId,
  setAddOpen,
  setDate,
  setDescription,
  setTime,
  user,
  date,
  description,
  times,
  setUserDefault,
}) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2`

  const addTask = async () => {
    const a = !dateUpdate
      ? times.split(":")
      : dayjs(dateUpdate).format("hh:mm").split(":") // split it at the colons
    const seconds = +a[0] * 60 * 60 + +a[1] * 60

    const payload = {
      assigned_user: selectedOption?.value || userDefault?.value,
      task_date:
        dayjs(date).format("YYYY-MM-DD") || dayjs(update).format("YYYY-MM-DD"),
      task_time: seconds,
      is_completed: 0,
      time_zone: 19800,
      task_msg: description,
    }

    try {
      const res = await axios[id ? "put" : "post"](
        id
          ? `${url}/${id}?company_id=${companyId}`
          : `${url}?company_id=${companyId}`,
        payload,
        { headers: headers }
      )

      if (res.data.code === 201 || res.data.code === 202) {
        setAddOpen(false)
        setDate()
        setTime()
        setDescription()
        setUpdate()
        setDateUpdate()
        setUserDefault()
        setSelectedOption()
        setId()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async () => {
    try {
      const deleteTask = window.confirm("Do you want to delete the task")
      if (deleteTask) {
        const res = await axios.delete(`${url}/${id}?company_id=${companyId}`, {
          headers: headers,
        })
        if (res.data.code === 204) {
          setAddOpen(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="task-set">
        <Input
          className="task-description"
          value={description}
          label="Task Description"
          placeholder="Enter task description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="date-time">
          <div className="date-side">
            <label htmlFor="date" className="labelDate">
              Date
            </label>
            <div>
              <DatePicker
                format="DD/MM/YY"
                defaultValue={dayjs(update)}
                placeholder="Select Date"
                onChange={(date) => {
                  setDate(date)
                  setUpdate()
                }}
                style={{ width: "168px", height: "34px", marginTop: "6px" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="labelDate">
              Time
            </label>

            <div>
              <TimePicker
                defaultValue={dayjs(dateUpdate)}
                placeholder="Select Time"
                className="ant-picker"
                format="HH:MM"
                onChange={(time, timeString) => {
                  setTime(timeString)
                  setDateUpdate()
                }}
                style={{ width: "168px", height: "34px", marginTop: "6px" }}
              />
            </div>
          </div>
        </div>

        <label for="css" className="labels">
          Assign User
        </label>

        <Select
          value={userDefault}
          isClearable
          placeholder="User"
          onChange={(opt) => {
            setUserDefault()
            setSelectedOption(opt)
          }}
          options={user}
          styles={{
            control: (base) => ({
              ...base,
              height: 31,
              width: 345,
              minHeight: 31,
              marginLeft: "5px",
              marginTop: 10,
              borderRadius: 3,
              border: "1px solid #e5e5e5",
              backgroundColor: "rgba(255,255,255,1)",
            }),
            placeholder: (defaultStyles) => ({
              ...defaultStyles,
              fontSize: "14px",
              textAlign: "left",
              lineHeight: "16px",
              width: "59px",
              height: "26px",
            }),
            option: (base) => ({
              ...base,
              height: "26px",
              overflow: "hidden",
              fontFamily: "Segoe UI",
              fontSize: "14px",
              textAlign: "left",
              lineHeight: "16px",
              color: "#262E39",
              margin: "5px 0",
            }),

            indicatorSeparator: () => {},
            dropdownIndicator: (defaultStyles) => ({
              ...defaultStyles,
              display: "none", // your changes to the arrow
            }),
          }}
        />
      </div>
      <div className="btn-section">
        {id ? <DeleteIcon onClick={deleteTask} className="delete" /> : <div />}

        <div>
          <Button
            className="cancel-btn"
            text="Cancel"
            onClick={() => setAddOpen(false)}
          />
          <Button className="save-btn" text="Save" onClick={addTask} />
        </div>
      </div>
    </>
  )
}

export default Added
