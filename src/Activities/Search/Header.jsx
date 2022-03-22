import { useRef, useState, useEffect, useContext } from 'react'

import { manifestContext } from 'Context'

import Notebooks from './Notebooks'

const Header = ({ addSolution }) => {
    const manifest = useContext(manifestContext)

    const [searchMode, setSearchMode] = useState('google')
    const [searchValue, setSearchValue] = useState('')

    const inputField = useRef()

    useEffect(() => {
        if (searchMode !== 'google') {
            inputField.current.focus()
        }
    }, [searchMode])

    const search = () => {
        inputField.current.blur()
        if (searchValue == '') {
            setSearchMode('google')
            return
        }

        if (searchMode !== 'google') {
            addSolution(searchMode, searchValue)
            setSearchMode('google')
        } else {
            window.open(
                'https://www.google.com/search?q=' + searchValue,
                '_blank'
            )
        }

        setSearchValue('')
    }

    const handleChange = (e) => setSearchValue(e.target.value)

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            search()
        }
    }

    const modes = [
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
            <div
                className="search"
                style={{ borderColor: manifest[searchMode]?.color }}
            >
                {!isGoogle && (
                    <div className="unit">{manifest[searchMode]?.unit}</div>
                )}

                <input
                    enterKeyHint="search"
                    ref={inputField}
                    value={searchValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    inputMode={isGoogle ? '' : ''}
                    type={isGoogle ? 'text' : 'number'}
                    autoComplete="off"
                />
            </div>

            <div className="modes">
                {modes.map((subjID) => {
                    const subject = manifest[subjID]

                    return (
                        <button
                            key={subjID}
                            style={{ background: subject.color }}
                            onClick={() => setSearchMode(subjID)}
                        >
                            {subject.title}
                        </button>
                    )
                })}
            </div>

            <Notebooks />
        </header>
    )
}

export default Header
