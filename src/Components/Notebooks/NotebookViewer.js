import React, { useState } from 'react'

import Panel from '../Elements/Panel'
import PanelHeader from '../Elements/Panel/PanelHeader'


export default function NotebookViewer(props) {
    const [isFrameLoaded, setIsFrameLoaded] = useState(false);

    return (
        <Panel currentPanel={props.currentPanel} id={props.id}>
            <PanelHeader 
                title={props.title}
                backButton={true}
                onBack={() => props.setCurrentPanel("main")}
            />

            <iframe 
                style={ isFrameLoaded ? 
                    {} :
                    {display: "none"}}
                frameBorder="0" 
                src={props.url}
                className="notebook-iframe"
                onLoad={() => setIsFrameLoaded(true)}
            />

        </Panel>
    )
}

