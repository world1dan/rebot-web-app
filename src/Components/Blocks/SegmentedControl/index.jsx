import { useId, memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'

import './style.scss'

const SegmentedControl = ({ items, activeItem, onChange }) => {
    const layoutID = useId()

    return (
        <motion.div className="segmented-control" layoutScroll>
            {items.map((item) => {
                const isActive = item.id === activeItem

                return (
                    <motion.button
                        key={item.id}
                        onClick={() => onChange(item.id)}
                        className="button"
                        whileTap={{ scale: isActive ? 0.93 : 1 }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={layoutID}
                                layoutDependency={activeItem}
                                className="active"
                                transition={{
                                    type: 'spring',
                                    duration: 0.3,
                                    bounce: 0,
                                }}
                            />
                        )}
                        <div className="label">{item.title}</div>
                    </motion.button>
                )
            })}
        </motion.div>
    )
}

SegmentedControl.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired,
}

export default memo(SegmentedControl)
