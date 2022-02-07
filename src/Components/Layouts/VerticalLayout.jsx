import './style.scss'

const VerticalLayout = ({ children, noPadding }) => {
    return (
        <div className={'_VerticalLayout' + (noPadding ? ' noPadding' : '')}>
            {children}
        </div>
    )
}

export default VerticalLayout
