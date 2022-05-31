import React,{useEffect,useState,useCallback} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';   
import DataTable from "react-data-table-component";
import DeleteDevis from "../composants/devis/DeleteDevis"
import DetailDevis from "../composants/devis/DetailDevis"
// import ValiderDevis from "../composants/devis/ValiderDevis"
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
  const [pending, setPending] =useState(true);
  const [search, setSearch] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [AlertDelete, setAlertDelete] = React.useState(false);
  const [AlertDetail, setAlertDetail] = React.useState(false);
  const [AlertValider, setAlertValider] = React.useState(false);
  const [l, setl] = React.useState([]);
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
      selector: (row) => row.nom,
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
  const handleButtonShowMore = (row) => {
        const tab=[]
        tab.push(row)
       setSelectedRows(tab)
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
        const getclient= useCallback(async(id,iduser,datedev)=>{
          var thisDate = new Date(datedev);
          var date = (thisDate.getUTCDate())+ "/" + (thisDate.getMonth() + 1)+ "/" + (thisDate.getUTCFullYear()) ;
        
         
          var csrfToken = localStorage.getItem('csrfToken');
            await axios.get(process.env.REACT_APP_API_GetClient+iduser, { headers: {'Authorization':  csrfToken},withCredentials: true})
            .then( (response)=>{
              
                  response.data.map((user)=>{
                  
                    var tab=l
                    if(user.role==='B2B'){
                      var t ={"id":id,"nom":user.nom_entreprise,"date":date}
                      
                      tab.push(t)
                    
                      setlistDevis(tab)
                   
                      
                    }else{
                      var t ={"id":id,"nom":user.nom,"prenom":user.email,"date":date}
                      tab.push(t)
                      setlistDevis(tab)
                      
                    }
                  })
                  
                }
            )
            
        }, [])
        const getdevis = useCallback(async () => {
         
          var csrfToken = localStorage.getItem('csrfToken');
                await axios.get(process.env.REACT_APP_API_Devis, { headers: {'Authorization':  csrfToken},withCredentials: true    })
          .then((response) => {
          
                  response.data.map(async(element)=>{
             
       await getclient(element.id,element.idUser,element.date)
      
                  })

                
                 
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
     
   console.log(listDevis)          
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
      {/* <ValiderDevis
        show={AlertValider}
        onHide={() => setAlertValider(false)}
        rows={listDevis}
      
      /> */}
       <DetailDevis
       
        show={AlertDetail}
        onHide={() => setAlertDetail(false)}
        selectedrow={selectedRows}
        
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