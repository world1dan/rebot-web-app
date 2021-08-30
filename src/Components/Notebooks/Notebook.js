import React from 'react'
import PropTypes from 'prop-types'


function Notebook(props) {
  return (
     <div className="notebook" onClick={props.onClick}>
         <img src={props.img}></img>
     </div>
  )
};


Notebook.propTypes = {

}

export default Notebook;
