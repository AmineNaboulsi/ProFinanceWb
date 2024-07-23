import React, { useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { IoMdAdd } from "react-icons/io";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import Norows from "../Images/norows.png"
import { useNavigate } from 'react-router-dom';
import '../App.css'

const ImageCellRenderer = ({ value }) => (
  <div
    style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}
  >
    <img
      style={{ width: "40px", height: "40px" }}
      src={value}
      alt="" />
    <span>Product Name</span>

  </div>
);


export default function Licencekey (){
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1; // Months are zero based
    const year = d.getFullYear();
  
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
  
    return `${day}-${month}-${year}`;
  };

  const calculateDaysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; 
    return Math.round((date1 - date2) / oneDay);
  };
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetch(`${apiUrl}/lk/getlks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: "all"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newrows = data.map((row, index) => {
          const { ["client"]: columnToRemoveValue1, ["type"]: columnToRemoveValue2, ...rest } = row;
          return {
            client: row.client,
            id : row._id,
            type : row.type ,
            version : row.version,
            /*`${row.price} ${row.currency}`*/
            etat : row.etat ,
            expireon: row.expireon
            
          };
        });

        const attributes = Object.keys(newrows[0]);
        // Create columnsData dynamically based on attributes
        const columnsData = attributes.map((attribute) => {
          
          if (attribute === "isMonopost") {
            return {
              field: attribute,
              headerName: attribute,
              width: 150,
              renderCell: (params) => {
                if (params.value === true) {
                  //return <div className='statusactive'>Oui</div>
                  return <>Monoposte</>

                } else {
                  //return <div className="statusdraft">Non</div>;
                  return <>Reseaux</>
                }
              }
            }
          }
          if (attribute === "expireon") {
            return {
              field: attribute,
              headerName: "Date d'expiration",
              width: 185,
              renderCell: (params) => {
              
                const version = params.row.version; 

                
                if(version === "complet"){
                  return  <p style={{color : 'black' , fontWeight : 'bold' , marginLeft : 15}}>
                    A vie</p>
                }else{
                  const today = new Date();
                  const compareDate = new Date(params.value);
            
                  // Calculate days difference
                  const daysDifference = calculateDaysDifference(compareDate, today);
            
                  // Format the date
                  const formattedDate = formatDate(compareDate);
            
                  // Display days left or 'end'
                  const displayText = `rest ${daysDifference} jour `;
          
  
  
                  if(daysDifference >= 0){
                    return  <>
                    {formattedDate} <p style={{color : 'green' , marginLeft : 15}}>({displayText})</p>
                    </>
                  }else{
                    return  <> 
                    {formattedDate} <p style={{color : 'red' , marginLeft : 15}}>période finie</p>
                    </>
                  }
                }
              }
            }
          }
          /*
          if (attribute === "quantitystock") {
            return {
              field: attribute,
              headerName: attribute,
              width: 150,
              renderCell: (params) => {
                if (params.value === 0) {
                  return <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "red" }}>
                    <FaLongArrowAltDown />
                    <span>{params.value}</span>
                  </div>
                } else {
                  return <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "green" }}>
                    <FaLongArrowAltUp />
                    <span>{params.value}</span>
                  </div>;
                }
              }
            }
          }
          if (attribute === "status") {
            return {
              field: "status",
              headerName: attribute,
              width: 150,
              renderCell: (params) => {
                if (params.value === "active") {
                  return <div className='statusactive'>Active</div>
                } else {
                  return <div className="statusdraft">Draft</div>;
                }
              }
            };
          }
          if (attribute === "price") {
            return {
              field: "price",
              headerName: "Price",
              width: 150,
              renderCell: (params) => {
                return <>{params.value}</>
              }
            };
          }*/
          return {
            field: attribute,
            headerName: attribute,
            width: 180,
          };
        });

        setColumns(columnsData);
        setRows(newrows);
      })
  },[])
  const handleRowClick = (params) => {
    const clickedRow = params.row;
    navigate(`/home/selectlicence`, { state: { rowData: clickedRow } });
  };
  const adddproductClick = () => {
    navigate(`/home/addlicence`);
  };
  const CustomNoRowsOverlay = () => {
    return <div
    style={{display: 'flex' , flexDirection : "column" , alignItems : "center" , padding : "1rem"}}
    >
      <img
      style={{width: 'fit-content' , height  :"fit-content"}}
      src={Norows} alt='' />
      <h4>No rows</h4>
    </div>
  }

  return (
    <div className='pageproduct'>

      <h1>Licence</h1>
      <div className='card-product-list'>
        <div className='filter-product-bar'>
          <ul>
          </ul>
            <div className='add-product' onClick={adddproductClick}>
              <IoMdAdd />
              <span>New Key</span>
            </div>      
        </div>
        <DataGrid 
          autoHeight         
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{ '--DataGrid-overlayHeight': '350px' }}
        />
      </div>

    </div>
  )
}
