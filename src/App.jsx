import { useState,useEffect } from 'react'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddOrders from './pages/AddOrders'
import AddTables from './pages/AddTables'
import AddWaiters from './pages/AddWaiters'
import NotFound from './pages/NotFound'
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addorders" element={<AddOrders/>} />
      <Route path="/addtables" element={<AddTables/>} />
      <Route path="/addWaiters" element={<AddWaiters/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
   
   
   </>
  )
}

export default App
