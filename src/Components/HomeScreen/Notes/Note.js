import React, { useEffect, useRef } from 'react';

import { deleteDoc, setDoc } from "firebase/firestore";

import TextareaAutosize from 'react-textarea-autosize';
import Dropdown from '../../Dropdown';

export default function Note(props) {

    const input = useRef();

    const isPinned = props.noteData.isPinned;
    const text = props.noteData.text;


    useEffect(() => {
        input.current.value = text;
    }, [text])

    function removeNote() {
        deleteDoc(props.docRef)
    }

    function changeNote() {
        setDoc(props.docRef, {
            text: input.current.value
        }, {merge: true});
    }

    function updatePin() {
        setDoc(props.docRef, {
            isPinned: !isPinned
        }, {merge: true});
    }

    function copy() {
        navigator.clipboard.writeText(text)
        .then(() => {
            window.UI.alert("Скопировано в буфер обмена");
        })
    }

    //const class = "note " + (isPinned ?  "" : "");

    return (
        <div className="note">
            <TextareaAutosize maxRows={10} ref={input} defaultValue={text} onBlur={changeNote}/>
            <Dropdown>
                <button className="withIcon" onClick={updatePin}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="var(--text)"><path d="M7.04785 16.3613C7.04785 17.1611 7.59277 17.6885 8.42773 17.6885H13.1211V21.8545C13.1211 23.0762 13.7539 24.333 14 24.333C14.2373 24.333 14.8701 23.0762 14.8701 21.8545V17.6885H19.5723C20.4072 17.6885 20.9434 17.1611 20.9434 16.3613C20.9434 14.4629 19.4404 12.5205 16.9531 11.6064L16.6719 7.51074C17.9814 6.77246 19.0186 5.95508 19.4668 5.36621C19.7129 5.05859 19.8271 4.7334 19.8271 4.45215C19.8271 3.87207 19.3877 3.44141 18.7197 3.44141H9.27148C8.6123 3.44141 8.16406 3.87207 8.16406 4.45215C8.16406 4.7334 8.27832 5.05859 8.52441 5.36621C8.97266 5.95508 10.0098 6.77246 11.3193 7.51074L11.0381 11.6064C8.55078 12.5205 7.04785 14.4629 7.04785 16.3613Z"/></svg>
                    <span>Закрепить</span>
                </button>
                <button className="withIcon" onClick={copy}>
                    <i className="fas fa-clone"></i>
                    <span>Скопировать</span>
                </button>
                <button className="withIcon danger" onClick={removeNote}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="var(--text)"><path d="M9.84277 22.4785H18.166C19.3701 22.4785 20.0732 21.8369 20.126 20.6416L20.6797 7.94141H21.8926C22.3408 7.94141 22.6836 7.58984 22.6836 7.15039C22.6836 6.71094 22.332 6.37695 21.8926 6.37695H18.0781V5.05859C18.0781 3.65234 17.1729 2.81738 15.6611 2.81738H12.3213C10.8096 2.81738 9.9043 3.65234 9.9043 5.05859V6.37695H6.10742C5.66797 6.37695 5.31641 6.71973 5.31641 7.15039C5.31641 7.59863 5.66797 7.94141 6.10742 7.94141H7.3291L7.8916 20.6416C7.93555 21.8369 8.63867 22.4785 9.84277 22.4785ZM11.7324 5.1377C11.7324 4.74219 12.0049 4.4873 12.4443 4.4873H15.5469C15.9863 4.4873 16.2588 4.74219 16.2588 5.1377V6.37695H11.7324V5.1377ZM11.1787 19.7803C10.8271 19.7803 10.5811 19.5518 10.5723 19.2002L10.3086 9.86621C10.2998 9.51465 10.5459 9.27734 10.915 9.27734C11.2666 9.27734 11.5127 9.50586 11.5215 9.85742L11.7852 19.1914C11.8027 19.543 11.5566 19.7803 11.1787 19.7803ZM14 19.7803C13.6309 19.7803 13.3848 19.5518 13.3848 19.2002V9.85742C13.3848 9.51465 13.6309 9.27734 14 9.27734C14.3691 9.27734 14.624 9.51465 14.624 9.85742V19.2002C14.624 19.5518 14.3691 19.7803 14 19.7803ZM16.8213 19.7891C16.4434 19.7891 16.1973 19.543 16.2148 19.2002L16.4785 9.85742C16.4873 9.50586 16.7334 9.27734 17.085 9.27734C17.4541 9.27734 17.7002 9.51465 17.6914 9.86621L17.4277 19.2002C17.4189 19.5518 17.1729 19.7891 16.8213 19.7891Z"/></svg>
                    <span>Удалить</span>
                </button>
            </Dropdown>
        </div>
    );
}
