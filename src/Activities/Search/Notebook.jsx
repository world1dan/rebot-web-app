const Notebook = ({ notebook }) => {
    return (
        <a className="Notebook" href={notebook.url} target="_blank">
            <img src={notebook.coverUrl} height="100%"></img>
        </a>
    )
}

export default Notebook
