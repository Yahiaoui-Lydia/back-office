import React, { useEffect, useState,useCallback,useRef } from 'react'
 import {Modal}from "react-bootstrap"
 import ReactToPrint from "react-to-print";
//  function Print(props){
//    return(
//     <div>
//     {props.client.map((c)=>{
//       return(
//         <div>{c.nom}</div>
//       )
//     })}
//     date:{props.date}
//   <table>
//   <thead>
  
// <tr>

// <th>Produit</th>
// <th>Prix</th>
// <th>Reference</th>
// <th>Quantité</th>
// </tr>
// </thead>
// <tbody>
//     {props.el.map((element)=>{return( 

// <tr key={element.nom}>
// <td>{element.nom}</td>
// <td>{element.prix}</td>
// <td>{element.ref}</td>
// <td>{element.quantity}</td>

// </tr>
      
 
// )})}
//   </tbody>
// </table>
// </div>
//    )
//  }
 export const Print = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} >

{props.client.map((c)=>{
      return(
        <div key={c.nom}>{c.nom}</div>
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

    </div>
  );
});
function ShowDevis(props){
  const componentRef = useRef();
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
      
       <Print
           el={props.el}
           date={props.date }
           client={props.client}
           ref={componentRef}
           ></Print>
        
           <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
   </Modal.Body>
    </Modal>
      );
}
export default ShowDevis