import React from 'react';

import "./style.css";



const LoadingAnimation = () => {

    return (
        <div className="panel-loading">
            <div className="ispinner ispinner-large">
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
                <div className="ispinner-blade"></div>
            </div>
        </div>
    )
}

export default LoadingAnimation;