import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';

import Panel from '../Elements/Panel'
import PanelHeader from '../Elements/Panel/PanelHeader'


export default function NotebookViewer(props) {
    const view = useRef(null);
    const loader = useRef(null);
    
    useEffect(() => {
        if (props.currentPanel == props.id) {
            setTimeout(() => {
                loader.current.style.display = "none";
                view.current.style.display = "block";
            }, 450)
        }
    }, [props.currentPanel, props.id]);


    return (
        <Panel currentPanel={props.currentPanel} id={props.id}>
            <PanelHeader 
                title={props.title}
                backButton={true}
                onBack={() => props.setCurrentPanel("main")}
            />

            <div className="notebook-loader" ref={loader}>
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>

            <iframe 
                ref={view}
                style={{display: "none"}}
                frameBorder="0" 
                src={props.url}
                className="notebook-iframe"
                sandbox={props.scripts ? "allow-same-origin allow-scripts" : "allow-same-origin"}
                
            />

        </Panel>
    )
}

