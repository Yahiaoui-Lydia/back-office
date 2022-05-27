import React, { useState } from "react";
import {Modal,Button,Form,Row,Col}from "react-bootstrap"
import axios from "axios";

function AddAdmin(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nom, setnom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const handleChangePassword = (event) => {setPassword(event.target.value) }
    const handleChangeEmail= (event) => { setEmail(event.target.value) }
    const handleChangeNom= (event) => { setnom(event.target.value) }
    const handleChangePrenom= (event) => { setPrenom(event.target.value) }
     const handleSubmit = (event) => {
  
  
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let csrfToken = localStorage.getItem('csrfToken');
        axios.post(process.env.REACT_APP_API_addNewAdmin, {password,email,nom,prenom  }, { headers: {
          'Authorization':  csrfToken
        },withCredentials: true    })
          .then((response) => {
           
           window.location.href='/admins'
           
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {
              // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
                if(error.response.status === 400){
                  setErreur('vous possédez deja un compte')
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
          <Modal.Title id="contained-modal-title-vcenter" >
          Ajouter un nouvel administrateur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3'>
                
                <Row className=" forms-limiter" >
           
                
                <Form.Label style={{color:'red'}}> {erreur?erreur: null} </Form.Label>

                <Form.Group  as={Row} className='forms-group 'controlId="nom">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangeNom} required  max={14} type="text" placeholder="Nom" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un nom</Form.Control.Feedback>
                            </Col>
                </Form.Group>


                <Form.Group  as={Row} className='forms-group ' controlId="prenom">
                            <Form.Label   column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control onChange={handleChangePrenom} required   type="text" placeholder="Prenom" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un prénom</Form.Control.Feedback>
                            </Col>
                </Form.Group>
                
                <Form.Group  as={Row} className='forms-group ' controlId="email">
                            <Form.Label  column sm={2}  className='bi bi-envelope forms-label '></Form.Label>
                            <Col>
                            <Form.Control  onChange={handleChangeEmail} required type="email" placeholder="votre E-mail" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez saisir une adresse email correcte </Form.Control.Feedback>
                            </Col>
                </Form.Group>
                
                <Form.Group  as={Row}  controlId="password"   className='forms-group'>
                            <Form.Label column sm={2} className='bi bi-lock  forms-label' ></Form.Label>
                            <Col >
                            <Form.Control  onChange={handleChangePassword} required type="password" placeholder="votre mot de passe" className='forms-control py-0 my-0 ' />
                            <Form.Control.Feedback type="invalid">Veuillez saisir votre mot de passe  </Form.Control.Feedback>
                            </Col>
                </Form.Group>

                </Row>
                <Button  type="submit"  className='btn'>Ajouter </Button>
                <button onClick={props.onHide}  className='bna btn'> Annuler</button>
  </Form>
         
      
        </Modal.Body>
      
      </Modal>
        );
      }
      
    

export default AddAdmin