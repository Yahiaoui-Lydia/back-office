import React, {useRef } from 'react'
 import {Col, Modal, Row}from "react-bootstrap"
 import ReactToPrint from "react-to-print";
import {BsShieldLockFill} from 'react-icons/bs'
 export const Print = React.forwardRef((props, ref) => {     
  return (
    <div ref={ref}  style={{'margin':'15px'}}>
      <div style={{fontSize:'30px',textAlign:'center',borderBottom:'solid'}}>DEVIS NUMÉRO {props.devis}</div>
       <div>
         
       <Col style={{'marginTop':'7px'}}> 
       <Row >
       <BsShieldLockFill style={{fontSize:'50px',padding:'0px',margin:'0px',width:'50px',}}/>
       <Col style={{'fontSize':'10px',marginTop:'5px'}}>
       PROVISION<br/>
       SECURITY<br/>
       SYSTEMS<br/>
       </Col>
       
       
       </Row>
       </Col>
     
       </div>
       <div>
         PROVISION SECURITY SYSTEMS<br/>
         Adresse:sidi ahmed..<br/>
         Tel:032546978<br/>
       </div>
     
{props.client.map((c)=>{
      return(
        <div key={c.nom} style={{textAlign:'right'}}>
         Client: {c.nom}<br/>
         Numéro du client:{c.id}
          </div>
      )
    })}
    
    <div style={{'textAlign':'center'}}> Devis valide jusqu'au {props.date}</div>
 

  <table className='tab'>
  <thead>
  
<tr>

<th>Produit</th>
<th>Prix</th>
<th>Reference</th>
<th>Quantité</th>
</tr>
</thead>
<tbody>
    {props.el.map((element)=>{
  
     
    return( 

<tr key={element.nom}>
<td>{element.nom}</td>
<td>{element.prix}</td>
<td>{element.ref}</td>
<td>{element.quantity}</td>


</tr>
      
 
)})
}
  </tbody>
</table>

<div> Prix total à payer {props.total} DA</div>
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
    
      <Modal.Body>
      
       <Print
           el={props.el}
           date={props.date }
           client={props.client}
           ref={componentRef}
           devis={props.devis}
           total={props.totall}
           ></Print>
        <Row>
          
        <Col> <ReactToPrint trigger={() => <button>Imprimer</button>} content={() => componentRef.current} /></Col>
        <Col>  <button>valider</button></Col>
        <Col>  <button onClick={()=>props.onHide()}>fermer</button></Col>
      </Row>
   </Modal.Body>
    </Modal>
      );
}
export default ShowDevis