import React from 'react'
import {useState,useEffect} from "react"
function AddWaiters() {
  const refreshPage = ()=>{
    window.location.reload();
 }
  const [loading,setLoading]=useState(false)
  const [waiter,setWaiter]=useState({
    name:"",
  })
  const handleInput=(e)=>{
    setWaiter({...waiter,name:e.target.value})
  }
  console.log(waiter)
  const submitForm=(e)=>{
    e.preventDefault()
    setLoading(true)
      fetch("http://localhost:3000/waiters",{
        method:"POST",
        headers:{
            Aceept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(waiter),
    }).then((a)=>a.json())
      .then((a)=>{console.log(waiter)})
   
  }
  return (
    <>
    <form onSubmit={submitForm} className='form-container'>
      <input onChange={handleInput} type="text" placeholder='waiter' name='waiter' value={waiter.name} />
      <input type="submit" onClick={refreshPage} />
    </form>
    </>
  )
}

export default AddWaiters