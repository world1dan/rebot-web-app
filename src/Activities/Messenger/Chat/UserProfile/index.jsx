import React from "react"
import PropTypes from "prop-types"


import VerticalLayout from "../../../../Components/Layouts/VerticalLayout"
import AdaptivePanel from "../../../../Components/AdaptivePanel"

import "./style.scss"

const UserProfile = ({ user, handleClose }) => {
    return (
        <AdaptivePanel handleClose={() => handleClose(false)}>
            <VerticalLayout>
                <div className="UserProfileHeader">
                    <img className="avatar" src={user.photo_url}/>
                    <h3 className="name">{user.first_name}</h3>
                </div>
            </VerticalLayout>
        </AdaptivePanel>
    )
}


UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
}


export default UserProfile