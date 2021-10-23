import React, { useLayoutEffect, useRef, useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"

import { useChat } from "../../../Hooks/useChat"
import { ChatContext } from "./Context"

import VScroll from "../../../Components/VScroll"
import Notification from "../../../Components/Notification"
import Sender from "./Sender"
import Message from "./Messages/Message"
import UserProfile from "./UserProfile"
import ChatSettings from "./ChatSettings"
import Header from "./Header"
import "./style.scss"
import { ConfigContext } from "../../../Context"



const Chat = ({ chatID }) => {
    
    const [userModal, setUserModal] = useState(false)
    const [chatSettings, setChatSettings] = useState(false)

    const [notification, setNotification] = useState(null)


    const dummy = useRef()

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


    useLayoutEffect(() => {
        dummy.current.scrollIntoView({ behavior: "smooth"})
    })


    useEffect(() => {
        
    }, [messages])

    //const [userModal, setUserModal] = useState(false)



    const forContext = { ...chatInfo, user, members }


    
    return (
        <>
            <ChatContext.Provider value={forContext}>
                <div className="Chat">
                    <VScroll reversed returnBtn>
                        <div className="Chat__Messages__Wraper">
                            { messagesComponents }
                            <span ref={dummy}></span>
                        </div>
                    </VScroll>

                    <Header chatTitle={chatInfo?.title} setChatSettings={setChatSettings} chatID={chatID}/>

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

