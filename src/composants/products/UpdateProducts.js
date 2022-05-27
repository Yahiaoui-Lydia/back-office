import React, { useState, useEffect } from "react";
import {Modal,Button,Form,Row,Col}from "react-bootstrap"
import axios from "axios";
import InputUpdate from "./InputUpdate"
function UpdateProducts(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nomChange, setnom] = useState('');
    const [prixGrosChange, setprixGros] = useState('');
    const [prixDetailChange, setprixDetail] = useState('');
    const [descriptionChange, setdescription] = useState('');
    const [refChange, setref] = useState('');
    const [categorieChange, setcategorie] = useState('');
    const [image, setImage] = useState({ preview: '', data: '' })
    const [extension,setExtension]= useState('')
    const [listCategorie,setListCategorie] =useState([]);
    const [inputList, setInputList] = useState([]);

    const handleChangeNom= (event) => { setnom(event.target.value) }
    const handleChangePrixGros= (event) => { setprixGros(event.target.value) }
    const handleChangePrixDetail= (event) => { setprixDetail(event.target.value) }
    const handleChangeDescription= (event) => { setdescription(event.target.value) }
    const handleChangeRef= (event) => { setref(event.target.value) }
    const handleChangeCategorie= (event) => { setcategorie(event.target.value) }
    const handleFileChange = (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      }
      setImage(img)
    
      var type =e.target.files[0].type
     setExtension(type.replace(/(.*)\//g, ''))
  
  
    }
    const handleSubmit = (event) => {
       const tab = props.id.map((i)=>{return(i)})
       const id =tab[0]
      
   const form = event.currentTarget;
   if (form.checkValidity() === true) {
    const tab = props.id.map((i)=>{return(i)})
    const id =tab[0]
    //filter les attributs
     const attributs = inputList.filter(
       (item) => { return(item.key !== '' && item.value !== '') }    
        )
        //si la valeur de l'input est change alors màj sinon garder l'ancienne valeur
        const nomRow=props.selectedrow.map((r)=>{return(r.nom)})
        const prixGrosRow=props.selectedrow.map((r)=>{return(r.prixGros)})
        const prixDetailRow=props.selectedrow.map((r)=>{return(r.prixDetail)})
        const descriptionRow=props.selectedrow.map((r)=>{return(r.description)})
        const refRow=props.selectedrow.map((r)=>{return(r.ref)})
        const categorieRow=props.selectedrow.map((r)=>{return(r.categorie)})
        const photoRow=props.selectedrow.map((r)=>{return(r.photo)})

        const nom =nomChange?nomChange:nomRow[0]
        const prixGros =prixGrosChange?prixGrosChange:prixGrosRow[0]
        const prixDetail =prixDetailChange?prixDetailChange:prixDetailRow[0]
        const description =descriptionChange?descriptionChange:descriptionRow[0]
        const ref =refChange?refChange:refRow[0]
       var photo =photoRow[0]
        const categorie =categorieChange?categorieChange:categorieRow[0]
            if(image.data){
                 //photo uplaod
                 let formData = new FormData()
                 const filename= id+'.'+extension;
                 formData.set('file', image.data,filename);
                 photo=filename
                
                 let csrfToken = localStorage.getItem('csrfToken'); 
             axios({
                 method: 'post',
                 url: process.env.REACT_APP_API_SAVE_IMAGE,
                 data: formData,
                 config: { headers: {'Content-Type': 'multipart/form-data','Authorization':  csrfToken },withCredentials: true}
             })
            }
         
        let csrfToken = localStorage.getItem('csrfToken');
     axios.post(process.env.REACT_APP_API_updateProduct,
       {id,nom,prixGros,prixDetail,description,ref,photo,categorie,attributs}, { headers: {
       'Authorization':  csrfToken
     },withCredentials: true    })
       .then((response) => {
        window.location.href='/produits'
           
     })
     .catch((error) => {
         // Error 
         if (error.response) {
           // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
             if(error.response.status === 400){
               setErreur('la categorie indiquée existe deja')
             }
            
         } else if (error.request) {
           // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
        //    setErreur('La connexion a échoué veuillez réessayer')
         }
     });
   }
 
   event.preventDefault();
   event.stopPropagation();
   setValidated(true);
   
 }
 useEffect( ()=>{
  
    const getCategories  = async ()=>{
      
      
      let csrfToken = localStorage.getItem('csrfToken');
   
        await axios.get(process.env.REACT_APP_API_listCategorie, { headers: {'Authorization':  csrfToken},withCredentials: true    })
      .then(async(response) => {
        setListCategorie( response.data)

    })
    .catch((error) => {

        if (error.response) {
          // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
            if(error.response.status === 401){
              localStorage.setItem('role','')
              window.location.href='/login'
            
            }
        } else if (error.request) {
          // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
          setErreur('La connexion a échoué veuillez réessayer')
        }
      })
   }
   ;getCategories();}
  ,[] )
    return (
        
        <Modal
       {...props}
      
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter" >
       Modifier un produit
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
       {props.selectedrow.map((row)=>{return( 
     
       <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3' key={row.id}>
               
               <Row className=" forms-limiter" >
          
               
               <Form.Label style={{color:'red'}}> {erreur?erreur:null} </Form.Label>
               {image.preview ? <img alt="produit" src={image.preview} style={{width:'200px',height:'200px',borderRadius:'50%'}}  />:<img style={{width:'200px',height:'200px',borderRadius:'50%'}} src={process.env.REACT_APP_API_GET_IMAGE + row.photo}  />}
               <Form.Group  as={Row} className='forms-group 'controlId='nom'>
                           <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                           <Col>
                         
                          <Form.Control   onChange={handleChangeNom}  type="text"  placeholder={row.nom} className='forms-control py-0 my-0 '/>
                           </Col>
               </Form.Group>
               
               <Form.Group  as={Row} className='forms-group '>
                           <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                           <Col>
                           <Form.Control   onChange={handleChangePrixGros}  type="number" step="any"placeholder={row.prixGros} className='forms-control py-0 my-0 '/>
                           </Col>
               </Form.Group>
               <Form.Group  as={Row} className='forms-group '>
                           <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                           <Col>
                           <Form.Control   onChange={handleChangePrixDetail} type="number" step="any" placeholder={row.prixDetail} className='forms-control py-0 my-0 '/>
                           </Col>
               </Form.Group>
               <Form.Group  as={Row} className='forms-group '>
                           <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                           <Col>
                           <Form.Control   onChange={handleChangeRef} type="text" placeholder={row.ref} className='forms-control py-0 my-0 '/>
                           </Col>
               </Form.Group>

               <Form.Group  as={Row} className='forms-group '>
                           <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                           <Col>
                           <Form.Control   onChange={handleChangeDescription} type="textarea" placeholder={row.description} className='forms-control py-0 my-0 '/>
                           </Col>
               </Form.Group>


               <Form.Group  as={Row} className='forms-group ' >
                           <Form.Label   column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                           <Col>
                           <Form.Select  onChange={handleChangeCategorie} >
                               <option value={row.categorie} >{row.categorie}</option>
                              
                               {
                                 listCategorie.map((categorie)=>{return( <option key={categorie.id} value={categorie.nom}>{categorie.nom}</option>)})
                               }
                           </Form.Select>
                                                       </Col>
               </Form.Group>
               <Form.Group  as={Row} className='forms-group '>
            
                           <Col>
                           <Form.Control   type='file' name='file' onChange={handleFileChange}/>
                           </Col>
               </Form.Group>

               
                  <InputUpdate list={(l)=>setInputList(l)} selectedP={props.selectedrow}></InputUpdate>

               </Row>
               <button onClick={props.onHide}  className='bna btn'> Annuler</button>
               <Button  type="submit"  className='btn'>Modifier</Button>
 </Form>
         )})}
     
       </Modal.Body>
     
     </Modal>
       );
}
export default UpdateProducts