import React, { useState } from "react"
import Input from "../hooks/Input"
import Button from "../hooks/Button"
import axios from "axios"
import DeleteIcon from "../icons/DeleteIcon"
import moment from "moment"
import Select from "react-select"
// import DatePicker from "react-datepicker";
import { DatePicker, TimePicker } from "antd"

const Added = ({
  id,
  setId,
  addOpen,
  setAddOpen,
  setDate,
  setDescription,
  setTime,
  setUser,
  user,
  date,
  description,
  taksCount,
  time,
}) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const headers = {
    Authorization:
      "Bearer " +
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0OTc0MjMsIm5iZiI6MTY4ODQ5NzQyMywianRpIjoiZmQxM2FmNjktN2VlYS00YTg1LWFmMTQtOTEzYTYwZmJjNGQ5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.WTMcXVJgiJ6tpZ53vzv2Wusx6qNhADGqd8tHIdymfDQ",
    "Content-Type": "application/json",
  }

  const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2`
  const companyId = `company_0f8d040401d14916bc2430480d7aa0f8`

  const addTask = async () => {
    //  const a = moment(time).format('hh:mm')
    const a = moment(time).format("hh:mm").split(":") // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    const seconds = +a[0] * 60 * 60 + +a[1] * 60

    const payload = {
      assigned_user: selectedOption?.value,
      task_date: moment(date).format("YYYY-MM-DD"),
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
              {console.log(moment(date).format("DD/MM/YY"), "date")}
              <DatePicker
                format="DD/MM/YY"
                // value={date==="Invalid date" ? "" : moment(date)}
                // value={moment(date)}
                selected={moment(date).format("DD/MM/YY")}
                placeholder="Select Date"
                onChange={(date) => setDate(date)}
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
                placeholder="Select Time"
                className="ant-picker"
                format="HH:MM"
                onChange={(time) => setTime(time)}
                style={{ width: "168px", height: "34px", marginTop: "6px" }}
              />
            </div>
          </div>
        </div>

        <label for="css" className="labels">
          Assign User
        </label>
        <Select
          isClearable
          placeholder="User"
          onChange={(opt) => setSelectedOption(opt)}
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
