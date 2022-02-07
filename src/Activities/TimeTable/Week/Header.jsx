import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@linaria/core'

const styles = css`
    position: fixed;
    top: 0;
    z-index: 5;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    max-width: 700px;
    height: calc(var(--top-save-zone) + 54px);
    padding-top: var(--top-save-zone);
    color: var(--text1);
    background-color: var(--bg2);
    border-bottom: 1px solid var(--borders);

    @media (min-width: 700px) {
        position: static;
        margin: 0 auto;
        border-radius: 9px !important;
        box-shadow: 0 0 0 1px var(--borders-soft) inset;
    }

    .current-week {
        will-change: transform opacity;
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
                    <i className="fas fa-chevron-left fa-2x"></i>
                </button>
            ) : (
                <button className="unactive">
                    <i className="fas fa-chevron-left fa-2x"></i>
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
                    <i className="fas fa-chevron-right fa-2x"></i>
                </button>
            ) : (
                <button className="unactive">
                    <i className="fas fa-chevron-right fa-2x"></i>
                </button>
            )}
        </header>
    )
}

export default Header
