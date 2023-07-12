import React, { useState, useEffect } from "react"
import AddIcon from "../icons/addIcon"
import Added from "./Added"
import List from "./List"
import axios from "axios"
import { headers, companyId } from "../hooks/common"

const Task = () => {
  const [description, setDescription] = useState()
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState()
  const [user, setUser] = useState([])
  const [id, setId] = useState()
  const [userDefault, setUserDefault] = useState()

  const [addOpen, setAddOpen] = useState(false)
  const [taskCount, setTaskCount] = useState()
  const [dateUpdate, setDateUpdate] = useState()
  const [update, setUpdate] = useState()

  const getUSer = async () => {
    try {
      const res = await axios.get(
        `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
        {
          headers: headers,
        }
      )

      const users = res?.data?.results?.data.map((user) => ({
        label: user?.name,
        value: user?.name,
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
    <div className={addOpen ? "box" : taskCount === 0 ? "no-list" : "listBox"}>
      <div className="task-header">
        <p>
          TASKS<span>{taskCount}</span>
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
          setUpdate={setUpdate}
          update={update}
          dateUpdate={dateUpdate}
          setDateUpdate={setDateUpdate}
          userDefault={userDefault}
          setUserDefault={setUserDefault}
          setId={setId}
          id={id}
          setAddOpen={setAddOpen}
          setDescription={setDescription}
          description={description}
          setDate={setDate}
          date={date}
          setTime={setTime}
          times={time}
          setUser={setUser}
          user={user}
          addOpen={addOpen}
        />
      ) : (
        <List
          setUpdate={setUpdate}
          setDateUpdate={setDateUpdate}
          setUserDefault={setUserDefault}
          setTaskCount={setTaskCount}
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
