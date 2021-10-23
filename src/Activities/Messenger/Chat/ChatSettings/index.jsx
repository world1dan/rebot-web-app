import React from "react"
import PropTypes from "prop-types"


import VerticalLayout from "../../../../Components/Layouts/VerticalLayout"
import AdaptivePanel from "../../../../Components/AdaptivePanel"
import H1 from "../../../../Components/Typography/H1"
import EditForm from "../../../../Components/Blocks/EditForm"

import { firestore } from "../../../../Context"
import { setDoc, doc } from "@firebase/firestore"
import "./style.scss"


const ChatSettings = ({ handleClose, chatID, chatInfo }) => {


    const changeChatTitle = (newChatTitle) => {

        const chatDoc = doc(firestore, "chats", chatID)

        setDoc(chatDoc, {
            title: newChatTitle
        }, { merge: true })
    }


    return (
        <AdaptivePanel handleClose={() => handleClose(false)}>
            <VerticalLayout>
                <H1 text="Настройки чата"/>
                <EditForm onSave={changeChatTitle} defaultValue={chatInfo?.title}/>
            </VerticalLayout>
        </AdaptivePanel>
    )
}


ChatSettings.propTypes = {
    user: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
}



export default ChatSettings