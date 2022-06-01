// import React, { useEffect, useState } from 'react'
//  import {Modal}from "react-bootstrap"
// import axios from "axios";
//  function VoirPlus(props){
//      const[attributs,setattributs]=useState([])
//      useEffect(()=>{
//         props.selectedrow.map(async(p)=>{
//             let csrfToken = localStorage.getItem('csrfToken');
      
//             await axios.get(process.env.REACT_APP_API_listProductAtt+p.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
//           .then((response)=>{
//             setattributs(response.data)
//           }
           
//           )})
//      })
//     return (
        
//         <Modal
//        {...props}
      
//        aria-labelledby="contained-modal-title-vcenter"
//        centered
//      >
//          {props.selectedrow.map((row)=>{return( 
//              <>
//        <Modal.Header closeButton>
//          <Modal.Title id="contained-modal-title-vcenter" >
//          Informations sur {row.nom} 
//          </Modal.Title>
//        </Modal.Header>
         
//        <Modal.Body>
//        <img style={{width:'200px',height:'200px',borderRadius:'50%'}} alt={row.nom} src={process.env.REACT_APP_API_GET_IMAGE + row.photo}  />
//        {attributs.map((att)=>{return <>{att.key}  {att.value}</>})}
//        </Modal.Body></>
//     )})}
//      </Modal>
//        );
//  }
//  export default VoirPlus


//  // ges
//  import React,{useEffect,useState,useCallback} from 'react'
// import "bootstrap/dist/js/bootstrap.bundle.js";
// import "bootstrap/dist/css/bootstrap.css";
// import axios from 'axios';   
// import DataTable from "react-data-table-component";
// import DeleteDevis from "../composants/devis/DeleteDevis"
// import ShowDevis from "../composants/devis/ShowDevis"
// import {FaExpandArrowsAlt,FaRegCheckSquare,FaRegWindowClose} from 'react-icons/fa'
// const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
//   <div className="form-check">
//     <input
//       htmlFor="booty-check"
//       type="checkbox"
//       className="form-check-input"
//       ref={ref}
//       onClick={onClick}
//       {...rest}
//     />
//     <label className="form-check-label" id="booty-check" />
//   </div>
// ));
// const paginationOptions = {

// 	rowsPerPageText: 'Nombre de lignes par page',

// 	rangeSeparatorText: 'de',

// 	selectAllRowsItem: true,

// 	selectAllRowsItemText: 'toutes',

// };
// function GestionDevis() {
//     const [listDevis,setlistDevis] =useState([]);
//     const [erreur,setErreur]=useState('')
//     const [pending, setPending] =useState(true);
//     const [search, setSearch] = React.useState('');
//     const [selectedRows, setSelectedRows] = React.useState([]);
//     const [AlertDelete, setAlertDelete] = React.useState(false);
//     const [AlertDetail, setAlertDetail] = React.useState(false);
//     const [AlertValider, setAlertValider] = React.useState(false);
//     const handleRowSelected = React.useCallback(state => {
  
//           setSelectedRows(state.selectedRows);
  
//       }, []);
//       const handleSearch = (event) => {setSearch(event.target.value);};

//       const contextActions =  <button key="delete" className='bi bi-trash3 text-white btn' onClick={()=>setAlertDelete(true)} style={{ backgroundColor: 'red' }} > Rejeter </button>  ;
    
//       const actions = <div style={{'width':'100%'} }><label htmlFor="search" className='bi bi-search '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='Rechercher un devis' /></div>; 
      
      
//     const columns = [
//       {
//         name: "Devis numero",
//         selector: (row) => row.id,
//         sortable: true
//         },
//         {
//           name: "Numero client",
//           selector: (row) => row.idUser,
//           sortable: true
//           },
      
//       {
//         name: "Valide jusqu'au",
//         selector: (row) => row.date,
             
       
//         },
//     {
//           name: "Action",
//           cell: (row) => <div> 
//               <FaExpandArrowsAlt style={{color:'green',fontSize:'22px',}} onClick={()=>handleButtonShowMore(row)}/>
//               <FaRegCheckSquare style={{color:'blue',fontSize:'23px'}} onClick={()=>handleButtonvalidate(row)}/>
             
//               <FaRegWindowClose style={{color:'red',fontSize:'22px'}} onClick={()=>handleButtonDelete(row)}/>
    
//               </div>,
      
//         },
//       ];
//       const handleButtonShowMore = (row) => {
//         const tab=[]
//         tab.push(row)
//        setSelectedRows(tab)
//        setAlertDetail(true)
      
        
//         };
//   const handleButtonDelete = (row) => {
//     const tab=[]
//     tab.push(row)
//    setSelectedRows(tab)
//    setAlertDelete(true) 
    
//     };
//     const handleButtonvalidate= (row) => {
//         const tab=[]
//         tab.push(row)
//        setSelectedRows(tab)
//        setAlertValider(true)
      
        
//         };
//         const getdevis = useCallback(async () => {
         
//             var csrfToken = localStorage.getItem('csrfToken');
//                   await axios.get(process.env.REACT_APP_API_Devis, { headers: {'Authorization':  csrfToken},withCredentials: true    })
//             .then((response) => {
//             setlistDevis(response.data) 
//               setPending(false);
        
          
//           })
//           .catch((error) => {
             
