import React from 'react'
import PropTypes from 'prop-types'

const Search = (props) => {
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox="0 0 22 22"
            fill="currentColor"
        >
            <path d="M9 0C13.9706 0 18 4.02944 18 9C18 10.9888 17.3549 12.827 16.2625 14.3167L20.9723 19.0277C21.5092 19.5647 21.5092 20.4353 20.9723 20.9723C20.4353 21.5092 19.5647 21.5092 19.0277 20.9723L14.3167 16.2625C12.827 17.3549 10.9888 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM9 2.75C5.54822 2.75 2.75 5.54822 2.75 9C2.75 12.4518 5.54822 15.25 9 15.25C12.4518 15.25 15.25 12.4518 15.25 9C15.25 5.54822 12.4518 2.75 9 2.75Z" />
        </svg>
    )
}

Search.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default Search
