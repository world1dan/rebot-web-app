import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Panel from '../Elements/Panel'
import PanelHeader from '../Elements/Panel/PanelHeader'
import Button from '../Elements/Panel/Button'

import NotebookViewer from './NotebookViewer'

import './style.scss'


function Notebooks(props) {

    const [currentPanel, setCurrentPanel] = useState("main");

    return (
        <>
        <Panel currentPanel={currentPanel} id="main">
            <PanelHeader title="Лабораторные" icon={<i className="fas fa-flask"></i>}/>
            <Button 
                title="Лабораторные"
                descr="По физике и химии"
                onClick={() => setCurrentPanel("labs")}
                icon={<i className="fas fa-flask"></i>}
            />
        </Panel>

        <NotebookViewer
            id="labs"
            setCurrentPanel={setCurrentPanel}
            currentPanel={currentPanel}
            url="https://example.com/"
            title="ААА"
        />

    
        </>
    )
}


Notebooks.propTypes = {

}

export default Notebooks;
