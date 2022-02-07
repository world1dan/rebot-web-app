import { css } from '@linaria/core'
import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
const styles = css`
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
`
const Time = () => {
    const [date, setDate] = useState('')

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }

    useEffect(() => {
        const update = () => {
            const string = new Date().toLocaleString('ru', options)

            setDate(string)
        }

        update()

        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [])

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
