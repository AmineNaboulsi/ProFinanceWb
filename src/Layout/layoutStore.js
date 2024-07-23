import React from 'react'
import { Outlet } from "react-router-dom";

export function LayoutStore() {
  return (
    <div className='pagestore'>
        <Outlet/>
    </div>
  )
}