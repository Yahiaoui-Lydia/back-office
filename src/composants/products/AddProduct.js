import React, { useState,useEffect } from "react";
import {Modal,Button,Form,Row,Col}from "react-bootstrap"
import axios from "axios";
import InputAdd from "./InputAdd";
function AddProduct(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nom, setnom] = useState('');
    const [prixGros, setprixGros] = useState(0);
    const [prixDetail, setprixDetail] = useState(0);
    const [description, setdescription] = useState('');
    const [ref, setref] = useState('');
    const photo =''
    const [categorie, setcategorie] = useState('');
    const [image, setImage] = useState({ preview: '', data: '' })
    const [extension,setExtension]= useState('')
    const [listCategorie,setListCategorie] =useState([]);
    const [inputList, setInputList] = useState([{ key: "", value: "" }]);

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
      const attributs = inputList.filter(
          (item) => { return(item.key !== '' && item.value !== '') }    
           )
 
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let csrfToken = localStorage.getItem('csrfToken');
       

        axios.post(process.env.REACT_APP_API_AddProduct,{nom,prixGros,prixDetail,description,ref,photo,categorie,attributs}, { headers: {
          'Authorization':  csrfToken
        },withCredentials: true    })
          .then(async (response) => {
           
               //photo uplaod
                  let formData = new FormData()
                  formData.set('file', image.data,response.data+'.'+extension);
                  const filename=response.data+'.'+extension;
                  const id =response.data
               await axios({
                  method: 'post',
                  url: process.env.REACT_APP_API_SAVE_IMAGE,
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data','Authorization':  csrfToken },withCredentials: true}
              }).then(async(response)=>{
                //update data base column photo
                axios.post(process.env.REACT_APP_API_UPDATE_IMAGE,{id,filename}, { headers: {
                  'Authorization':  csrfToken
                },withCredentials: true    }).then((response)=>{
                 window.location.href='/produits'
                })


              })
           
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

      const getCategories  = async ()=>{

        let csrfToken = localStorage.getItem('csrfToken');
              await axios.get(process.env.REACT_APP_API_listCategorie, { headers: {'Authorization':  csrfToken},withCredentials: true    })
        .then((response) => {
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
          Ajouter un produit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3'>
                
                <Row className=" forms-limiter" >
           
                
                <Form.Label style={{color:'red'}}> {erreur?erreur:null} </Form.Label>

                <Form.Group  as={Row} className='forms-group 'controlId="nom">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangeNom} required  max={14} type="text" placeholder="Nom" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer le nom du produit</Form.Control.Feedback>
                            </Col>
                </Form.Group>
                
                <Form.Group  as={Row} className='forms-group 'controlId="prixGros">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangePrixGros} required  type="number" step="any" placeholder="Prix de gros" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un prix de gros valide</Form.Control.Feedback>
                            </Col>
                </Form.Group>
                <Form.Group  as={Row} className='forms-group 'controlId="prixDetail">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangePrixDetail} required  type="number" step="any" placeholder="Prix de détail " className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un prix de détail valide </Form.Control.Feedback>
                            </Col>
                </Form.Group>
                <Form.Group  as={Row} className='forms-group 'controlId="ref">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangeRef} required type="text" placeholder="Référence" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer la référence </Form.Control.Feedback>
                            </Col>
                </Form.Group>
                <Form.Group  as={Row} className='forms-group 'controlId="Description">
                            <Form.Label  column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Control   onChange={handleChangeDescription} required  type="textarea" placeholder="Description" className='forms-control py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer une description pour ce produit</Form.Control.Feedback>
                            </Col>
                </Form.Group>


                <Form.Group  as={Row} className='forms-group ' controlId="categorie">
                            <Form.Label   column sm={2}  className='bi bi-person  forms-label '></Form.Label>
                            <Col>
                            <Form.Select aria-label="Default select example" onChange={handleChangeCategorie} required>
                                <option></option>
                               
                                {
                                  listCategorie.map((row)=>{return( <option key={row.id} value={row.nom}>{row.nom}</option>)})
                                }
                            </Form.Select>
                                                        </Col>
                </Form.Group>
                <Form.Group  as={Row} className='forms-group 'controlId="photo">
                {image.preview && <img alt ='produit' src={image.preview} width='10' height='100'  />}
                            <Col>
                            <Form.Control   type='file' name='file' onChange={handleFileChange}/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer une description pour ce produit</Form.Control.Feedback>
                            </Col>
                </Form.Group>

                <InputAdd list={(l)=>setInputList(l)}></InputAdd>

        
    
                </Row>
                <Button  type="submit"  className='btn'>Ajouter </Button>
                <button onClick={props.onHide}  className='bna btn'> Annuler</button>
  </Form>
         
      
        </Modal.Body>
      
      </Modal>
        );
}
export default AddProduct