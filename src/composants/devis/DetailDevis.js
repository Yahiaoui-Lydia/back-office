import React, { useEffect, useState, useCallback } from "react";
import {Modal,Button}from "react-bootstrap"
import axios from "axios";

 function DetailDevis(props){

const [elementDevis,setElement]= useState([])
const [client, setclient]=useState('')
const [date, setdate]=useState('')
var csrfToken = localStorage.getItem('csrfToken');
    
    const getproduit= useCallback(async(id,qt)=>{
        var csrfToken = localStorage.getItem('csrfToken');
 
          await axios.get(process.env.REACT_APP_API_Product+id, { headers: {'Authorization':  csrfToken},withCredentials: true})
          .then( (response)=>{
            var tab=elementDevis
                response.data.map((produit)=>{
                  

                    var t ={"photo":produit.photo,"nom":produit.nom,"prix":produit.prixGros,"ref":produit.ref,"quantity":qt}
                    
                    tab.push(t)
                  
                   setElement(tab)
                 
                })
                
              }
          )
          
      }, [])


      const getdevis = useCallback(async (id) => {
       
        var csrfToken = localStorage.getItem('csrfToken');
              await axios.get(process.env.REACT_APP_API_DevisElements+id, { headers: {'Authorization':  csrfToken},withCredentials: true    })
        .then((response) => {
     response.data.map(async(element)=>{
             
        await getproduit(element.idProduit,element.quantity)
       
                   })


     
      })
      
         
      }, []) 
      useEffect(() => {
          console.log( props.selectedrow)
          props.selectedrow.map((p)=>{
              setElement([])
              console.log(p)
              setdate(p.date)
              setclient(p.nom)
            getdevis(p.id)
           
          })

        
      }, [])
    return (
        <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            Confirmation de Suppression
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div> 
           le client :{client}
           la date:{date}

           {console.log(client)}
           {console.log(date)}
           {console.log(elementDevis)}
           <table>
  <tr>
    <th>Nom</th>
    <th>Photo</th>
    <th>Prix</th>
    <th>Ref</th>
    <th>Quantité</th>
  </tr>
           {
               elementDevis.map((e)=>{
                   return(
                    <tr key={e.ref}>
                    <td>{e.nom}</td>
                    <td>{e.photo}</td>
                    <td>{e.prix}</td>
                    <td>{e.ref}</td>
                    <td>{e.quantity}</td>
                  </tr>
                      
                   )
               }
               
               )
           }
 </table>

       

       </div>
       
        </Modal.Body>
        <Modal.Footer>
        <button onClick={props.onHide}  className='bna btn'> Annuler</button>
          
        </Modal.Footer>
      </Modal>
    )
 }
 export default DetailDevis