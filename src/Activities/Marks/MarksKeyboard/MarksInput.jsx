import PropTypes from 'prop-types'

import { motion } from 'framer-motion'

import './style.scss'

const MarksInput = (props) => {
    const nums = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    const newMarkBtns = nums.map((mark) => {
        return (
            <motion.button
                className="new-mark-btn"
                key={mark}
                onClick={() => props.handleMarkInput(mark)}
                whileTap={{
                    scale: 0.9,
                    filter: 'brightness(1.7)',
                }}
            >
                {mark}
            </motion.button>
        )
    })

    return (
        <div className="marks-input-container">
            {newMarkBtns}
            {props.onRemove && (
                <motion.button
                    onClick={props.onRemove}
                    whileTap={{
                        scale: 0.9,
                    }}
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 28 28"
                        fill="currentColor"
                    >
                        <path d="M20.4775 21.8809C22.376 21.8809 23.3691 20.9756 23.3691 19.0947V8.31934C23.3691 6.42969 22.376 5.4541 20.4775 5.4541H12.875C11.6797 5.4541 10.8271 5.74414 10.0273 6.61426L5.07031 11.8877C4.42871 12.5908 4.18262 13.1006 4.18262 13.6543C4.18262 14.208 4.42871 14.7266 5.07031 15.4209L10.0361 20.668C10.8359 21.5381 11.6885 21.8721 12.8838 21.8721L20.4775 21.8809ZM12.4092 17.4951C11.9434 17.4951 11.5742 17.126 11.5742 16.6514C11.5742 16.4316 11.6621 16.2295 11.8203 16.0713L14.2197 13.6719L11.8203 11.2812C11.6621 11.123 11.5742 10.9121 11.5742 10.6924C11.5742 10.2266 11.9434 9.86621 12.4092 9.86621C12.6553 9.86621 12.8486 9.94531 13.0068 10.1035L15.3975 12.4941L17.8145 10.0947C17.9814 9.92773 18.1748 9.84863 18.4121 9.84863C18.8779 9.84863 19.2383 10.2178 19.2383 10.6836C19.2383 10.9033 19.1592 11.0967 18.9922 11.2725L16.5928 13.6719L18.9834 16.0625C19.1504 16.2295 19.2383 16.4316 19.2383 16.6514C19.2383 17.126 18.8691 17.4951 18.3945 17.4951C18.1572 17.4951 17.9463 17.4072 17.7881 17.249L15.3975 14.8584L13.0244 17.249C12.8574 17.416 12.6553 17.4951 12.4092 17.4951Z" />
                    </svg>
                </motion.button>
            )}
        </div>
    )
}

MarksInput.propTypes = {
    handleMarkInput: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
}

export default MarksInput
