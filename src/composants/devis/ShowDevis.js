import React, { useEffect, useState,useCallback } from 'react'
 import {Modal}from "react-bootstrap"
function ShowDevis(props){
  
   return (
       
       <Modal
      {...props}
     
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
       
        <Modal.Title id="contained-modal-title-vcenter" >
        Information h
 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.client.map((c)=>{
          return(
            <div>{c.nom}</div>
          )
        })}
        date:{props.date}
      <table>
      <thead>
      
  <tr>
  
    <th>Produit</th>
    <th>Prix</th>
    <th>Reference</th>
    <th>Quantité</th>
  </tr>
  </thead>
  <tbody>
        {props.el.map((element)=>{return( 
    
    <tr key={element.nom}>
    <td>{element.nom}</td>
    <td>{element.prix}</td>
    <td>{element.ref}</td>
    <td>{element.quantity}</td>

  </tr>
          
     
   )})}
      </tbody>
   </table>
   </Modal.Body>
    </Modal>
      );
}
export default ShowDevis