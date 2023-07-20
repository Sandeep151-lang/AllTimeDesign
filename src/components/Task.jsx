import React, { useState, useEffect } from "react"
import AddIcon from "../icons/addIcon"
import Added from "./Added"
import List from "./List"
import axios from "axios"
import { headers, companyId } from "../hooks/common"
import { useForm, useFieldArray } from "react-hook-form"

const Task = () => {
  const [description, setDescription] = useState()
  const [user, setUser] = useState([])
  const [id, setId] = useState()

  const [addOpen, setAddOpen] = useState(false)
  const [taskCount, setTaskCount] = useState()

  const { control } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  })

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
    <div className="task-box">
      <div
        className={addOpen ? "box" : taskCount === 0 ? "no-list" : "listBox"}
      >
        <div className="task-header">
          <p>
            TASKS<span>{taskCount}</span>
          </p>
          <div className="add-section">
            <AddIcon
              onClick={(e, i) => {
                append({ test: "test" })

                setAddOpen(true)
                // setId()
                setDescription()
              }}
            />
          </div>
        </div>
        {addOpen ? (
          fields.map((data, i) => {
            return (
              <>
                <Added
                  remove={remove}
                  index={i}
                  setId={setId}
                  id={id}
                  setAddOpen={setAddOpen}
                  setDescription={setDescription}
                  description={description}
                  setUser={setUser}
                  user={user}
                  addOpen={addOpen}
                />
              </>
            )
          })
        ) : (
          <List
            append={append}
            setId={setId}
            setDescription={setDescription}
            setAddOpen={setAddOpen}
            setTaskCount={setTaskCount}
          />
        )}
      </div>
    </div>
  )
}

export default Task
