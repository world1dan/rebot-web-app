import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Panel from '../Elements/Panel'
import PanelHeader from '../Elements/Panel/PanelHeader'
import Button from '../Elements/Panel/Button'

import Notebook from './Notebook'
import NotebookViewer from './NotebookViewer'

import './style.scss'


function Notebooks(props) {

    const [currentPanel, setCurrentPanel] = useState("main");

    return (
        <>
        <Panel currentPanel={currentPanel} id="main">
            <PanelHeader title="Лабораторные / Практические" icon={<i className="fas fa-flask"></i>}/>
            <div className="notebooks-grid">
                <Notebook 
                    title="Физика"
                    onClick={() => setCurrentPanel("phis")}
                    img="./static/img/phis.jpg"
                />
                <Notebook 
                    title="Биология"
                    onClick={() => setCurrentPanel("bio")}
                    img="./static/img/bio.jpg"
                />
                <Notebook 
                    title="Химия"
                    onClick={() => setCurrentPanel("him")}
                    img="./static/img/him.jpg"
                />
            </div>

            <PanelHeader title="Рабочие" icon={<i className="fas fa-flask"></i>}/>
            <div className="notebooks-grid">
                <Notebook 
                    title="Английский"
                    onClick={() => setCurrentPanel("labs")}
                    img="./static/img/demo.jpg"
                />
            </div>
        </Panel>

        <NotebookViewer
            id="phis"
            setCurrentPanel={setCurrentPanel}
            currentPanel={currentPanel}
            url="https://megaresheba.ru/publ/reshebnik/anglijskij/otvety_k_english_workbook_9_klass_lapickaja/42-1-0-1202"
            title="ААА"
        />

        <NotebookViewer
            id="bio"
            setCurrentPanel={setCurrentPanel}
            currentPanel={currentPanel}
            url="https://megaresheba.ru/publ/reshebnik/anglijskij/otvety_k_english_workbook_9_klass_lapickaja/42-1-0-1202"
            title="ААА"
        />

        <NotebookViewer
            id="him"
            setCurrentPanel={setCurrentPanel}
            currentPanel={currentPanel}
            url="https://megaresheba.ru/publ/reshebnik/anglijskij/otvety_k_english_workbook_9_klass_lapickaja/42-1-0-1202"
            title="ААА"
        />

    
        </>
    )
}


Notebooks.propTypes = {

}

export default Notebooks;
