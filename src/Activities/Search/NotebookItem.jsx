import React from "react"


const NotebookItem = ({ notebook }) => {
    return (
        <div className="Notebook" onClick={() => window.open(notebook.url, "_blank")}>
            <img src={notebook.coverUrl}></img>
        </div>
    )
}



export default NotebookItem
