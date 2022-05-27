import React, {  useEffect, useState } from 'react';
import isLoggedIn from '../utils/isLoggedIn';
import {Routes,Route,Navigate} from 'react-router-dom';
import {Container} from 'react-bootstrap'
import Router from './Router'
//includes
import NavBar from '../includes/NavBar';
import SideBarSuperAdmin from '../includes/SideBarSuperAdmin'
//pages
import Home from '../pages/Home';
import GestionProducts from '../pages/GestionProducts'
import GestionCategories from '../pages/GestionCategories'
import GestionB2B from '../pages/GestionB2B'
import GestionDevis from  '../pages/GestionDevis'
import GestionAdmins from '../pages/GestionAdmins';


function verify() { 
        if (isLoggedIn() === 'admin') {  
              return  <Navigate to="/"/>
               
        }
        else{ 
                 return <Router/> } 
    }
function SuperAdminRoutes() { 
  const [show,setShow]= useState(false)
  useEffect(() => { verify() }); 
  return (
     
        <Container className=" d-flex" fluid >
            
        <div>
          <SideBarSuperAdmin show={show}/>
      	
      </div>

      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column",width:'100%' }}>
        <NavBar show={()=>setShow(!show)}/>
        <div >
        
        <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/produits" element={<GestionProducts/>}/>
             <Route path="/categories" element={<GestionCategories/>}/>
             <Route path="/devis" element={<GestionDevis/>}/>
             <Route path="/b2b" element={<GestionB2B />}/>
             <Route path="/admins" element={<GestionAdmins />}/>
        </Routes>
        </div>
        </div>
        </Container>
       
  )

  } 
export default SuperAdminRoutes;