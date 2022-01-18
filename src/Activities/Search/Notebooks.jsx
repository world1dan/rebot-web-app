import React from "react"

import NotebookItem from "./NotebookItem"

import "./style.scss"


const notebooks = [
    {
        id: 'engwb',
        url: 'https://megaresheba.ru/publ/reshebnik/anglijskij/otvety_k_english_workbook_9_klass_lapickaja/42-1-0-1202',
        coverUrl: './static/img/engwb.jpg',
    },
    {
        id: 'phis',
        url: 'https://superresheba.by/9-physics-wbook_25',
        coverUrl: './static/img/phis.jpg',
    },
    {
        id: 'bio',
        url: 'https://superresheba.by/9-biology-wbook_24',
        coverUrl: './static/img/bio.jpg',
    },
    {
        id: 'him',
        url: 'https://superresheba.by/9-chemistry-wbook_147',
        coverUrl: './static/img/him.jpg',
    },
    {
        id: 'geo',
        url: 'https://superresheba.by/10-geography-wbook_6',
        coverUrl: './static/img/geo.jpg',
    },
]


const Notebooks = () => {

    return (
        <div className="NotebooksWrapper">
            <div className="Notebooks">
                { notebooks.map((notebook) => {
                    return ( 
                        <NotebookItem
                            notebook={notebook}
                            key={notebook.id}
                        /> 
                    )
                })}
            </div>
        </div>
    )
}


export default Notebooks