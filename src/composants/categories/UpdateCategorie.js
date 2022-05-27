import React, { useState, useEffect } from "react";
import {Modal,Button,Form,Row,Col}from "react-bootstrap"
import axios from "axios";
function UpdateCategorie(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nom, setnom] = useState('');
    const [parent, setparent] = useState('');
    const [selectedrowParente, setSElectedrowParente] = useState('');
    const [selectedrowName, setSElectedrowName] = useState('');
    const [id, setId] = useState(0);
    const handleChangeNom= (event) => { setnom(event.target.value) }
    const handleChangeParent= (event) => { setparent(event.target.value) }
     const handleSubmit = (event) => {
  
  
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let csrfToken = localStorage.getItem('csrfToken');
        axios.post(process.env.REACT_APP_API_updateCategorie, {id,nom,parent}, { headers: {
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
    
  useEffect( ()=>{
    props.selectedrow.map((row)=>{ setSElectedrowParente(row.parent)})
    
    props.selectedrow.map((row)=>{ setId(row.id)})
    props.selectedrow.map((row)=>{ setSElectedrowName(row.nom)})
  })
        return (
         
         <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
          Ajouter une categorie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3'>
                
                <Row className=" forms-limiter" >
           
                
                <Form.Label style={{color:'red'}}> {erreur?erreur:null} </Form.Label>

                <Form.Group  as={Row} className='forms-group 'controlId="nom">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangeNom} required  max={14} type="text" placeholder={selectedrowName} className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer le nom de la categorie</Form.Control.Feedback>
                            </Col>
                </Form.Group>


                <Form.Group  as={Row} className='forms-group ' controlId="prenom">
                            <Form.Label   column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Select aria-label="Default select example" onChange={handleChangeParent}>
                            <option value={selectedrowParente} >{selectedrowParente}</option>
                                  <option >Vide</option>
                                {
                                  props.rows.map((row)=>{
                                      return( <option key={row.id} value={row.nom}>{row.nom}</option>)})
                                }
                            </Form.Select>
                                                        </Col>
                </Form.Group>

                </Row>
                <button onClick={props.onHide}  className='bna btn'> Annuler</button>
                <Button  type="submit"  className='btn'>Modifier </Button>
  </Form>
         
      
        </Modal.Body>
      
      </Modal>
        );
}
export default UpdateCategorie