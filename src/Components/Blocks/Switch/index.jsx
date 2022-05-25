import './style.scss'

const Switch = ({ title, icon, descr, checked, onChange, noPadding }) => {
    return (
        <div className={'_Switch' + (noPadding ? ' noPadding' : '')}>
            <div className="icon"> {icon}</div>
            <div className="label-block">
                <a className="title">{title}</a>
                <a className="descr">{descr}</a>
            </div>
            <label className="ios7-switch">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span></span>
            </label>
        </div>
    )
}

export default Switch
