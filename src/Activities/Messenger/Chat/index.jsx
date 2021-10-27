import React, { useContext, useState } from "react"
import PropTypes from "prop-types"


import { useChat } from "../../../Hooks/useChat"
import { ChatContext } from "./Context"
import MessagesList from "./MessagesList"
import Notification from "../../../Components/Notification"
import Sender from "./Sender"
import Message from "./Messages/Message"
import UserProfile from "./UserProfile"
import ChatSettings from "./ChatSettings"
import Header from "./Header"
import "./style.scss"
import { ConfigContext } from "../../../Context"



const Chat = ({ chatID, onClose }) => {
    


    const [userModal, setUserModal] = useState(false)
    const [chatSettings, setChatSettings] = useState(false)

    const [notification, setNotification] = useState(null)


    const user = useContext(ConfigContext).user



    const { 
        chatInfo,
        messages, 
        members,
        sendText,
        deleteMessage,
    } = useChat(chatID)
    


    const messagesComponents = []

    let prewMessageSender = null


    if (messages) {

        messages.forEach((doc) => {
            
            const messageData = doc.data()

            messagesComponents.push(
                <Message
                    key={doc.id}
                    setUserModal={setUserModal}
                    messageData={{ ...messageData, id: doc.id }}
                    deleteMessage={deleteMessage}
                    sender={members?.[messageData.sender]}
                    own={messageData.sender == user.id}
                    needSenderTitle={prewMessageSender != messageData.sender && messageData.sender != user.id}
                />
            )

            prewMessageSender = messageData.sender
        })
    }





    //const [userModal, setUserModal] = useState(false)



    const forContext = { ...chatInfo, user, members }


    
    return (
        <>
            <ChatContext.Provider value={forContext}>
                <div className="Chat">
                    
                    <MessagesList messages={messagesComponents}/>

                    <Header chatTitle={chatInfo?.title} setChatSettings={setChatSettings} chatID={chatID} onClose={onClose}/>

                    <Sender sendText={sendText} user={user}/>
                </div>

            </ChatContext.Provider>

            { userModal && <UserProfile user={userModal} handleClose={() => setUserModal(false)}/> }
            { chatSettings && <ChatSettings chatID={chatID} chatInfo={chatInfo} handleClose={() => setChatSettings(false)}/> }

            { notification && <Notification {...notification} handleClose={() => setNotification(null)}/>}
        </>
    )
}


Chat.propTypes = {
    chatID: PropTypes.string.isRequired
}


export default Chat

