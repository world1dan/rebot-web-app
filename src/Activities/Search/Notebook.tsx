import { css } from '@linaria/core'
import { FC } from 'react'

export interface INotebook {
    id: string
    url: string
    coverUrl: string
}

const stlyes = css`
    background: var(--bg4);
    border-radius: 5px;

    padding: 6px;
    width: 86px;

    img {
        border-radius: 3px;
        height: 110px;
        width: 100%;
    }
`

export interface INotebookProps {
    notebook: INotebook
}

const Notebook: FC<INotebookProps> = ({ notebook }) => {
    return (
        <a className={stlyes} href={notebook.url} target="_blank" rel="noreferrer">
            <img src={notebook.coverUrl} height="100%" />
        </a>
    )
}

export default Notebook
