import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
function Home() {
  const [table, setTable] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [modal,setModal]=useState([])
  const [sortedTable,setSortedTable]=useState([])
  const finishOrder = (id) => {
    let tempObject = table.filter((a) => a.id == id)[0]
    tempObject = { ...tempObject, finished_time: Date.now(),status:"done" }
    const filteredData = table.filter((a) => a.id != id)
    setTable([...filteredData, { ...tempObject }])
    localStorage.setItem("orders", JSON.stringify([...filteredData, { ...tempObject }]))

  }
  const processModal = (id) => {
    setModalShow(true)
    let tempObj = table.filter((a) => a.id == id)
    setModal([...tempObj])
  }
  useEffect(() => {
    setTable(JSON.parse(localStorage.getItem("orders")))
  }, [])
  useEffect(()=>{
   setSortedTable(table.sort((a,b)=>b.status.localeCompare(a.status)))
  },[table])
  return (
    <>

      <table>
        <thead>
          <tr>
            <td>table name</td>
            <td>waiter name</td>
            <td>status</td>
            <td>price</td>
            <td>finished time</td>
            <td>Actions</td>
          </tr>
        </thead>
        {table?(
          table.map((a) => 
          <tbody key={a.id}>
            <tr>
              <td>{a.table.name}</td>
              <td>{a.waiter.name}</td>
              <td>{a.status}</td>
              <td>{a.total_amount} AZN</td>
              <td>{a.finished_time ? new Date(a.finished_time).toLocaleTimeString() : "----"} </td>
              <td className='buttons'>
                {!a.finished_time && <button className='end-order' onClick={() => finishOrder(a.id)}>End Order</button>}

                <button className='details' onClick={() => processModal(a.id)}>Details</button>
              </td>
            </tr>
          </tbody>)
        ):(
         <h1>Table is empty...</h1>
        )}

      </table>
      {modal.map((a) => (
        modalShow && <Modal key={a.id} item={a} modal={modal} setModalShow={setModalShow} />
      ))}


    </>
  )
}

export default Home