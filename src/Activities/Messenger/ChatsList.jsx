import React from "react"

import "./style.scss"



const ChatsList = (props) => {


    const chats = props.userChats.map((chatID) => {
        return (
            <button 
                key={chatID} 
                className="chat-btn" 
                onClick={() => props.setActiveChat(chatID)}>
            </button>
        )
    })


    return (
        <div className="chats-list">
            <h1>Чаты</h1>
            <div className="chats-wraper">
                { chats }
            </div>

        </div>
    )
}


export default ChatsList