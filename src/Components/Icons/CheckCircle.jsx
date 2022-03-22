import PropTypes from 'prop-types'

const CheckCircle = (props) => {
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.29 8.29C16.6805 7.89948 17.3195 7.89948 17.71 8.29C18.1005 8.68052 18.1005 9.31948 17.71 9.71L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L5.79289 13.2071C5.40237 12.8166 5.40237 12.1834 5.79289 11.7929C6.18342 11.4024 6.81658 11.4024 7.20711 11.7929L10 14.5858L16.29 8.29Z" />
        </svg>
    )
}
CheckCircle.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default CheckCircle
