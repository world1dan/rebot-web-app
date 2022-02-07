import React, { useState } from 'react'

import ntf from 'num2fraction'

import NumInput from '../../NumInput'

import './style.scss'

const QEquation = () => {
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')

    function solve(a, b, c) {
        var solution1 =
            (-1 * b + Math.sqrt(Math.pow(b, 2) + -4 * a * c)) / (2 * a)
        var solution2 =
            (-1 * b - Math.sqrt(Math.pow(b, 2) + -4 * a * c)) / (2 * a)

        var discriminant = Math.pow(b, 2) + -4 * a * c

        return [solution1, solution2, discriminant]
    }

    let results = null

    if (b && c) {
        const A = a ? parseInt(a) : 1
        const B = parseInt(b)
        const C = parseInt(c)

        results = solve(A, B, C)
    }

    const parseFraction = (num) => {
        if (parseInt(num) === num) {
            return num
        } else {
            if (!isNaN(num)) {
                return ntf(num)
            }
        }
    }

    return (
        <div className="QEquation">
            <div className="form">
                <NumInput width={60} value={a} onChange={setA} />
                x² +
                <NumInput width={60} value={b} onChange={setB} />
                x +
                <NumInput width={60} value={c} onChange={setC} />=
            </div>

            {results && (
                <div className="result">
                    <div className="solution-info">
                        <div className="line">
                            D ={' '}
                            <span className="secondary">
                                {b}² - 4 * {a !== '' ? a : 1} * {c}
                            </span>{' '}
                            = {results[2]}
                        </div>
                        <div className="line">
                            x₁ ={' '}
                            <span className="secondary">
                                -{b} + {Math.sqrt(results[2])} / 2 *{' '}
                                {a !== '' ? a : 1}
                            </span>{' '}
                            = {parseFraction(results[0])}
                        </div>
                        <div className="line">
                            x₂ ={' '}
                            <span className="secondary">
                                {' '}
                                -{b} - {Math.sqrt(results[2])} / 2 *{' '}
                                {a !== '' ? a : 1}
                            </span>{' '}
                            = {parseFraction(results[1])}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QEquation
