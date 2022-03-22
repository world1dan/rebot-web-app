import PropTypes from 'prop-types'

const DownloadSquare = (props) => {
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox="0 0 16 19"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C8.49706 0 8.9 0.402943 8.9 0.9V11.8272L13.4636 7.26361C13.8151 6.91214 14.3849 6.91214 14.7364 7.26361C15.0879 7.61508 15.0879 8.18493 14.7364 8.5364L8.6364 14.6364C8.28492 14.9879 7.71508 14.9879 7.3636 14.6364L1.26361 8.5364C0.912138 8.18493 0.912138 7.61508 1.26361 7.26361C1.61508 6.91214 2.18493 6.91214 2.5364 7.26361L7.1 11.8272V0.9C7.1 0.402943 7.50294 0 8 0ZM0 18C0 17.5029 0.402944 17.1 0.9 17.1H15.1C15.5971 17.1 16 17.5029 16 18C16 18.4971 15.5971 18.9 15.1 18.9H0.9C0.402944 18.9 0 18.4971 0 18Z"
            />
        </svg>
    )
}

DownloadSquare.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default DownloadSquare
