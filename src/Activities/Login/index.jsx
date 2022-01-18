
import React, { useEffect, useState } from "react";

import { setDoc, doc } from "@firebase/firestore";
import { firestore } from "../../Context";

import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';


import "./style.scss";

function Login({ setUser }) {
    
    const [group, setGroup] = useState(1);

    useEffect(() => {
        if (process.env.NODE_ENV != "development") {
            navigator.serviceWorker.register('./sw.js');
        }
    }, [])

    useEffect(() => {
        localStorage.group = group;
    }, [group])
    

    const onAuth = (user) => {
        setDoc(doc(firestore, "users", `${user.id}`), user).then(() => {
            setUser({...user, group: localStorage.group})
        });

        localStorage.user = JSON.stringify({...user, group: localStorage.group});
    }

    return (
        <div className="Login">
            <div className="top-container">
                <header>
                    <div className="logo">
                        <img width="36px" src="static/icons/icon-128.png"/>
                    </div>
                </header>
            </div>
            
            <div className="content">
                <div className="block">
                    <h5 className="group-title">Группа по английскому</h5>
                    <div className="group">
                        <button className={group==1 ? "active" : ""} onClick={() => setGroup(1)}>1</button>
                        <button className={group==2 ? "active" : ""} onClick={() => setGroup(2)}>2</button>
                        <button className={group==3 ? "active" : ""} onClick={() => setGroup(3)}>3</button>
                    </div>
                    <div id="auth">
                        <TLoginButton
                            botName="resh1_bot"
                            buttonSize={TLoginButtonSize.Large}
                            lang="ru"
                            usePic={true}
                            cornerRadius={7}
                            onAuthCallback={onAuth}
                            requestAccess={'write'}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;


/*import React, { useState } from "react"
import PropTypes from "prop-types"

import { setDoc, doc } from "@firebase/firestore"
import { firestore } from "../../Context"

import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth'
import Radio from "Components/Blocks/Radio"
import VerticalLayout from "Components/Layouts/VerticalLayout"

import "./style.scss"



const Login = ({ setUser }) => {
    
    const [engGroup, setEngGroup] = useState(1)


    const onAuth = (user) => {
        setDoc(doc(firestore, "users", `${user.id}`), user).then(() => {
            setUser({...user, group: engGroup})
        })

        localStorage.user = JSON.stringify({...user, group: engGroup})
    }

    return (
        <div className="Login">

            <VerticalLayout>

                <div className="content">
                    <h5 className="group-title">Выбери группу по английскому</h5>
                    <Radio
                        onChange={setEngGroup}
                        defaultState="1"
                        variants={[
                            {
                                id: "1",
                                title: "1"
                            },
                            {
                                id: "2",
                                title: "2"
                            },
                            {
                                id: "3",
                                title: "3"
                            }
                        ]}/>
                </div>
                
                <div id="auth">
                    <TLoginButton
                        botName="resh1_bot"
                        buttonSize={TLoginButtonSize.Large}
                        lang="ru"
                        usePic={true}
                        cornerRadius={7}
                        onAuthCallback={onAuth}
                        requestAccess={'read'}
                    />
                </div>
            </VerticalLayout>
        </div>
    )
}



Login.propTypes = {
    setUser: PropTypes.func
}

export default Login*/