import React, { useEffect} from "react"
import Input from "../hooks/Input"
import Button from "../hooks/Button"
import axios from "axios"
import DeleteIcon from "../icons/DeleteIcon"
import Select from "react-select"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { headers, companyId } from "../hooks/common"
import UpdownIcon from "../icons/updown-arrow"
import { useForm } from "react-hook-form"

const Added = ({
  addOpen,
  remove,
  index,
  id,
  setId,
  setAddOpen,
  user,
  description,
}) => {
  const {  register, setValue, watch, handleSubmit } = useForm()

  const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2`

  const addTask = async (values) => {
    const {test} = values

    const times = test[index].time
    const a =  times.split(":")
    const seconds = +a[0] * 60 * 60 + +a[1] * 60

    const payload = {
      assigned_user: test[index]?.assign_user?.value ,
      task_date:dayjs(test[index]?.date).format('YYYY-MM-DD'),
      task_time: seconds,
      is_completed: 0,
      time_zone: 19800,
      task_msg: test[index]?.description,
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
        if(test.length===1){
          setAddOpen(false)
        }
        remove(index)
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
          remove(index)
          setAddOpen(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
if(addOpen && description){
  setValue(`test.${index}.description`,description?.task_msg)
  setValue(`test.${index}.assign_user`,{value:description?.assigned_user,label:description?.assigned_user})
  setValue(`test.${index}.date`,dayjs(description?.task_date_time_in_utc) )
  // setValue(`test.${index}.time`, description?.task_date_time_in_utc)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}
  },[addOpen,description])


  return (
    <>
      <div className="task-set">
       
        <Input
          rest={register(`test.${index}.description`)}
          className="task-description"
          value={watch(`test.${index}.description`)}
          label="Task Description"
          placeholder="Enter task description"
          onChange={(e) =>
            setValue(`test.${index}.description`, e.target.value)
          }
       
        />

        <div className="date-time">
          <div className="date-side">
            <label htmlFor="date" className="labelDate">
              Date
            </label>
            <div>
             
              <DatePicker
                {...register(`test.${index}.date`)}
                format="DD/MM/YY"
                value={watch(`test.${index}.date`)}
                onChange={(date) => {
              
                  setValue(`test.${index}.date`, date)
                }}
                className="date-picker"
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="labelDate">
              Time
            </label>
            <div className="dropdown">
              <input
                {...register(`test.${index}.time`)}
                type="time"
                id="time"
                className="time-piker"
                placeholder="Time"
                value={watch(`test.${index}.time`)}
                onChange={(e) => {
                
                  setValue(`test.${index}.time`, e.target.value)
                }}
                list="time-options"
              />
              <datalist id="time-options">
                {Array.from(Array(24 * 2)).map((_, index) => {
                  const hours = Math.floor(index / 2)
                    .toString()
                    .padStart(2, "0")
                  const minutes = index % 2 === 0 ? "00" : "30"
                  const formattedTime = new Date(
                    `2000-01-01T${hours}:${minutes}`
                  )

                  return (
                    <option
                      key={index}
                      value={formattedTime.toTimeString().slice(0, 5)}
                    />
                  )
                })}
              </datalist>
            </div>
          </div>
        </div>

        <label for="css" className="labels">
          Assign User
        </label>
        <div className="select-box">
          <UpdownIcon width="15" className="select-icon" />
          <Select
            {...register(`test.${index}.assign_user`)}
                value={watch(`test.${index}.assign_user`)}
            placeholder="User"
            onChange={(opt) => {
             
              setValue(`test.${index}.assign_user`, opt)
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
                backgroundColor: "rgba(247,250,252,1)",
              }),

              indicatorSeparator: () => {},
              dropdownIndicator: (defaultStyles) => ({
                ...defaultStyles,
                display: "none", // your changes to the arrow
              }),
            }}
          />
        </div>
      </div>
      <div className="btn-section">
        {id ? <DeleteIcon onClick={deleteTask} className="delete" /> : <div />}

        <div>
          <Button
            className="cancel-btn"
            text="Cancel"
            onClick={() =>{
              
              remove(index)}}
          />
          <Button
            className="save-btn"
            text="Save"
            onClick={handleSubmit(addTask)}
          />
        </div>
      </div>
    </>
  )
}

export default Added
