import React, { useState } from "react"
import Input from "../hooks/Input"
import Button from "../hooks/Button"
import axios from "axios"
import DeleteIcon from "../icons/DeleteIcon"
import Select from "react-select"


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
    const payload = {
      assigned_user: selectedOption?.value,
      task_date: date,
      task_time: 0,
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
    const deleteTask=  window.confirm('Do you want to delete the task')
      if(deleteTask){
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
          value={description}
          label="Task Description"
          placeholder="Enter task description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="date-time">
          <Input
            value={date}
            className="time"
            label="Date"
            type="date"
            placeholder="Date"
            onChange={(e) => setDate(e?.target?.value)}
          />

          <Input
            value={time}
            className="time"
            label="Time"
            type="time"
            onChange={(e) => setTime(e?.target?.value)}
          />
        </div>
        <Select
          className="select-box"
        //   defaultValue={selectedOption}
        
          onChange={(opt) => setSelectedOption(opt)}
          options={user}
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
