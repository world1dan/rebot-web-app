import { css } from '@linaria/core'
import { useState, useEffect } from 'react'

const styles = css`
    display: grid;
    gap: 6px;

    .row {
        background: var(--bg2);
        border-radius: 5px;
        animation: 1.4s loader-animation infinite;
    }

    @keyframes loader-animation {
        0% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.6);
        }
        100% {
            filter: brightness(1);
        }
    }

    @media (min-width: 700px) {
        &.two-columns {
            grid-template-columns: 1fr 1fr;
        }
    }
`

const Suspense = ({
    children,
    delay = 300,
    rowsCount = 10,
    rowsHeight = 50,
    onlyAndroid,
    twoColumns,
}) => {
    const [loading, setLoading] = useState(window.android || !onlyAndroid)

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), delay)

        return () => clearTimeout(timeout)
    }, [])

    return loading ? (
        <div className={styles + (twoColumns ? ' two-columns' : '')}>
            {new Array(rowsCount).fill().map((_, i) => {
                return (
                    <div
                        className="row"
                        key={i}
                        style={{ animationDelay: i * 25 + 'ms', height: rowsHeight }}
                    />
                )
            })}
        </div>
    ) : (
        children
    )
}

export default Suspense
