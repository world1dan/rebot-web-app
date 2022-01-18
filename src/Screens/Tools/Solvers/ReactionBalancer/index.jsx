import React, { useMemo, useState } from 'react'
const chemicaltools = require('chemicaltools')

import "./style.scss"



const ReactionBalancer = () => {
    const [substance, setSubstance] = useState("")

    const info = useMemo(() => {
        if (substance) {
            return chemicaltools.calculateMass(substance)
        }
    }, [substance])

    return (
        <div className="ReactionBalancer">
            <input placeholder="Вещество" onChange={(e) => setSubstance(e.target.value)} value={substance}></input>
            =

            { " " + (info?.mass?.toFixed(0) ?? "") }
        </div>
    )
}


export default ReactionBalancer