const Notebook = ({ notebook }) => {
    return (
        <a className="Notebook" href={notebook.url} target="_blank">
            <img src={notebook.coverUrl}></img>
        </a>
    )
}

export default Notebook
