import React from 'react';
import PropTypes from 'prop-types';


function PanelHeader(props) {
    return (
        <div className="panel-header">
            { props.backButton && 
                <button onClick={props.onBack}>
                    <i className={"fas fa-chevron-left"}></i>
                </button>
            }
            <div className="title">{ props.title }</div>
        </div>
    );
}

PanelHeader.propTypes = {
    backButton: PropTypes.bool,
    onBack: PropTypes.func,
    title: PropTypes.string
}

export default PanelHeader;