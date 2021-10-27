import React from "react"
import PropTypes from "prop-types"
import ReshebaViewer from "../../Components/ReshebaViewer"





const Group = ({ subjectInfo, toOpen, hwRaw }) => {

    const viewers = []

    toOpen.forEach((num, key) => {
        if (num) {
            viewers.push(
                <ReshebaViewer key={key} subjectInfo={subjectInfo} startNum={num}/>
            )
        }
    })

    const titleStyle = {
        backgroundColor: subjectInfo.color
    }

    return (
        <>
            <div className="sol-subj">
                <div className="title block" style={titleStyle}>{subjectInfo.title}</div>
                <div className="homework block">{ hwRaw }</div>
            </div>

            <div className="sol-content">
                { viewers }
            </div>
        </>
    )

}

Group.propTypes = {
    subjectInfo: PropTypes.object.isRequired,
    toOpen: PropTypes.array.isRequired,
    hwRaw: PropTypes.string
}


export default Group