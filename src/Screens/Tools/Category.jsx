import React from 'react'
import PropTypes from "prop-types"


const Category = (props) => {
    return (
        <div className="Category">
            <h2 className="Category-title">{ props.title }</h2>
            { props.children }
        </div>
    )
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default Category