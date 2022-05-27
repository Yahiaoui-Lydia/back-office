import React,{useEffect,useState} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';   
import DataTable from "react-data-table-component";
import AddCategorie from '../composants/categories/AddCategorie'
import DeleteCategorie from '../composants/categories/DeleteCategorie';
import UpdateCategorie from '../composants/categories/UpdateCategorie';

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



function GestionCategories() {
  const [listCategorie,setListCategorie] =useState([]);
  const [erreur,setErreur]=useState('')
  const [pending, setPending] =useState(true);
  const [search, setSearch] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [AlertDelete, setAlertDelete] = React.useState(false);
  const [AlertAdd, setAlertAdd] = React.useState(false);
  const [AlertUpdate, setAlertUpdate] = React.useState(false);

  const handleRowSelected = React.useCallback(state => {

		setSelectedRows(state.selectedRows);

	}, []);

  const handleSearch = (event) => {setSearch(event.target.value);};

  const contextActions =  <button key="delete" className='bi bi-trash3 text-white btn' onClick={()=>setAlertDelete(true)} style={{ backgroundColor: 'red' }} > Supprimer</button>  ;

  const actions = <div style={{'width':'100%'} }><label htmlFor="search" className='bi bi-search '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='catégorie, catégorie parente' /><button key="add"  onClick={()=> setAlertAdd(true)}  className='bi bi-person-plus' style={{'marginLeft':'0%' ,'backgroundColor':'transparent','border':'none'}} > Ajouter</button></div>; 
  
  
const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true
    },
  {
  name: "Catégorie",
  selector: (row) => row.nom,
  sortable: true
  },
  {
  name: "Catégorie Parente",
  selector: (row) => row.parent,

 
  },
  {
    name: "Action",
    cell: (row) => <button className="bi bi-trash3" style={{'backgroundColor':'transparent','border':'none',color:'red',fontSize:'22px'}} onClick={()=>handleButtonDelete(row)}></button>,

  },
  {
    name:'Modifier',
    cell: (row) => <button className="bi bi-pencil-square" style={{'backgroundColor':'transparent','border':'none',color:'blue',fontSize:'22px'}} onClick={()=>handleButtonUpdate(row)}></button>

  }
  ];
  
  const handleButtonDelete = (row) => {
    const tab=[]
    tab.push(row)
   setSelectedRows(tab)
   setAlertDelete(true) 
    
    };
    const handleButtonUpdate= (row) => {
        const tab=[]
        tab.push(row)
       setSelectedRows(tab)
       setAlertUpdate(true)
        
        };


  useEffect( ()=>{

      const getCategories  = async ()=>{

        let csrfToken = localStorage.getItem('csrfToken');
              await axios.get(process.env.REACT_APP_API_listCategorie, { headers: {'Authorization':  csrfToken},withCredentials: true    })
        .then((response) => {
          setListCategorie( response.data.filter(
              (item) => { return(item.nom.toLowerCase().includes(search.toLowerCase())) }    
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
     ;getCategories();}
    ,[search] )
   

  return (
    <div className="main">
      <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
     
      <DeleteCategorie
        show={AlertDelete}
        onHide={() => setAlertDelete(false)}
        rows={selectedRows}
      />
      <AddCategorie
        show={AlertAdd}
        onHide={() => setAlertAdd(false)}
        rows={listCategorie}
      
      />
       <UpdateCategorie
        show={AlertUpdate}
        onHide={() => setAlertUpdate(false)}
        rows={listCategorie}
        selectedrow={selectedRows}
      />
      
        <DataTable
                    columns={columns}
                    title=" "
                    data={listCategorie}
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
export default GestionCategories

