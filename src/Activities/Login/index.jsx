import React from 'react'

import { setDoc, doc } from '@firebase/firestore'
import { firestore } from '../../Context'

import analyticsEvent from '../../Utils/analyticsEvent'
import SegmentedControl from '../../Components/Blocks/SegmentedControl'
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth'

import './style.scss'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            group: 1,
        }
    }

    onAuth = (userFromTG) => {
        const userInfo = { ...userFromTG, group: this.state.group }
        localStorage.setItem('user', JSON.stringify(userInfo))

        setDoc(doc(firestore, 'users', `${userInfo.id}`), userInfo).then(() => {
            this.props.handleLogin(userInfo)
        })

        analyticsEvent({
            type: 'new-login',
            user: userInfo,
        })
    }

    handleGroupChange = (g) => {
        this.setState({
            group: g,
        })
    }

    render() {
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
                    <h5 className="group-title">
                        Выбери группу по английскому
                    </h5>
                    <SegmentedControl
                        onChange={this.handleGroupChange}
                        activeItem={this.state.group}
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
                            onAuthCallback={this.onAuth}
                            requestAccess={'write'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
