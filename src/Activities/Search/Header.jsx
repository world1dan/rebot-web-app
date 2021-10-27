import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"



const Header = (props) => {

    const [searchMode, setSearchMode] = useState("google")
    const [searchValue, setSearchValue] = useState("")

    const inputField = useRef()


    useEffect(() => {
        if (searchMode !== "google") {
            inputField.current.focus()
        }
    }, [searchMode])


    const search = () => {
        if (searchValue == "") {
            setSearchMode("google")
            return
        }
    
        if (searchMode !== "google") {
            props.addSolution(searchMode, searchValue)
            setSearchMode("google")
        } else {
            window.open("https://www.google.com/search?q=" + searchValue, "_blank")
        }

        setSearchValue("")
    }

    const handleChange = (e) => setSearchValue(e.target.value)

    const handleKeyPress = (e) => {
        if (e.key == "Enter" && searchValue !== "") {
            search()
        }
    }

    

    const modes = [
        "eng", "rus", "bel", 
        "phis", "alg", "him", 
        "rus_lit", "geom", "bel_lit"
    ]

    const buttons = modes.map((subjID) => {
        const subject = props.manifest[subjID]

        return (
            <button
                key={subjID}
                style={{ background: subject.color }} 
                onClick={() => setSearchMode(subjID)}>
                { subject.title }
            </button>
        )
    })


    const isGoogle = searchMode === "google"



    return (
        <header id="search-header">
            <div className="search" style={{ borderColor: props.manifest?.[searchMode]?.color }}>
                { !isGoogle && <div className="unit">{ props.manifest?.[searchMode].unit }</div> }

                <input
                    ref={inputField}
                    value={searchValue}

                    onChange={handleChange}
                    onBlur={search}
                    onKeyPress={handleKeyPress}
    
                    inputMode={ isGoogle ? "" : "decimal"}
                    type={ isGoogle ? "text" : "numbers"} 
                    autoComplete="off"
                />
    
            </div>

            <div className="wraper">
                { buttons }
            </div>
        </header>
    )
}




Header.propTypes = {
    addSolution: PropTypes.func.isRequired,
    manifest: PropTypes.object.isRequired
}



export default Header