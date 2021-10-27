import React, { useState } from "react"

import Panel from "../../Components/Panel"
import Notebook from "./Notebook"
import NotebookViewer from "./NotebookViewer"

import "./style.scss"


function Notebooks() {

    const [currentPanel, setCurrentPanel] = useState("main")

    return (
        <>
            <Panel currentPanel={currentPanel} id="main">
                <div className="notebooks-grid">
                    <Notebook 
                        onClick={() => setCurrentPanel("phis")}
                        img="./static/img/phis.webp"
                    />
                    <Notebook 
                        onClick={() => setCurrentPanel("bio")}
                        img="./static/img/bio.webp"
                    />
                    <Notebook 
                        onClick={() => setCurrentPanel("him")}
                        img="./static/img/him.webp"
                    />
                    <Notebook 
                        onClick={() => setCurrentPanel("eng")}
                        img="./static/img/engwb.webp"
                    />
                    <Notebook 
                        onClick={() => setCurrentPanel("geo")}
                        img="./static/img/geo.webp"
                    />
                </div>
            </Panel>

            <NotebookViewer
                id="phis"
                setCurrentPanel={setCurrentPanel}
                currentPanel={currentPanel}
                url="https://superresheba.by/9-physics-wbook_25"
                title="Физика"
                scripts={true}
            />

            <NotebookViewer
                id="bio"
                setCurrentPanel={setCurrentPanel}
                currentPanel={currentPanel}
                url="https://superresheba.by/9-biology-wbook_24"
                title="Биология"
            />

            <NotebookViewer
                id="him"
                setCurrentPanel={setCurrentPanel}
                currentPanel={currentPanel}
                url="https://superresheba.by/9-chemistry-wbook_147"
                title="Химия"
            />

            <NotebookViewer
                id="eng"
                setCurrentPanel={setCurrentPanel}
                currentPanel={currentPanel}
                url="https://megaresheba.ru/publ/reshebnik/anglijskij/otvety_k_english_workbook_9_klass_lapickaja/42-1-0-1202"
                title="Английский WB"
            />

            <NotebookViewer
                id="geo"
                setCurrentPanel={setCurrentPanel}
                currentPanel={currentPanel}
                url="https://superresheba.by/10-geography-wbook_6"
                title="География"
            />
        </>
    )
}


export default Notebooks
