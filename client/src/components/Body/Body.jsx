import React from 'react'
import { Outlet } from 'react-router-dom'
const Body = () => {
  return (
    <div className='min-h-120 bg-gradient-to-br from-slate-700 to-slate-950 py-40 text-white'>        
        <Outlet/>
    </div>
  )
}

export default Body