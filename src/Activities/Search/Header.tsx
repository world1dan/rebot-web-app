import {
    useRef,
    useState,
    useEffect,
    useContext,
    FC,
    ChangeEventHandler,
    KeyboardEventHandler,
} from 'react'

import { motion } from 'framer-motion'

import { ISubjectsManifest } from '../../types'
import { manifestContext } from '../../Context'

import Notebooks from './Notebooks'

export interface IHeaderProps {
    addSolution: (searchMode: string, searchValue: string) => void
}

const Header: FC<IHeaderProps> = ({ addSolution }) => {
    const manifest = useContext<ISubjectsManifest | null>(manifestContext)

    if (!manifest) return null

    const [searchMode, setSearchMode] = useState('google')
    const [searchValue, setSearchValue] = useState('')

    const inputField = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (searchMode !== 'google' && inputField.current) {
            inputField.current.focus()
        }
    }, [searchMode])

    const search = () => {
        if (inputField.current) {
            inputField.current.blur()
        }

        if (searchValue == '') {
            setSearchMode('google')
            return
        }

        if (searchMode !== 'google') {
            addSolution(searchMode, searchValue)
            setSearchMode('google')
        } else {
            window.open('https://www.google.com/search?q=' + searchValue, '_blank')
        }

        setSearchValue('')
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value)
    }

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key == 'Enter') {
            search()
        }
    }

    const solutionSearchModes: string[] = [
        'eng',
        'rus',
        'bel',
        'phis',
        'alg',
        'him',
        'rus_lit',
        'geom',
        'bel_lit',
    ]

    const isGoogle = searchMode === 'google'

    return (
        <header className="search-header">
            <motion.div
                className="search"
                style={{ border: `2px ${manifest[searchMode]?.color} solid` }}
            >
                {!isGoogle && <div className="unit">{manifest[searchMode]?.unit}</div>}

                <input
                    ref={inputField}
                    value={searchValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    type={isGoogle ? 'text' : 'number'}
                    enterKeyHint="search"
                />
            </motion.div>

            <div className="modes">
                {solutionSearchModes.map((subjID) => {
                    const subject = manifest[subjID]

                    return (
                        <motion.button
                            key={subjID}
                            style={{ background: subject.color }}
                            onClick={() => setSearchMode(subjID)}
                            whileTap={{ scale: 0.94 }}
                        >
                            {subject.title}
                        </motion.button>
                    )
                })}
            </div>

            <Notebooks />
        </header>
    )
}

export default Header
