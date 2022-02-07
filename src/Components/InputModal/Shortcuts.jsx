import React, { useEffect, useState, memo } from 'react'
import { css } from '@linaria/core'
import { motion } from 'framer-motion'

import useLocalStorage from '../../Hooks/useLocalStorage'
import PlusRounded from '../Icons/PlusRounded'

const styles = css`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    max-width: 100%;
    overflow: hidden;
    .symbol {
        background: var(--bg4);
        flex-grow: 1;
        border-radius: 7px;
        font-size: 15px;
        display: flex;
        justify-content: center;
        white-space: nowrap;
        align-items: center;
        height: 40px;
        text-overflow: ellipsis;
        min-width: 60px;
        overflow: hidden;
    }

    .addBtn {
        color: var(--text2);
    }
`

let tapStartTime = null

const Shortcuts = ({ insertIntoTextarea, focusOnTextarea }) => {
    const [shortcuts, setShortcuts] = useLocalStorage('shortcuts', [
        '(',
        ')',
        '§',
        'Упр',
        'Стр',
        'WB',
        'треш',
    ])

    const removeShortcut = (targetSymbol) => {
        if (confirm('Удалить ' + targetSymbol + '?')) {
            setTimeout(() => {
                setShortcuts((currentShortcuts) => {
                    return currentShortcuts.filter(
                        (symbol) => symbol !== targetSymbol
                    )
                })
            }, 30)
        }
    }

    const newShortcut = () => {
        const shortcut = prompt(
            "Давай давай напиши сюда 'головка шлюха жопа член'"
        )

        if (shortcut) {
            setShortcuts((currentShortcuts) => [...currentShortcuts, shortcut])
        }
    }

    const symbols = shortcuts.map((symbol, i) => {
        const handleTap = () => {
            if (tapStartTime) {
                const tapDuration = Date.now() - tapStartTime

                if (tapDuration >= 400) {
                    removeShortcut(symbol)
                } else {
                    insertIntoTextarea(symbol)
                }
            }

            tapStartTime = null
        }

        return (
            <motion.button
                key={i}
                className="symbol"
                onClick={focusOnTextarea}
                onPointerDown={() => (tapStartTime = Date.now())}
                onPointerUp={handleTap}
                whileTap={{ scale: 0.9, filter: 'brightness(1.6)' }}
            >
                {symbol}
            </motion.button>
        )
    })

    return (
        <div className={styles}>
            {symbols}
            <button className="symbol addBtn" onClick={newShortcut}>
                <PlusRounded width={20} height={20} />
            </button>
        </div>
    )
}

export default memo(Shortcuts)
