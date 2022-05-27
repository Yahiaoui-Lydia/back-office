import React, { useEffect, useState } from 'react'
import {Container,Navbar,Nav} from 'react-bootstrap'
import {HiMenu} from 'react-icons/hi'
import {IoNotifications,IoPersonAddSharp,IoPersonCircleSharp,IoLogOut} from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
function NavBar(props) {
  const [titre,setTitre]=useState('')
  const [notification,setnotification]=useState(0)
  const location =useLocation()
  const notif = async()=>{  let csrfToken = localStorage.getItem('csrfToken');
  axios.get(process.env.REACT_APP_API_ListeB2B, {withCredentials: true  , headers: {'Authorization':  csrfToken}  })
.then((response) => {
  setnotification(response.data.length)}

)}
useEffect( () => {
       notif()
      if(location.pathname === ''){setTitre('TABLEAU DE BORD')}
      if(location.pathname === '/'){setTitre('TABLEAU DE BORD')}
      if(location.pathname === '/produits'){setTitre('GESTION DES PRODUITS')}
      if(location.pathname === '/admins'){setTitre('GESTION DES UTILISATEURS')}
      if(location.pathname === '/categories'){setTitre('GESTION DES CATEGORIES')}
      if(location.pathname === '/devis'){setTitre('GESTION DES DEVIS')}
      if(location.pathname === '/b2b'){setTitre('GESTION DES UTILISATEURS B2B')}
      
}, [location.pathname]);

  return(
    
    <Navbar >
  <Container fluid>
    <Navbar.Brand ><HiMenu onClick={props.show} className="show"/></Navbar.Brand>
    <Navbar.Toggle />
        
    <Navbar.Collapse className="justify">
    <div style={{width:'70%',height:'100%',fontSize:'28px',fontWeight:'bold',textAlign:'center'}}>
      {titre}
      </div>
      <Nav>
          <Nav.Item >
                  <span id="group">
                      <IoNotifications className="nav-icons" style={{'fontSize':'27px'}}/>
                    <span className="badge badge-light" style={{'backgroundColor':'red','position':'relative','top':'-15px',left:'-18px','borderRadius':'50%',fontSize:'10px'}}>1</span>
                  </span>
          </Nav.Item>
          <Nav.Item>
                  <span id="group">
                      <IoPersonAddSharp className="nav-icons" style={{'fontSize':'27px'}}/>
                    <span className="badge badge-light" style={{'backgroundColor':'red','position':'relative','top':'-15px',left:'-18px','borderRadius':'50%',fontSize:'10px'}}>{notification}</span>
                  </span>
          </Nav.Item>
          <Nav.Item> 
            <span id="group">
                      <IoPersonCircleSharp className="nav-icons" />
                      </span>
          </Nav.Item>
          <Nav.Item>
          <span id="group">
                      <IoLogOut className="nav-icons"/>
                      </span>
          </Nav.Item>
      
      </Nav>
     
    </Navbar.Collapse>
  </Container>
</Navbar> 
 )  
}
export default NavBar