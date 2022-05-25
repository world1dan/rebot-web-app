import { useContext, useState } from 'react'

import { ConfigContext } from '../../../Context'

import MarksInput from './MarksInput'
import { ActionSheetContext } from '../../../Components/ActionSheet'

import './style.scss'

const MarksKeyboard = (props) => {
    const { close } = useContext(ActionSheetContext)
    const context = useContext(ConfigContext)

    const handleSubmit = (markNum) => {
        props.onSubmit(markNum)
        close()

        if (props.statusBarAlert) {
            context.setStatusBar({
                title: props.statusBarAlert,
                type: 'sucsess',
            })
        }
    }

    return (
        <div className="MarksKeyboard">
            <header className="mark-info">
                <h5 className="title">{props.title}</h5>
                <div className="subject">{props.descr}</div>
            </header>

            <MarksInput handleMarkInput={handleSubmit} />
        </div>
    )
}

export default MarksKeyboard
