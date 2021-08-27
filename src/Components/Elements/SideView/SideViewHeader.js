import React from 'react';
import PropTypes from 'prop-types';


function SideViewHeader(props) {
    return (
        <div className="side-view-header">
            <div className="title">{ props.title }</div>
            <button className="close" onClick={props.onClose}><i className={"fas fa-chevron-" + props.side}></i></button>
        </div>
    )
}



export default SideViewHeader;