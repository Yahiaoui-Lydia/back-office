import React, { useState } from "react";
import {Modal,Form,Row,Col, FloatingLabel}from "react-bootstrap"
import axios from "axios";
function AddCategorie(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nom, setnom] = useState('');



    const handleChangeNom= (event) => { setnom(event.target.value) }
 
     const handleSubmit = (event) => {
  
  
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let csrfToken = localStorage.getItem('csrfToken');
        axios.post(process.env.REACT_APP_API_addCategorie, {nom}, { headers: {
          'Authorization':  csrfToken
        },withCredentials: true    })
          .then((response) => {
           
            window.location.href='/categories'
           
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {
              // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
                if(error.response.status === 400){
                  setErreur('la categorie indiquée existe deja')
                }
               
            } else if (error.request) {
              // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
              setErreur('La connexion a échoué veuillez réessayer')
            }
        });
      }
    
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      
    }
    
        return (
         
         <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="titre-forms" >
         AJOUTER UNE CATEGORIE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3'>
                
                <Row className=" pb-5" >
           
                
                <Form.Label style={{color:'red'}}> {erreur?erreur:null} </Form.Label>

                <FloatingLabel controlId="floatingNom" label="Nom" style={{'marginBottom':'12px'}} >
                  <Form.Control   onChange={handleChangeNom} required placeholder="Nom" type="text"  className='forms-input py-0 my-0 '/>
                    <Form.Control.Feedback type="invalid">Veuillez inserer le nom de la categorie</Form.Control.Feedback>

                  </FloatingLabel>

             
 
            
                </Row>

               
          
                <Col style={{'textAlign':'center'}}>
                
                <button  type="submit"  className=' btn-principal' style={{width:'200px'}}>Ajouter </button>
                </Col>
               
  </Form>
  <Col style={{'textAlign':'center'}}>
                <button  onClick={props.onHide}  className='btn-secondaire '>Fermer</button>
            
                </Col>
      
        </Modal.Body>
      
      </Modal>
        );
}
export default AddCategorie