import React from "react"
import PropTypes from "prop-types"


import "./style.scss"
const TableList = (props) => {

    const rows = props.listItems.map((item, key) => {
        return (
            <div className="row">
                <div className="row-title">{ item.title }</div>
                <div className="row-content">{ item.content }</div>
            </div>

        )
    })

    return (
        <div className="_TableList">
            { rows }
        </div>
    )
}

export default TableList