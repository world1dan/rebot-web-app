import './style.scss'

const Wraper = (props) => {
    return <div className={'tab-wraper ' + (props.className ?? '')}>{props.children}</div>
}

export default Wraper
