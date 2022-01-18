import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { AnimatePresence } from 'framer-motion'

import MarksKeyboard from '../MarksKeyboard'
import ActionSheet from 'Components/ActionSheet'
import Switch from 'Components/Blocks/Switch'
import useMarksController from '../useMarksController'



const About = (props) => {
    const [updateMarkDialog, setUpdateMarkDialog] = useState(false)

    const { 
        removeQuarterMark, 
        updateMark, 
        removeYearMark, 
        setYearMark } = useMarksController(props.subject)


    const handleChangeSubmit = (mark) => {
        if (props.yearMark) {
            setYearMark(mark, props.quarter)
        } else {
            updateMark(props.mark, { mark })
        }
    }

    const handleRemove = () => {
        props.onClose()

        setTimeout(() => {
            if (props.yearMark) {
                removeYearMark(props.quarter)
            } else {
                removeQuarterMark(props.mark)
            }
        }, 200)
    }

    const handleImportanceChange = (e) => {
        updateMark(props.mark, { imp: e.target.checked })
    }

    const date = new Date(props.mark.time).toLocaleString()


    return (
        <ActionSheet onClose={props.onClose} >
            <div className='AboutMark'>
                <div className='modal-title'>ОЦЕНКА</div>
                <div className='info'>
                    <div className='mark-num' style={props.markStyle}>{ props.mark.mark }</div>
                    <div className='subject'>{ props.subject.full_title || props.subject.title }</div>
                    <div className='time'>
                        <i className="fa-solid fa-calendar"></i>
                        { !props.yearMark ? date : `${props.quarter} Четверть` }
                    </div>
                </div>
                
                <div className='btns'>
                    { !props.yearMark && !props.readOnly && 
                        <div className='important-mark-switch'>
                            <Switch 
                                checked={props.mark.imp} 
                                onChange={handleImportanceChange} 
                                noPadding 
                                title='Контрольная' 
                                descr='Отметить как оценку по к/р' 
                                icon={<i className="fa-solid fa-circle-exclamation"></i>}
                            />
                        </div> 
                    }
                    { !props.readOnly && 
                        <>
                            <button onClick={() => setUpdateMarkDialog(true)}>
                                <i className="fa-solid fa-pen"></i>
                                Изменить
                            </button>
                            <button className='remove' onClick={handleRemove}>
                                <i className="fa-solid fa-trash-can"></i>
                                Удалить
                            </button> 
                        </>
                    }
                </div>
            </div>

            <AnimatePresence>
                { updateMarkDialog &&
                <ActionSheet
                    bottomCloseBtn  
                    onClose={() => setUpdateMarkDialog(false)}
                >
                    <MarksKeyboard 
                        onSubmit={handleChangeSubmit}
                        title={`Изменить оценку (${props.mark.mark})` + (props.yearMark ? ` за ${props.quarter} четверть` : "")}
                        descr={ props.subject.full_title || props.subject.title } 
                    /> 
                </ActionSheet>  }
            </AnimatePresence>
        </ActionSheet>
    )
}



About.propTypes = {
    onClose: PropTypes.func.isRequired,
    mark: PropTypes.object.isRequired,
    markStyle: PropTypes.object,
    yearMark: PropTypes.bool,
    subject: PropTypes.object,
    quarter: PropTypes.any,
    readOnly: PropTypes.bool
}


export default About