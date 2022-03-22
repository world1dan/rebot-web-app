import { useId, memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'

import './style.scss'

const SegmentedControl = ({ items, activeItem, onChange }) => {
    const layoutID = useId()

    return (
        <motion.ol className="SegmentedControl" layoutScroll>
            {items.map((item) => {
                const isActive = item.id === activeItem

                return (
                    <motion.li
                        className="item"
                        whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
                        key={item.id}
                    >
                        <button
                            onClick={() => onChange(item.id)}
                            className="button"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId={layoutID}
                                    layoutDependency={activeItem}
                                    className="active"
                                    transition={{
                                        duration: 0.25,
                                    }}
                                />
                            )}
                            <div className="label">{item.title}</div>
                        </button>
                    </motion.li>
                )
            })}
        </motion.ol>
    )
}

SegmentedControl.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired,
}

export default memo(SegmentedControl)
