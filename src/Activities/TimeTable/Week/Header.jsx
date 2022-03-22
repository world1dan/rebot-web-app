import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@linaria/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronRight,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

const styles = css`
    position: fixed;
    top: -1px;
    z-index: 1;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    max-width: 600px;
    height: 54px;
    background-color: var(--bg2);
    border-bottom: 1px solid var(--borders);

    @media (min-width: 600px) {
        margin: 0 auto;
        border-radius: 0 0 9px 9px;
        border-left: 1px solid var(--borders);
        border-right: 1px solid var(--borders);
    }

    .current-week {
        right: 0;
        left: 0;
        text-align: center;
        flex-grow: 1;
        font-weight: 600;
        pointer-events: none;
    }

    button {
        width: 64px;
        height: 100px;
        transition: color 0.17s;

        &.unactive {
            color: var(--text2);
        }
    }
`

const variants = {
    enter: (direction) => {
        return {
            opacity: 0.3,
            x: direction > 0 ? 100 : -100,
            position: 'absolute',
        }
    },
    center: {
        x: 0,
        opacity: 1,
        position: 'static',
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? 100 : -100,
            opacity: 0,

            position: 'absolute',
        }
    },
}

const Header = ({ week, prewWeek, nextWeek, direction }) => {
    const title =
        week == 1
            ? 'Прошлая неделя'
            : week == 2
            ? 'Эта неделя'
            : 'Следующая неделя'

    return (
        <header className={styles}>
            {week > 1 ? (
                <button onClick={prewWeek}>
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </button>
            ) : (
                <button className="unactive">
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </button>
            )}
            <AnimatePresence custom={direction} initial={false}>
                <motion.span
                    className="current-week"
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    key={week}
                    custom={direction}
                    transition={{
                        type: 'spring',
                        bounce: 0.3,
                        duration: 0.44,
                    }}
                >
                    {title}
                </motion.span>
            </AnimatePresence>
            {week < 3 ? (
                <button onClick={nextWeek}>
                    <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </button>
            ) : (
                <button className="unactive">
                    <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </button>
            )}
        </header>
    )
}

export default Header
