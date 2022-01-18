
//import 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'

import { doc, collection } from 'firebase/firestore'
import { firestore } from './Context'
import App from './App'
import Login from './Activities/Login'
import FatalError from './Screens/FatalError'

const isSafari =
    /iPad|iPhone/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
globalThis.ios = isSafari



class AppWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notAuthorized: false,
            error: false,
            database: null,
            user: null
        }
    }

    setAppConfig(user) {
        const id = user.id.toString()

        const database = {
            users: collection(firestore, 'users'),
            userInfo: doc(firestore, 'users', id),
            timetable: doc(firestore, 'timeTables', '9D'),
            marks: doc(firestore, 'users', id, 'userStorage', 'marks_new'),
            yearMarks: doc(firestore, 'users', id, 'userStorage', 'marks_year'),
            notes: collection(firestore, 'users', id, 'notes')
        }

        this.setState({
            user,
            database,
            notAuthorized: false
        })
    }

    componentDidMount() {
        const userJSON = localStorage.getItem('user')

        if (userJSON != null && userJSON != 'null') {
            this.setAppConfig(JSON.parse(userJSON))
        } else {
            if (process.env.NODE_ENV == 'development') {
                this.setAppConfig(
                    JSON.parse(
                        '{"id":104260429249,"first_name":"Даник","group":"1"}'
                    )
                )
            } else {
                this.setState({
                    notAuthorized: true
                })
            }
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        return (
            <>
                {!this.state.notAuthorized &&
                    !this.state.error &&
                    this.state.user &&
                    this.state.database && (
                        <App
                            config={{
                                database: this.state.database,
                                user: this.state.user
                            }}
                        />
                    )}

                {this.state.notAuthorized && (
                    <Login setUser={this.setAppConfig} />
                )}
                {this.state.error && <FatalError />}
            </>
        )
    }
}

render(<AppWrapper/>, document.getElementById('root'))


if (process.env.NODE_ENV == 'production' && navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
}
