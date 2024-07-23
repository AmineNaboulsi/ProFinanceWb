import React from 'react'
import { Outlet } from "react-router-dom";
import { Slidebar } from '../View/Slidebar';
export function Layoutadmin() {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Slidebar />
            <Outlet />
        </div>
    )
}
