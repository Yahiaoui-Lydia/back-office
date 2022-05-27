import React, {  useEffect} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import isLoggedIn from '../utils/isLoggedIn';
import Router from './Router';
import Login from '../pages/Login';
import {Container} from 'react-bootstrap'

function verify() { 
    if (isLoggedIn()==='') {  
          return  <Navigate to="/"/> 
    }
    else{  <Navigate to="/"/> 
             return <Router/> } 
}
function PublicRoutes() {
    useEffect(() => { verify() }); 

   
    return (
      <>
 <Container className=" d-flex" fluid >
       
     
        <Routes>
      
        <Route path="/" element={<Login/>}/>
     
       

        </Routes>
       
      
       
        </Container>



     
    
        
   </>
    )
}

export default PublicRoutes