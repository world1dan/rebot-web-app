import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"


import "./style.scss"
import RadioItem from "./RadioItem"


const Radio = ({ children, variants, defaultState, onChange }) => {

    const [selectedID, setSelectedID] = useState(defaultState)

    useEffect(() => {
        setSelectedID(defaultState)
    }, [defaultState])


    const select = (id) => {
        setSelectedID(id)
        onChange(id)
    }

    const buttons = variants.map((variant) => {
        return (
            <RadioItem key={variant.id} selected={variant.id == selectedID} title={variant.title} onSelect={() => select(variant.id)}/>
        )
    })
    

    return (
        <div className="_Radio">
            { buttons }
        </div>
    )
}

export default Radio