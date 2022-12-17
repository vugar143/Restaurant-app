import React from 'react'
import {NavLink} from "react-router-dom"
function Navbar() {
  return (
    <>
   <nav className='nav'>
    <div className="nav-container">
   <NavLink end to="/">Home</NavLink>
   <NavLink end  to="/addorders">Add Orders</NavLink>
   <NavLink end  to="/addwaiters">Add Waiters</NavLink>
   <NavLink end  to="/addtables">Add Tables</NavLink>
   </div>
   </nav>
    </>
  )
}

export default Navbar