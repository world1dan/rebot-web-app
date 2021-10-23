import { collection, doc, orderBy, limitToLast, query, addDoc, serverTimestamp, deleteDoc } from "@firebase/firestore"
import { useMemo } from "react"
import { firestore } from "../Context"

import useCollectionData from "./useCollectionData"
import useDocData from "./useDocData"





export const useChat = (chatID, onUpdate) => {

    const { chatRef, membersRef, messagesRef, messagesQuery } = useMemo(() => {
        const chatRef = doc(firestore, "chats", chatID)
        const membersRef = collection(firestore, "users")
        const messagesRef = collection(firestore, "chats", chatID, "messages")
        const messagesQuery = query(messagesRef, orderBy("time"), limitToLast(30))

        return { chatRef, membersRef, messagesRef, messagesQuery }
    }, [chatID])



    const messages = useCollectionData(messagesQuery, onUpdate)
    const chatInfo = useDocData(chatRef)
    const members = useCollectionData(membersRef)


    const addObject = (message) => {
        addDoc(messagesRef, message)
    }

    const sendText = (text, userUUID) => {
        const message = {
            time: serverTimestamp(),
            text,
            sender: userUUID
        }

        addObject(message)
    }

    const deleteMessage = (messageID) => {
        const msgRef = doc(firestore, "chats", chatID, "messages", messageID)
        deleteDoc(msgRef)
    }

    

    const parsedMembers = {} 

    members.forEach((member) => {
        parsedMembers[member.id] = member.data()
    })

    return { chatInfo, members: parsedMembers, messages: members ? messages : [] , sendText, deleteMessage }
}
