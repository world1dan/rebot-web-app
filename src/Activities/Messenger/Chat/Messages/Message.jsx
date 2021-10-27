import React, { memo, useState } from "react"
import PropTypes from "prop-types"

import { showAlert } from "../../../../Helpers/showAlert"

import ContextMenu from "../ContextMenu"
import ContextMenuBtn from "../ContextMenu/ContextMenuBtn"
import "./style.scss"



const isEmojisOnly = (string) => {
    const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g; // eslint-disable-line
 
    return string.replace(regex, "").length === 0
}







const Message = ({ messageData, needSenderTitle, deleteMessage, own, sender, setUserModal }) => {


    const [menuOpen, setMenuOpen] = useState(false)

    const isEmoji = isEmojisOnly(messageData?.text)

    let sendTime
    
    try {
        sendTime = messageData?.time.toDate().toLocaleString("ru", {
            hour: "numeric",
            minute: "numeric",
        })
    } catch {
        sendTime = ""
    }




    let className = "Chat__Message"

    className += own ? " outcoming" : " incoming"
    if (needSenderTitle) className += " with-sender-title"
    if (isEmoji) className += " emoji"

    const handleContextMenu = (e) => {
        e.preventDefault()
        setMenuOpen(true)
    }
    
    const handleClick = () => {
        setMenuOpen(true)
    }

    function handleContextMenuClose() {
        setMenuOpen(false)
    }



    const handleDelete = () => {
        deleteMessage(messageData.id)
    }


    const copyMessage = () => {
        try {
            navigator.clipboard.writeText(messageData.text).then(() => {
                showAlert("Скопировано")
            })
        } catch {
            showAlert("Ошибка")
        }
    } 

    return (
        <div
            className={className}>

            <span className="time">{ sendTime != "" ? sendTime : <i className="fas fa-circle-notch fa-spin fa-lg" style={{marginLeft: 6}}></i> }</span>
            { needSenderTitle && sender?.photo_url && 
                <div className="avatar" onClick={() => setUserModal(sender)}>
                    <img width="32" height="32" src={sender.photo_url}/>
                </div> }
            { needSenderTitle && <span className="sender">{sender?.first_name}</span> }
            <div className="message-text"
                onClick={menuOpen ? handleContextMenuClose : handleClick}  
                onContextMenu={handleContextMenu}>
                { messageData?.text }
            </div>


            { menuOpen && 

            <ContextMenu onClose={handleContextMenuClose}>
                { own &&
                    <ContextMenuBtn
                        title="Удалить"
                        onClick={handleDelete}
                        icon={ <i className="fas fa-book"></i> }
                    />
                }
                <ContextMenuBtn
                    title="Скопировать"
                    icon={ <i className="fas fa-clone"></i>}
                    onClick={copyMessage}
                />     
            </ContextMenu> 
            
            }
        
        </div>
    )
}

Message.propTypes = {
    messageData: PropTypes.object,
    needSenderTitle: PropTypes.bool,
    deleteMessage: PropTypes.func,
    own: PropTypes.bool,
    sender: PropTypes.object,
    setUserModal: PropTypes.func
}
export default memo(Message)

