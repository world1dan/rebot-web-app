import React from 'react';
import PropTypes from 'prop-types';


function PanelHeader(props) {
    return (
        <div className="panel-header">
            { 
                props.backButton && 
                <button onClick={props.onBack}>
                    <i className={"fas fa-chevron-left"}></i>
                </button>
            }
            {
                props.icon &&
                <div className="panel-header-icon">
                    { props.icon }
                </div>
            }
            <div className="title">{ props.title }</div>
        </div>
    );
}

PanelHeader.propTypes = {
    backButton: PropTypes.bool,
    onBack: PropTypes.func,
    title: PropTypes.string,
    icon: PropTypes.element
}

export default PanelHeader;