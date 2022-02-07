import { useContext, useState, memo, useEffect } from 'react'

import { manifestContext } from '../../Context'

import Wraper from '../../Components/Wraper'
import Header from './Header'
import ReshebaViewer from '../../Components/ReshebaViewer'

import './style.scss'

const getSavedSolutions = () => {
    try {
        return JSON.parse(localStorage.openned_solutions) ?? []
    } catch {
        return []
    }
}

const Search = () => {
    const manifest = useContext(manifestContext)
    const [solutions, setSolutions] = useState(getSavedSolutions)

    useEffect(() => {
        localStorage.setItem('openned_solutions', JSON.stringify(solutions))
    }, [solutions])

    const addSolution = (id, inputValue) => {
        if (id === 'rus_lit' || id === 'bel_lit') {
            const url = manifest[id].alt_url.replace(
                '?',
                inputValue.replace(/ *\([^)]*\) */g, '')
            )
            window.open(url, '_blank')

            return
        }

        setSolutions((solutions) => {
            const nums = inputValue.replace(/ *\([^)]*\) */g, '').split(',')

            const newSolutions = nums.map((num) => {
                num = num.replace(/\D/g, '')
                return {
                    subjID: id,
                    num: parseInt(num),
                }
            })

            return solutions.concat(newSolutions)
        })
    }

    const removeSolution = (solution) => {
        const index = solutions.indexOf(solution)
        solutions.splice(index, 1)

        setSolutions([...solutions])
    }

    const viewers = solutions.map((solution) => {
        return (
            <ReshebaViewer
                key={solution.subjID + solution.num}
                subjectInfo={manifest[solution.subjID]}
                startNum={solution.num}
                onClose={() => removeSolution(solution)}
            />
        )
    })

    return (
        <Wraper styles={{ padding: 0, paddingBottom: 100 }}>
            <Header addSolution={addSolution} />

            <div className="viewers-wrapper">{viewers.reverse()}</div>
        </Wraper>
    )
}

export default memo(Search)
