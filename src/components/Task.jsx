import React, { useState, useEffect } from "react"
import AddIcon from "../icons/addIcon"
import Added from "./Added"
import List from "./List"
import axios from "axios"

const Task = () => {
  const [description, setDescription] = useState()
  const [date, setDate] = useState(null)
  const [time, setTime] = useState()
  const [user, setUser] = useState([])
  const [id, setId] = useState()

  const [addOpen, setAddOpen] = useState(false)

  const headers = {
    Authorization:
      "Bearer " +
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg0OTc0MjMsIm5iZiI6MTY4ODQ5NzQyMywianRpIjoiZmQxM2FmNjktN2VlYS00YTg1LWFmMTQtOTEzYTYwZmJjNGQ5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.WTMcXVJgiJ6tpZ53vzv2Wusx6qNhADGqd8tHIdymfDQ",
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  const companyId = `company_0f8d040401d14916bc2430480d7aa0f8`

  const getUSer = async () => {
    try {
      const res = await axios.get(
        `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
        {
          headers: headers,
        }
      )

      const users = res?.data?.results?.data.map((user) => ({
        label: `${user?.first} ${user?.last}`,
        value: user?.user_id,
      }))
      setUser(users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUSer()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={addOpen ? "box" : "listBox"}>
      <div className="task-header">
        <p>
          TASKS<span>1</span>
        </p>
        <div className="add-section">
          <AddIcon
            onClick={() => {
              setAddOpen(true)
              setId()
              setDescription()
            }}
          />
        </div>
      </div>
      {addOpen ? (
        <Added
          setId={setId}
          id={id}
          setAddOpen={setAddOpen}
          setDescription={setDescription}
          description={description}
          setDate={setDate}
          date={date}
          setTime={setTime}
          time={time}
          setUser={setUser}
          user={user}
          addOpen={addOpen}
        />
      ) : (
        <List
          setId={setId}
          id={id}
          addOpen={addOpen}
          setAddOpen={setAddOpen}
          user={user}
          setDescription={setDescription}
          description={description}
          setDate={setDate}
          date={date}
          setTime={setTime}
          time={time}
          setUser={setUser}
        />
      )}
    </div>
  )
}

export default Task
