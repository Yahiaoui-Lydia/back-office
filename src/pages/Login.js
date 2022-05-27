
import React, { useState } from 'react'
import {Row,Button, Form,Col} from 'react-bootstrap'
import axios from 'axios';


function Login() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [email, setEmail] = useState('');
  const handleChangePassword = (event) => {setPassword(event.target.value) }
  const handleChangeEmail= (event) => { setEmail(event.target.value) }
  const handleSubmit = (event) => {

console.log(process.env.REACT_APP_API_login)
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
    
        axios.post(process.env.REACT_APP_API_login , {password,email  },{withCredentials: true})
        .then((response) => {
          // Success 
          localStorage.setItem('csrfToken',response.data.csrf )
          localStorage.setItem('role',response.data.role )
          window.location.href='/'
         
      })
      .catch((error) => {
          // Error 
          if (error.response) {
            // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
              if(error.response.status ===400){
                setErreur('E-mail ou mot de passe incorect')
              }
              if(error.response.status ===500){
                setErreur('La connexion a échoué veuillez réessayer')
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
    <div className='App d-flex flex-column align-items-center' >
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='forms mx-3 my-3 pb-3 px-3'>
  
      <Row className=" forms-limiter" style={{}}>
        <span className='forms-title mb-3'>Connexion</span>
       
        <Form.Label style={{color:'red'}}> {erreur?erreur: null} </Form.Label>
        Saisissez votre email et votre mot de passe ci-dessous pour vous connecte
        <Form.Group  as={Row} className='forms-group ' controlId="email">
                  <Form.Label  column sm={2}  className='bi bi-envelope forms-label '></Form.Label>
                  <Col>
                  <Form.Control onChange={handleChangeEmail} required type="email" placeholder="votre E-mail" className='forms-control py-0 my-0 '/>
                  <Form.Control.Feedback type="invalid">Veuillez saisir une adresse email correcte </Form.Control.Feedback>
                  </Col>
        </Form.Group>


        <Form.Group  as={Row}  controlId="password"   className='forms-group'>
                  <Form.Label column sm={2} className='bi bi-lock  forms-label' ></Form.Label>
                  <Col >
                  <Form.Control onChange={handleChangePassword} required type="password" placeholder="votre mot de passe" className='forms-control py-0 my-0 ' />
                  <Form.Control.Feedback type="invalid">Veuillez saisir votre mot de passe  </Form.Control.Feedback>
                  </Col>
        </Form.Group>
       
        <a href='/forgot-password' className='forms-link'> Mot de passe oublié ?</a>
        <Button type="submit"  className='forms-btn'>Connexion </Button>
     
        </Row>
        <a href='/register' className='forms-link'>Vous n'avez pas un compte ?inscrivez vous ici</a>
   
       
   
    </Form>
  



    </div>
  );
}

export default Login;