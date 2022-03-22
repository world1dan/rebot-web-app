import PropTypes from 'prop-types'

import "./style.scss"


const Loading = (props) => {
    return (
        <div className='Loading' style={props.styles}>
            <div className='loader'></div>
        </div>
    )
}



Loading.propTypes = {
    styles: PropTypes.object
}


export default Loading
