import React,{useEffect,useState} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import DataTable from "react-data-table-component";
import {OverlayTrigger,Tooltip} from 'react-bootstrap'
import Rejeter from '../composants/b2b/Rejeter';
import Validate from '../composants/b2b/Validate';


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


function GestionB2B() {
  const [listB2B,setlistB2B] =useState([]);
  const [erreur,setErreur]=useState('')
  const [pending, setPending] =useState(true);
  const [search, setSearch] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [Alert, setAlert] = React.useState(false);
  const [valid, setvalid] = React.useState(false);
  const handleRowSelected = React.useCallback(state => {

		setSelectedRows(state.selectedRows);

	}, []);

  const handleSearch = (event) => {setSearch(event.target.value);};

  const contextActions =  <button key="delete" className='bi bi-trash3 text-white btn' onClick={()=>setAlert(true)} style={{ backgroundColor: 'red' }} > Rejeter</button>  ;

  const actions = <div style={{'width':'100%','textAlign':'center'} }><label htmlFor="search" className='bi bi-search '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='Rechercher ' /></div>; 
  
  
const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true
    },
  {
  name: "Entreprise",
  selector: (row) => row.nom_entreprise,
  sortable: true
  },
  {
  name: "Numero SIRET",
  selector: (row) => row.SIRET,
  sortable: true,
 
  },
  {
  name: "Email",
  selector: (row) => row.email,
  sortable: true,
 
  },
  {
    name: "Action",
    cell: (row) => 
    <div>
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Valider ce compte</Tooltip>} >
    <button className="bi bi-person-check-fill" style={{'backgroundColor':'transparent','border':'none',color:'green',fontSize:'22px'}} onClick={()=>handleButtonValidate(row)}></button>
    </OverlayTrigger>
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Rejeter ce compte</Tooltip>} >
    <button className="bi bi-person-x-fill" style={{'backgroundColor':'transparent','border':'none',color:'red',fontSize:'22px'}} onClick={()=>handleButtonRejeter(row)}></button>
    </OverlayTrigger>
    </div>
  }
  ];
  
  const handleButtonValidate = (row) => {
    const tab=[]
    tab.push(row)
     setSelectedRows(tab)
     setvalid(true)
    
    };
    const handleButtonRejeter = (row) => {
      const tab=[]
      tab.push(row)
       setSelectedRows(tab)
       setAlert(true)
      
      };


  useEffect( ()=>{

      const getB2B = async ()=>{

        let csrfToken = localStorage.getItem('csrfToken');
              await axios.get(process.env.REACT_APP_API_ListeB2B, {withCredentials: true  , headers: {'Authorization':  csrfToken}  })
        .then((response) => {
          setlistB2B( response.data.filter(
              (item) => { return(item.email.toLowerCase().includes(search.toLowerCase())) }    
               )
          )
      
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
     }
     ;getB2B();}
    ,[search] )
   

  return (
    <div className="main">
      <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
     
      <Rejeter
        show={Alert}
        onHide={() => setAlert(false)}
        rows={selectedRows}
      
      />
      <Validate
        show={valid}
        onHide={() => setvalid(false)}
        rows={selectedRows}
      />
      
        <DataTable
                    columns={columns}
                    title=" "
                    data={listB2B}
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
                    contextMessage={{ singular: 'demande', plural: 'demandes', message: 'sélectionnée(s)'} }
                          noDataComponent="Aucun demande d'inscription n'est trouvée"

        
        />
    
    </div>
  );
}
export default GestionB2B