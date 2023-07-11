import React, { useEffect, useState } from "react"
import axios from "axios"
import EditIcon from "../icons/EditIcon"
import NotificationIcon from "../icons/notification"
import CheckIcon from "../icons/checkIcon"
import moment from "moment"

const List = ({
  setTaskCount,
  setDate,
  setDescription,
  setTime,
  setUser,
  setAddOpen,
  addOpen,
  user,
  setId,
}) => {
  const [list, setList] = useState([])
  const headers = {
    Authorization:
      "Bearer " +
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0OTc0MjMsIm5iZiI6MTY4ODQ5NzQyMywianRpIjoiZmQxM2FmNjktN2VlYS00YTg1LWFmMTQtOTEzYTYwZmJjNGQ5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.WTMcXVJgiJ6tpZ53vzv2Wusx6qNhADGqd8tHIdymfDQ",
    Accept: "application/json",
    "Content-Type": "application/json",
  }
  const getList = async () => {
    const res = await axios.get(
      `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=company_0f8d040401d14916bc2430480d7aa0f8`,
      { headers: headers }
    )
    if (res) {
      setList(res?.data?.results)
      setTaskCount(res?.data?.results?.length)
    }
  }

  useEffect(() => {
    getList()
    // eslint-disable-next-line
  }, [])

  const editList = (e) => {
    // setDate(e?.task_date)
    setDate(e?.task_date_time_in_utc)
    setDescription(e?.task_msg)
    setTime(e?.task_time)

    // setUser({value:e?.assigned_user, label:e?.assigned_user})
    setAddOpen(true)
    setId(e?.id)
  }

  return (
    <>
      {list?.map((item) => {
        return (
          <div className="added-list">
            <div className="image-task-list">
              <img src={item?.user_icon} alt="Avatar" />
              <div className="sub-list">
                <p className="task-msg">{item?.task_msg}</p>
                <p className="task-date">
                  {moment(item?.task_date).format("MM/DD/YYYY")}
                </p>
              </div>
            </div>
            <div className="edit">
              <EditIcon onClick={() => editList(item)} />
              <NotificationIcon />
              <CheckIcon />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default List
