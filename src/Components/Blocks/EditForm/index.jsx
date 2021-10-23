import React, { useState } from "react"
import PropTypes from "prop-types"
import EditableField from "../../EditableField"

import "./style.scss"



const EditForm = ({ defaultValue, onSave }) => {

    const [value, setValue] = useState(defaultValue)


    return (
        <div className="_EditForm">
            <EditableField value={value} onChange={setValue} onSave={onSave}/>
        </div>
    )
}

export default EditForm