//               if (error.response) {
//                 // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
//                   if(error.response.status === 401){
//                     localStorage.setItem('role','')
//                     window.location.href='/login'
                  
//                   }
//               } else if (error.request) {
//                 // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
//                 setErreur('La connexion a échoué veuillez réessayer')
//               }
//             })
       
         
//           }, []) 
//           useEffect(() => {
  
//             getdevis()
//           }, [getdevis])
//     return (
//         <div className="main">
//           <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
         
//           <DeleteDevis
//             show={AlertDelete}
//             onHide={() => setAlertDelete(false)}
//             rows={selectedRows}
//           />
       
//            <ShowDevis
           
//             show={AlertDetail}
//             onHide={() => setAlertDetail(false)}
//             selectedrow={selectedRows}
            
//           />
          
//             <DataTable
//                         columns={columns}
//                         title=" "
//                         data={listDevis}
//                         defaultSortField="id"
//                         pagination
//                         paginationComponentOptions={paginationOptions}
//                         paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
//                         selectableRows
//                         selectableRowsComponent={BootyCheckbox}
//                         responsive='true'
//                         highlightOnHover
//                         fixedHeader
//                             fixedHeaderScrollHeight="400px"
//                         progressPending={pending}
//                         contextActions={contextActions}
//                         actions={actions}
//                               onSelectedRowsChange={handleRowSelected}
                     
    
            
//             />
        
//         </div>
//       );
// }
// export default GestionDevis
// //show 
// import React, { useEffect, useState,useCallback } from 'react'
//  import {Modal}from "react-bootstrap"
// import axios from "axios";
// function ShowDevis(props){
//     const[id,setId]=useState([])
//     const[elements,setelements]=useState([])
//     useEffect(()=>{
     
//        props.selectedrow.map(async(d)=>{
//            var csrfToken = localStorage.getItem('csrfToken');
     
//            await axios.get(process.env.REACT_APP_API_DevisElements+d.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
//          .then((response)=>{
//            response.data.map(async(e)=>{
    
//                await axios.get(process.env.REACT_APP_API_Product+e.idProduit , { headers: {'Authorization':  csrfToken},withCredentials: true    })
//                .then((response)=>{
//                 setelements([])
//                 console.log(elements)
                 
//                    response.data.map(async (p)=>{
                  
//                 var tab =elements
                
                   
                      
//                       console.log(tab)
//                       const index = elements.findIndex(object => object.nom===p.nom);
//                       if (index === -1) {
//                         tab.push({"nom":p.nom,"ref":p.ref,'quantity':e.quantity,"prix":p.prixGros})
//                         await setelements(tab)
                        
//                       console.log(tab)
//                       }
                    
                 
//                    })

//                })
//            })
//          }
          
//          )})
//     },[setelements, props.selectedrow])  
//     // const getproduit= useCallback(async(id,qt)=>{
//     //     var csrfToken = localStorage.getItem('csrfToken');
//     //     await axios.get(process.env.REACT_APP_API_Product+id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
//     //     .then((response)=>{
//     //         response.data.map((p)=>{
//     //          var tab =elements
//     //          tab.push({"nom":p.nom,'ref':p.ref,'quantity':qt})
//     //          setelements(tab)
//     //         })

//     //     })
//     // })
//     // const getdeviselement = useCallback(async () => {
//     //     props.selectedrow.map(async(d)=>{
//     //         var csrfToken = localStorage.getItem('csrfToken');
      
//     //         await axios.get(process.env.REACT_APP_API_DevisElements+d.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
//     //       .then((response)=>{

//     //         response.data.map(async(e)=>{
//     //         //  await getproduit(e.idProduit,e.quantity)
//     //          await axios.get(process.env.REACT_APP_API_Product+e.idProduit, { headers: {'Authorization':  csrfToken},withCredentials: true    })
//     //          .then((response)=>{
//     //            console.log(response.data)
//     //              response.data.map((p)=>{
//     //               console.log(p)
//     //               var tab =elements
//     //               var exist=elements.filter(
//     //                                   (item) => { return(item.nom===p.nom)})
                                      
//     //                if(exist){
//     //                 console.log(elements)
//     //             }else{
//     //               tab.push({"nom":p.nom,'ref':p.ref,'quantity':e.quantity})
//     //               setelements(tab)
//     //               console.log(elements)
//     //             }
//     //              })
     
//     //          })
//     //         })
//     //       }
           
//     //       )})
//     // }, [props.selectedrow]) 
//     // useEffect(() => {
      
//     //     getdeviselement()
//     //   }, [elements,getdeviselement])
  
//    return (
       
//        <Modal
//       {...props}
     
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
       
//         <Modal.Title id="contained-modal-title-vcenter" >
//         Information h
 
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//       <table>
//       <thead>
      
//   <tr>
  
//     <th>Produit</th>
//     <th>Prix</th>
//     <th>Reference</th>
//     <th>Quantité</th>
//   </tr>
//   </thead>
//   <tbody>
//         {elements.map((element)=>{return( 
    
//     <tr key={element.nom}>
//     <td>{element.nom}</td>
//     <td>{element.prix}</td>
//     <td>{element.ref}</td>
//     <td>{element.quantity}</td>

//   </tr>
          
     
//    )})}
//       </tbody>
//    </table>
//    </Modal.Body>
//     </Modal>
//       );
// }
// export default ShowDevis