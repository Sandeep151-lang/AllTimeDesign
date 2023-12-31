import React, { useEffect, useState } from "react"
import axios from "axios"
import EditIcon from "../icons/EditIcon"
import NotificationIcon from "../icons/notification"
import CheckIcon from "../icons/checkIcon"
import moment from "moment"
import { headers, companyId } from "../hooks/common"

const List = ({ setTaskCount, append, setAddOpen, setDescription, setId }) => {
  const [list, setList] = useState([])

  const getList = async () => {
    const res = await axios.get(
      `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
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
    append({ test: "test" })
    setDescription(e)
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
              <EditIcon className="edit-icons" onClick={() => editList(item)} />
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
