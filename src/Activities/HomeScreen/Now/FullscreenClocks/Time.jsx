import { css } from '@linaria/core'
import { useState } from 'react'

import { motion } from 'framer-motion'
import useInterval from '../../../../Hooks/useInterval'

const styles = css`
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
`

const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

const Time = () => {
    const [date, setDate] = useState('')

    useInterval(() => {
        const string = new Date().toLocaleString('ru', options)

        setDate(string)
    }, 1000)

    return (
        <motion.div
            className={styles}
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: 0.4,
            }}
        >
            {date}
        </motion.div>
    )
}

export default Time
