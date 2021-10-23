import React, { useState, useEffect, useRef } from "react"

import TextareaAutosize from 'react-textarea-autosize'


import "./style.scss"


const Sender = ({ sendText, user }) => {
    

    const [input, setInput] = useState("")

    const editor = useRef(null)
    const [keyboard, setKeyboard] = useState(false)

    useEffect(() => {
        if (keyboard) {
            document.body.classList.add("keyboard-active")
        } else {
            document.body.classList.remove("keyboard-active")
        }
    }, [keyboard])



    const handleInput = (e) => {
        setInput(e.target.value)
    }


    const handleSend = () => {
        editor.current.focus()
        sendText(input, user.id)
        setInput("")
        
    }


    return (
        <div className="Chat__Sender">



            <TextareaAutosize
                placeholder="Сообщение.."
                className="Chat__Sender__Input"
                value={input}
                minRows={1}
                ref={editor}
                onFocus={() => setKeyboard(true)}
                onBlur={() => setKeyboard(false)}
                onChange={handleInput}
            />

            { input !== "" && 
                <button
                    className="Chat__Sender__SendBtn"
                    onClick={handleSend}>
                    <svg width="30" height="30" viewBox="0 0 28 28" fill="currentcolor">
                        <path d="M15.3359 23.4102C16.0215 23.4102 16.4961 22.8564 16.8213 22.0127L22.6221 6.83398C22.7715 6.44727 22.8594 6.10449 22.8594 5.80566C22.8594 5.18164 22.4639 4.78613 21.8311 4.78613C21.541 4.78613 21.1895 4.86523 20.8027 5.01465L5.5625 10.8506C4.80664 11.1406 4.23535 11.6152 4.23535 12.3008C4.23535 13.1357 4.85938 13.4521 5.7207 13.7158L10.2734 15.1045C10.8887 15.2979 11.249 15.2891 11.6797 14.8848L21.4707 5.81445C21.5938 5.7002 21.7432 5.71777 21.8398 5.80566C21.9365 5.89355 21.9365 6.05176 21.8311 6.16602L12.7783 15.9746C12.4092 16.3877 12.374 16.7744 12.5586 17.3896L13.9121 21.8545C14.1758 22.751 14.4922 23.4102 15.3359 23.4102Z"/>
                    </svg>

                </button>
            }
        </div>
    )
}


export default Sender


/*

            <label htmlFor="file-upload" className="Chat__Sender__MediaBtn">
                <input type="file" id="file-upload"/>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="currentcolor">
                    <path d="M19.9062 14.1289L13.4111 20.624C11.7676 22.2764 9.55273 22.1182 8.1377 20.6943C6.70508 19.2705 6.54688 17.0732 8.20801 15.4121L17.085 6.53516C18.0518 5.56836 19.4932 5.40137 20.4336 6.3418C21.374 7.29102 21.1982 8.72363 20.2314 9.68164L11.5215 18.4092C11.1348 18.8047 10.6777 18.6904 10.3965 18.4268C10.1416 18.1543 10.0361 17.6973 10.4229 17.3018L16.4961 11.2285C16.8037 10.9121 16.8213 10.4551 16.5225 10.1562C16.2236 9.875 15.7666 9.88379 15.459 10.1914L9.35938 16.291C8.41016 17.2402 8.44531 18.6904 9.28906 19.5342C10.2031 20.4482 11.583 20.4219 12.5322 19.4727L21.2861 10.71C22.9912 9.01367 22.9297 6.77246 21.4355 5.27832C19.9678 3.81934 17.6914 3.71387 15.9863 5.41895L7.05664 14.3574C4.83301 16.5898 4.98242 19.7891 7.0127 21.8193C9.03418 23.832 12.2422 23.9902 14.4658 21.7666L21.0049 15.2363C21.3037 14.9375 21.3037 14.3926 20.9961 14.1113C20.7061 13.7949 20.2139 13.8389 19.9062 14.1289Z"/>
                </svg>
            </label>
            */