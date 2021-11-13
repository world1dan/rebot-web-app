import { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { ConfigContext } from "../../Context"


const useMarkRating = (mark) => {
    const [markStyle, setMarkStyle] = useState({})
    const markRatingPattern = useContext(ConfigContext).marksRatingPattern

    useEffect(() => {
        if (markRatingPattern === "2") {

            if (mark >= 7) {
                setMarkStyle({ color: "#34C759" })
            } else if (mark >= 5) {
                setMarkStyle({ color: "#FFCC00" })
            } else if (mark >= 1) {
                setMarkStyle({ color: "#FF3B30" })
            }
        }
    }, [])
    




    return { markStyle }
}


useMarkRating.propTypes = {
    mark: PropTypes.number.isRequired
}

export default useMarkRating