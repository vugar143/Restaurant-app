import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function AddOrders({ table, setTable }) {
  const nav = useNavigate()
  const [waiters, setWaiters] = useState([])
  const [tables, setTables] = useState([])
  const [total, setTotal] = useState(0)
  const [waiterName, setWaiterName] = useState({})
  const [tableName, setTableName] = useState({})
  const [newOrder, setNewOrder] = useState({})
  const [choosenMeals, setChoosenMeals] = useState([]);
  const [mealForm, setMealForm] = useState({});
  const [loading, setLoading] = useState(false)
  const handleMealInput = (e) => {
    setMealForm({ ...mealForm, [e.target.name]: e.target.value })
  }
  const inputTable = (e) => {
    setNewOrder({ ...newOrder, table: tables.filter(i => i.id == e.target.value)[0] })
    setTableName({ ...tableName, [e.target.name]: e.target.value })
  }
  const inputWaiter = (e) => {
    setNewOrder({ ...newOrder, waiter: waiters.filter((i) => i.id == e.target.value)[0] })
    setWaiterName({ ...waiterName, [e.target.name]: e.target.value })
  }
  const submitMealForm = (e) => {
    e.preventDefault()
    const tempMealForm = { ...mealForm, id: Math.floor(Math.random() * 100), price: mealForm.count * mealForm.price }
    setChoosenMeals([...choosenMeals, tempMealForm]);
    setMealForm({ name: '', price: 0, count: 0 })
    setTotal(total+mealForm.price*mealForm.count)
  }
  const submitNewOrder = (e) => {
    e.preventDefault()
    const tempNewOrder = { ...newOrder, meals: choosenMeals, }
    var oldOrders = JSON.parse(localStorage.getItem("orders")) ?? []
    const tempOrder = [...oldOrders, {
      ...tempNewOrder,
      id: Math.floor(Math.random() * 100),
      order_time: Date.now(), status: 'PROCESSING', total_amount: total
    }]
    localStorage.setItem("orders", JSON.stringify(tempOrder))
    nav("/")
  }
  const deleteButton = (id) => {
    const tempMeals = choosenMeals.filter((a) => a.id !== id)
    const filteredMeals=choosenMeals.filter((b)=>b.id===id)
    setChoosenMeals([...tempMeals])
    setTotal(total-filteredMeals.map((a)=>a.price))
  }

  useEffect(() => {
    fetch("http://localhost:5000/tables")
      .then((a) => a.json())
      .then((a) => {
        setTables(a)
        localStorage.setItem("tables", JSON.stringify(a))
      })
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/waiters")
      .then((a) => a.json())
      .then((a) => {
        setWaiters(a)
        localStorage.setItem("waiters", JSON.stringify(a))
      })
  }, [])
  return (
    <>
      <main className='add-orders'>
        <form onSubmit={submitMealForm} className='form-container' >
          <input type="text" onChange={handleMealInput} name='name' placeholder='name' value={mealForm.name} />
          <input type="number" onChange={handleMealInput} name="price" placeholder='price' value={mealForm.price} />
          <input type="number" onChange={handleMealInput} name='count' placeholder='count' value={mealForm.count} />
          <input type="submit" />
        </form>
        <table className='my-order'>
          <thead>
            <tr>
              <th>Index</th>
              <th>The name of order</th>
              <th>Count</th>
              <th>Price</th>
              <th>Operation</th>
            </tr>
          </thead>
          {!loading ? choosenMeals.map((a) => (
            <tbody key={a.id}>
              <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td>AZN {a.price}</td>
                <td><button className='delete' onClick={() => deleteButton(a.id)}>Delete</button></td>
              </tr>
            </tbody>

          )) : <h1>Loading</h1>}
        </table>
        <div className="total-amount df">
          <h1>Total sum:</h1>
          <h1>{total}</h1>
        </div>
        <form onSubmit={submitNewOrder} className='add-necessity'>
          <select onChange={inputWaiter} className='waiter-select' value={waiterName.name} name="waiter" >
            <option value="0">
              select waiter
            </option>
            {waiters.map((c) => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>
          <select onChange={inputTable} className='table-select' value={tableName.name} name="table">
            <option value="0">
              select table
            </option>
            {tables.map((c) => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>
          <button className='btn'>sonlandir</button>
        </form>


      </main>
    </>
  )
}

export default AddOrders