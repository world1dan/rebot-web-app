import './style.scss'

const Loading = (props) => {
    return (
        <div className="Loading" style={props.styles}>
            <div className="loader"></div>
        </div>
    )
}

export default Loading
