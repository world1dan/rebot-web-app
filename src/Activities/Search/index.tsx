import { useContext, memo } from 'react'

import { manifestContext } from '../../Context'

import Wraper from '../../Components/Wraper'
import Header from './Header'
import ReshebaViewer from '../../Components/ReshebaViewer'
import useLocalStorage from '../../Hooks/useLocalStorage'

import ScrollView from '../../Components/ScrollView'

import './style.scss'

const Search = () => {
    const manifest = useContext(manifestContext)

    if (!manifest) return null

    const [solutions, setSolutions] = useLocalStorage('openned_solutions', [])

    const addSolution = (id: string, inputValue: string) => {
        if (id == 'rus_lit' || id == 'bel_lit') {
            const url = manifest[id].alt_url?.replace(
                '?',
                inputValue.replace(/ *\([^)]*\) */g, '')
            )

            url && window.open(url, '_blank')

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

    const viewers = solutions.map((solution) => (
        <ReshebaViewer
            key={solution.subjID + solution.num}
            subject={manifest[solution.subjID]}
            startNum={solution.num}
            onClose={() => removeSolution(solution)}
        />
    ))

    return (
        <Wraper>
            <ScrollView withoutPaddings>
                <Header addSolution={addSolution} />
                <div className="viewers-wrapper">{viewers.reverse()}</div>
            </ScrollView>
        </Wraper>
    )
}

export default memo(Search)
