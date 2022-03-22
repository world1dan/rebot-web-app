import { motion } from 'framer-motion'
import { convertTime } from './utils'

const Progress = ({ actualLesson, size = 82, strokeColor }) => {
    const percents = 100 - 100 / (actualLesson.timeInterval / actualLesson.left)

    const radius = 45
    const circumference = Math.ceil(2 * Math.PI * radius)

    const fillPercents = Math.abs(
        Math.ceil((circumference / 100) * (percents - 100))
    )

    const transition = {
        duration: 1,
        ease: 'easeOut',
    }

    const variants = {
        hidden: {
            strokeDashoffset: circumference,
            transition,
        },
        show: {
            strokeDashoffset: fillPercents,
            transition,
        },
    }

    return (
        <div className="Progress">
            <div className="countdown">{convertTime(actualLesson.left)}</div>
            <svg viewBox="0 0 100 100" width={size} height={size}>
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="circle"
                    strokeWidth={7}
                    stroke="var(--bg2)"
                    strokeOpacity={1}
                    fill="transparent"
                />
            </svg>
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                style={{
                    position: 'absolute',
                    transform: 'rotate(-90deg)',
                    overflow: 'visible',
                    marginLeft: -size,
                }}
            >
                <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth={9}
                    stroke={strokeColor}
                    fill="transparent"
                    strokeDashoffset={fillPercents}
                    strokeDasharray={circumference}
                    variants={variants}
                    initial="hidden"
                    animate="show"
                />
            </svg>
        </div>
    )
}

export default Progress
