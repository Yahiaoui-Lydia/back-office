import React,{useEffect,useState,useCallback} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';   
import DataTable from "react-data-table-component";
import DeleteDevis from "../composants/devis/DeleteDevis"
import ShowDevis from "../composants/devis/ShowDevis"
import {FaExpandArrowsAlt,FaRegCheckSquare,FaRegWindowClose} from 'react-icons/fa'
const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));
const paginationOptions = {

	rowsPerPageText: 'Nombre de lignes par page',

	rangeSeparatorText: 'de',

	selectAllRowsItem: true,

	selectAllRowsItemText: 'toutes',

};
function GestionDevis() {
    const [listDevis,setlistDevis] =useState([]);
    const [erreur,setErreur]=useState('')
    const [date,setdate]=useState('')
    const [pending, setPending] =useState(true);
    const [search, setSearch] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [AlertDelete, setAlertDelete] = React.useState(false);
    const [AlertDetail, setAlertDetail] = React.useState(false);
    const [AlertValider, setAlertValider] = React.useState(false);
    const[elements,setelements]=useState([])
    const[client,setclient]=useState([])
    const handleRowSelected = React.useCallback(state => {
  
          setSelectedRows(state.selectedRows);
  
      }, []);
      const handleSearch = (event) => {setSearch(event.target.value);};

      const contextActions =  <button key="delete" className='bi bi-trash3 text-white btn' onClick={()=>setAlertDelete(true)} style={{ backgroundColor: 'red' }} > Rejeter </button>  ;
    
      const actions = <div style={{'width':'100%'} }><label htmlFor="search" className='bi bi-search '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='Rechercher un devis' /></div>; 
      
      
    const columns = [
      {
        name: "Devis numero",
        selector: (row) => row.id,
        sortable: true
        },
        {
          name: "Numero client",
          selector: (row) => row.idUser,
          sortable: true
          },
      
      {
        name: "Valide jusqu'au",
        selector: (row) => row.date,
             
       
        },
    {
          name: "Action",
          cell: (row) => <div> 
              <FaExpandArrowsAlt style={{color:'green',fontSize:'22px',}} onClick={()=>handleButtonShowMore(row)}/>
              <FaRegCheckSquare style={{color:'blue',fontSize:'23px'}} onClick={()=>handleButtonvalidate(row)}/>
             
              <FaRegWindowClose style={{color:'red',fontSize:'22px'}} onClick={()=>handleButtonDelete(row)}/>
    
              </div>,
      
        },
      ];
      const handleButtonShowMore = async(row) => {
      //   const tab=[]
      //   tab.push(row)
      //  setSelectedRows(tab)
      
       setdate(row.date)
      var csrfToken = localStorage.getItem('csrfToken');
      await axios.get(process.env.REACT_APP_API_GetClient+row.idUser, { headers: {'Authorization':  csrfToken},withCredentials: true})
            .then( (response)=>{
                  response.data.map((user)=>{
                    var tab=[]
                    if(user.role==='B2B'){
                      var t ={"nom":user.nom_entreprise,"role":'B2B'}
                      
                      tab.push(t)
                    
                      setclient(tab)
                   
                      
                    }else{
                      var t ={"nom":user.nom,"prenom":user.email,'role':'B2B'}
                      tab.push(t)
                      setclient(tab)
                      
                    }
                  })
                  
                }
            )
        await axios.get(process.env.REACT_APP_API_DevisElements+row.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
      .then((response)=>{
        response.data.map(async(e)=>{
          setelements([])
          console.log(elements)
            await axios.get(process.env.REACT_APP_API_Product+e.idProduit , { headers: {'Authorization':  csrfToken},withCredentials: true    })
            .then((response)=>{
            
              
                response.data.map(async (p)=>{
               
             var tab =elements
             
                
                   
                   console.log(tab)
                   const index = elements.findIndex(object => object.nom===p.nom);
                   if (index === -1) {
                     tab.push({"nom":p.nom,"ref":p.ref,'quantity':e.quantity,"prix":p.prixGros})
                     setelements(tab)
                   
                   }
                 
              
                })

            })
        })
      }
       
      )
      setAlertDetail(true)
      
        
        };
  const handleButtonDelete = (row) => {
    const tab=[]
    tab.push(row)
   setSelectedRows(tab)
   setAlertDelete(true) 
    
    };
    const handleButtonvalidate= (row) => {
        const tab=[]
        tab.push(row)
       setSelectedRows(tab)
       setAlertValider(true)
      
        
        };
        const getdevis = useCallback(async () => {
         
            var csrfToken = localStorage.getItem('csrfToken');
                  await axios.get(process.env.REACT_APP_API_Devis, { headers: {'Authorization':  csrfToken},withCredentials: true    })
            .then((response) => {
            setlistDevis(response.data) 
              setPending(false);
        
          
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
       
         
          }, []) 
          useEffect(() => {
  
            getdevis()
          }, [getdevis])
    return (
        <div className="main">
          <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
         
          <DeleteDevis
            show={AlertDelete}
            onHide={() => setAlertDelete(false)}
            rows={selectedRows}
          />
       
           <ShowDevis
           
            show={AlertDetail}
            onHide={() => setAlertDetail(false)}
            selectedrow={selectedRows}
            el={elements}
            date={date }
            client={client}
            
          />
          
            <DataTable
                        columns={columns}
                        title=" "
                        data={listDevis}
                        defaultSortField="id"
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                        selectableRows
                        selectableRowsComponent={BootyCheckbox}
                        responsive='true'
                        highlightOnHover
                        fixedHeader
                            fixedHeaderScrollHeight="400px"
                        progressPending={pending}
                        contextActions={contextActions}
                        actions={actions}
                              onSelectedRowsChange={handleRowSelected}
                     
    
            
            />
        
        </div>
      );
}
export default GestionDevis