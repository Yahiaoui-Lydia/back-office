import React, { useState,useEffect } from "react";

import axios from "axios";

function InputUpdate(props) {
  const [inputList, setInputList] = useState([{ key: "", value: "" }]);


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    props.list(inputList)
  };

  
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    props.list(inputList)
  };

  
  const handleAddClick = () => {
    setInputList([...inputList, { key: "", value: "" }]);
    props.list(inputList)
  };
  
  useEffect( ()=>{
    
        
    const getAttributs  = ()=>{
      props.selectedP.map(async(p)=>{
        let csrfToken = localStorage.getItem('csrfToken');
  
        await axios.get(process.env.REACT_APP_API_listProductAtt+p.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
      .then((response) => {
        const tab= []
   
        response.data.map((r)=>{
          return(  tab.push({key:r.key,value:r.value}))
      
       
        })
    setInputList(tab);
          props.list(tab)
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
          // setErreur('La connexion a échoué veuillez réessayer')
        }
      })
      })
 
   }
   ;getAttributs();}
  ,[inputList] )
 
  return (
      <>
    <div className="overflow-auto"  style={{height:'200px'}} >
      {inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
            <input
              name="key"
              placeholder="caracterestique"
              value={x.key}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="value"
              placeholder="sa valeur"
              value={x.value}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
  
    </div>
    </>
  );
}

export default InputUpdate;