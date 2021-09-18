import React from 'react'


function Notebook(props) {
  return (
     <div className="notebook" onClick={props.onClick}>
         <img src={props.img}></img>
     </div>
  )
}



export default Notebook;
