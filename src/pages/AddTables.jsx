import React from 'react'
import {useState,useEffect} from "react"
function AddTables() {
  const refreshPage = ()=>{
    window.location.reload();
 }
  const [loading,setLoading]=useState(false)
  const [table,setTable]=useState({
    name:"",
  })
  const handleInput=(e)=>{
    setTable({...table,name:e.target.value})
  }
  console.log(table)
  const submitForm=(e)=>{
    e.preventDefault()
    setLoading(true)
      fetch("http://localhost:5000/tables",{
        method:"POST",
        headers:{
            Aceept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(table),
    }).then((a)=>a.json())
      .then((a)=>{setLoading(false)})
   
  }
  return (
    <>
    <form onSubmit={submitForm} className='form-container'>
      <input onChange={handleInput} type="text" placeholder='table' name='table' value={table.name} />
      <input type="submit" onClick={refreshPage} />
    </form>
    </>
  )
}

export default AddTables