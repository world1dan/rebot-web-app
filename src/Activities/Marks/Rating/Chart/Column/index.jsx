import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'

import H1 from 'Components/Typography/H1'
import MarksView from 'Activities/Marks/QuarterMarks/MarksView'
import VerticalLayout from 'Components/Layouts/VerticalLayout'
import SheetView from '../../../../../Components/SheetView'

import './style.scss'

const variants = {
    hidden: { y: '100%' },
    visible: (custom) => {
        const delay = custom.i * 0.05
        const defaultBackground = custom.getDefaultBackground()

        return {
            y: 0,
            transition: {
                y: { delay, type: 'spring', duration: 0.6, bounce: 0 },
                backgroundColor: {
                    duration: 1.5,
                    ontransitionend: {
                        backgroundColor: undefined,
                    },
                },
            },
            backgroundColor: custom.change
                ? [
                      custom.change == 'decrease' ? '#ff3b30' : '#34c759',
                      defaultBackground,
                  ]
                : undefined,
        }
    },
}

const Column = ({ user, percent, isOwn, userInfo, i }) => {
    const columnRef = useRef(null)
    const prewRating = useRef(null)

    const [marksPreview, setMarksPreview] = useState(false)

    const getDefaultBackground = () => {
        return getComputedStyle(columnRef.current).getPropertyValue(
            'background-color'
        )
    }

    const motionCustom = { i, getDefaultBackground }

    if (prewRating.current) {
        if (prewRating.current < user.rating) {
            motionCustom.change = 'increase'
        } else if (prewRating.current > user.rating) {
            motionCustom.change = 'decrease'
        }
    }

    prewRating.current = user.rating

    return (
        <>
            <motion.div
                className={
                    'Marks__Rating__Chart_Column ' + (isOwn ? 'own' : '')
                }
                style={{ height: `${percent}%` }}
                onClick={() => setMarksPreview(true)}
                variants={variants}
                custom={motionCustom}
                initial="hidden"
                animate="visible"
                layout
                whileTap={{ filter: 'brightness(1.5)' }}
                ref={columnRef}
            >
                <div className="average-mark">{user.rating}</div>
                <div className="username">{userInfo?.first_name}</div>
            </motion.div>
            {marksPreview && (
                <SheetView
                    handleClose={() => setMarksPreview(false)}
                    type="wide"
                >
                    <VerticalLayout>
                        <H1 text={userInfo?.first_name} />
                        <MarksView marks={user.marks} readOnly={!isOwn} />
                    </VerticalLayout>
                </SheetView>
            )}
        </>
    )
}

Column.propTypes = {
    user: PropTypes.object.isRequired,
    percent: PropTypes.string.isRequired,
}

export default Column
