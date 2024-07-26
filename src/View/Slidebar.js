import React from 'react'
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { MdDashboard } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import '../App.css'
import { MdDesktopWindows } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Cookies from 'js-cookie'; 

export function Slidebar() {
  return (
    <div style={{ width: "fit-content", height: "100vh", backgroundColor: "#ffff" }} >
      <Sidebar >
        <div>
          <div className='sidebar-header' style={{ backgroundColor: "#ffff", height : "100vh", display: "flex",flexDirection :"column" , justifyContent :"space-between" }}>
            <div>
              <h1 style={{ textAlign: "center" }}>Gest Finnace</h1>
              <Menu>
                <MenuItem component={<Link to="/home" />}>
                  <div className='menuitemshape'>
                  <MdDashboard />
                    <span >Dashborad</span>
                  </div>
                </MenuItem>
                <MenuItem component={<Link to="/home/licencekey" />}>
                  <div className='menuitemshape'>
                  <FaKey />

                    <span >Licence Key</span>
                  </div>
                </MenuItem>
                <MenuItem component={<Link to="/home/devices" />}>
                  <div className='menuitemshape'>
                  <MdDesktopWindows />

                    <span >Devices</span>
                  </div>
                </MenuItem>
                <MenuItem component={<Link to="/home/logs" />}>
                  <div className='menuitemshape'>
                  <TbLogs />
                    <span >Logs</span>
                  </div>
                </MenuItem>
                <MenuItem component={<Link to="/" />} onClick={()=>{
                    Cookies.remove('authToken')
                  }}>
                  <div className='menuitemshape'>
                  <FiLogOut color='red'/>
                  <span style={{color : 'red'}}>Logout</span>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>


      </Sidebar>

    </div>
  )
}