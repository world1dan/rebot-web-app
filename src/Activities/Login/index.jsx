import React, { useState } from 'react'

import { setDoc, doc } from '@firebase/firestore'
import { firestore } from '../../Context'

import analyticsEvent from '../../Utils/analyticsEvent'
import SegmentedControl from '../../Components/Blocks/SegmentedControl'
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth'

import './style.scss'

const Login = ({ handleLogin }) => {
    const [group, setGroup] = useState(1)

    const onAuth = (userFromTG) => {
        const userInfo = { ...userFromTG, group }

        localStorage.setItem('user', JSON.stringify(userInfo))

        setDoc(doc(firestore, 'users', `${userInfo.id}`), userInfo).then(() => {
            handleLogin(userInfo)
        })

        analyticsEvent({
            type: 'new-login',
            user: userInfo,
        })
    }

    return (
        <div className="Login">
            <div className="header">
                <img
                    width="40px"
                    className="app-icon"
                    src="static/icons/apple-icon-180.png"
                />
            </div>

            <div className="content">
                <h5 className="group-title">Выбери группу по английскому</h5>
                <SegmentedControl
                    onChange={setGroup}
                    activeItem={group}
                    items={[
                        {
                            id: 1,
                            title: '1',
                        },
                        {
                            id: 2,
                            title: '2',
                        },
                        {
                            id: 3,
                            title: '3',
                        },
                    ]}
                />
                <div className="tg-auth-btn ">
                    <TLoginButton
                        botName="resh1_bot"
                        buttonSize={TLoginButtonSize.Large}
                        lang="ru"
                        usePic={true}
                        cornerRadius={5}
                        onAuthCallback={onAuth}
                        requestAccess={'write'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
