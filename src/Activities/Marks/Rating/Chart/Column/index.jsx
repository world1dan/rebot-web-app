import { useRef, useState } from 'react'

import { motion } from 'framer-motion'

import UserMarks from './UserMarks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faCrown } from '@fortawesome/free-solid-svg-icons'

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
                ? [custom.change == 'decrease' ? '#ff3b30' : '#34c759', defaultBackground]
                : undefined,
        }
    },
}

const Column = ({ user, percent, isOwn, userInfo, i }) => {
    const columnRef = useRef(null)
    const prewRating = useRef(null)

    const [marksPreview, setMarksPreview] = useState(false)

    const getDefaultBackground = () => {
        return getComputedStyle(columnRef.current).getPropertyValue('background-color')
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
                className={'Marks__Rating__Chart_Column ' + (isOwn ? 'own' : '')}
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
                {i == 0 && (
                    <div className="crown">
                        <FontAwesomeIcon icon={faCrown} size="2x" />
                    </div>
                )}
                <div className="average-mark">
                    {user.rating ?? (
                        <FontAwesomeIcon icon={faCircleQuestion} className="no-gpa" />
                    )}
                </div>

                {userInfo?.photo_url && (
                    <img
                        className="avatar"
                        src={userInfo?.photo_url}
                        width="56px"
                        height="56px"
                    ></img>
                )}
                <div className="username">{userInfo?.first_name}</div>
            </motion.div>
            {marksPreview && (
                <UserMarks
                    handleClose={() => setMarksPreview(false)}
                    user={user}
                    userInfo={userInfo}
                    readOnly={!isOwn}
                />
            )}
        </>
    )
}

export default Column
