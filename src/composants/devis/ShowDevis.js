import React, {useRef } from 'react'
import axios from 'axios'
 import {Col, Modal, Row}from "react-bootstrap"
 import ReactToPrint from "react-to-print";
import {BsShieldLockFill} from 'react-icons/bs'
 export const Print = React.forwardRef((props, ref) => {     
  return (
    <div ref={ref}  style={{'margin':'15px'}}>
      <div style={{'borderBottom':'solid','paddingBottom':'10px'}}>
        <Row>
      <Col style={{width:'30%'}}> 
       <Row >
       <BsShieldLockFill style={{fontSize:'50px',padding:'0px',margin:'0px',width:'50px',}}/>
       <Col style={{'fontSize':'10px',marginTop:'5px'}}>
       PROVISION<br/>
       SECURITY<br/>
       SYSTEMS<br/>
       </Col>
       
       
       </Row>
       </Col>
      <Col style={{width:'70%',textAlign:'left',fontSize:'20px'}}>DEVIS NUMÉRO {props.devis}</Col>  
      </Row>
        </div>
      <br></br>
   
       <Row>
         <Col style={{'fontSize':'12px'}}>
        <h5>Devis établi par</h5>
         PROVISION SECURITY SYSTEMS<br/>
         Adresse:lot n°47 
         ferme oultache, 
         Sidi Ahmed<br/>
         Tel:032546978<br/>
         </Col>
         <Col  style={{width:'50%'}}>
         {props.client.map((c)=>{
  if(c.role==='B2B'){

    return(
      <div key={c.nom} style={{'fontSize':'12px'}}>
    
  <h5>Devis adressé à</h5>
        Numéro du client:{c.id}<br/>
       Entreprise: {c.nom}<br/>
       SIRET: {c.siret}</div>
      
        
    )
  }else{
    return(
      <div key={c.nom} style={{'fontSize':'12px'}}>
          <h5>Devis adressé à</h5>
       Client: {c.nom}<br/>
       Numéro du client:{c.id}
        </div>
    )
  }
    })}
         </Col>
        </Row>
       
        <br></br>

    
    <div style={{'textAlign':'center',fontSize:'25px','color':'red'}}> Devis valable jusqu'au {props.date}</div>
 <br></br>

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
<br></br>
<div  style={{'textAlign':'center',fontSize:'25px','border':'solid'}}> Prix total à payer {props.total} DA</div><br></br>
<div style={{'textAlign':'center'}}>Nous restons à votre disposition pour toute information complémentaire.Cordialement</div>
    </div>

  );
});
function ShowDevis(props){
  const valider= async()=>{
    var csrfToken = localStorage.getItem('csrfToken');
    await axios.post(process.env.REACT_APP_API_ValiderDevis+props.devis, { headers: {'Authorization':  csrfToken},withCredentials: true    })
    .then((response)=>{
      window.location.href='/devis'
    })
  }
  const componentRef = useRef();
   return (
       
       <Modal 
      {...props}
     
     

    >
    
      <Modal.Body >
      
       <Print
           el={props.el}
           date={props.date }
           client={props.client}
           ref={componentRef}
           devis={props.devis}
           total={props.totall}
           ></Print>
        <Row style={{'borderTop':'solid'}}>
          
        <Col> <ReactToPrint trigger={() => <button>PDF</button>} content={() => componentRef.current} /></Col>
        <Col>  <button onClick={()=>valider()}>Valider</button></Col>
        <Col>  <button onClick={()=>props.onHide()}>Fermer</button></Col>
      </Row>
   </Modal.Body>
    </Modal>
      );
}
export default ShowDevis