import React, {  useRef, useLayoutEffect } from "react"
import useStayScrolled from "react-stay-scrolled"
import VScroll from "../../../Components/VScroll"



const MessagesList = ({ messages }) => {

    const ref = useRef(null)


    
    const { stayScrolled, scrollBottom } = useStayScrolled(ref, { inaccuracy: 100 })


    useLayoutEffect(() => {
        stayScrolled()
    }, [messages])


    return (
        <VScroll ref={ref} scrollBackBtn handleScrollBack={scrollBottom}>
            <div className="Chat__Messages__Wraper">
                { messages }
            </div>
        </VScroll>
    )
}

export default MessagesList
