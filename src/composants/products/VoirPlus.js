import React, { useEffect, useState } from 'react'
 import {Modal}from "react-bootstrap"
import axios from "axios";
 function VoirPlus(props){
     const[attributs,setattributs]=useState([])
     useEffect(()=>{
        props.selectedrow.map(async(p)=>{
            let csrfToken = localStorage.getItem('csrfToken');
      
            await axios.get(process.env.REACT_APP_API_listProductAtt+p.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
          .then((response)=>{
            setattributs(response.data)
          }
           
          )})
     })
    return (
        
        <Modal
       {...props}
      
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
         {props.selectedrow.map((row)=>{return( 
             <>
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter" >
         Informations sur {row.nom} 
         </Modal.Title>
       </Modal.Header>
         
       <Modal.Body>
       <img style={{width:'200px',height:'200px',borderRadius:'50%'}} alt={row.nom} src={process.env.REACT_APP_API_GET_IMAGE + row.photo}  />
       {attributs.map((att)=>{return <>{att.key}  {att.value}</>})}
       </Modal.Body></>
    )})}
     </Modal>
       );
 }
 export default VoirPlus