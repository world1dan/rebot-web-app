import React, { useState, useContext } from "react"
import { ConfigContext } from "../../Context"
//import useDocOnce from "../../Hooks/useDocOnce"

import Chat from "./Chat"

//import ChatsList from "./ChatsList"

import "./style.scss"



const Messenger = () => {


    //const docRef = useContext(ConfigContext).database.userInfo
    //const userChats = useDocOnce(docRef)?.chats ?? []
    //const [activeChat, setActiveChat] = useState(null)


    return (
        <Chat chatID="test" onClose={() => {}}/>
    )
}


export default Messenger

/*
{ activeChat ? 
    <Chat chatID={activeChat} onClose={() => setActiveChat(null)}/>
    : <ChatsList setActiveChat={setActiveChat} userChats={userChats}/>
}*/