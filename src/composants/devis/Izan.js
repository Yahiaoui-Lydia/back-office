import React from 'react'


function Izan(props) {



    return (
        <tr >
        {props.tab.map((element)=>{return( 
    <>
            
            <td>{element.nom}</td>
            <td>{element.prix}</td>
            <td>{element.ref}</td>
            <td>{element.quantity}</td>
        
            </>
                  
             
           )})}
           </tr>
    )
}

export default Izan