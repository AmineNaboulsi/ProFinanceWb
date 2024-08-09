import React from 'react'
import { Outlet } from "react-router-dom";
import { Slidebar } from '../View/Slidebar';
import { MdClear } from "react-icons/md";

export function Layoutadmin() {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Slidebar className="menusidebar"/>
            
                <Outlet />
   
        </div>
    )
}
