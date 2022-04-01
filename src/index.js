import './ColorScheme'
const inversion = localStorage.getItem('inversion')

if (inversion && inversion == 'false') {
    document.documentElement.style.setProperty('--inv', 0)
}

import { firestore } from './Context'
import { doc, collection } from 'firebase/firestore'
import { Component } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import Login from './Activities/Login'
import FatalError from './Activities/FatalError'

window.ios =
    /iPad|iPhone/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

window.android = navigator.userAgent.toLowerCase().indexOf('android') > -1

const getUserFromLocalStorage = () => {
    const userJSON = localStorage.getItem('user')

    if (process.env.NODE_ENV == 'development') {
        return { id: '1374651027', group: 2 }
    }

    if (!userJSON) return undefined

    try {
        const user = JSON.parse(userJSON)
        return user.id ? user : undefined
    } catch {
        return undefined
    }
}

const getDatabase = (userID) => {
    return {
        users: collection(firestore, 'users'),
        userInfo: doc(firestore, 'users', userID),
        timetable: doc(firestore, 'timeTables', '9D'),
        marks: doc(firestore, 'users', userID, 'userStorage', 'marks_new'),
        yearMarks: doc(firestore, 'users', userID, 'userStorage', 'marks_year'),
        notes: collection(firestore, 'users', userID, 'notes'),
    }
}

const UserProvider = () => {
    const user = getUserFromLocalStorage()

    const database = user ? getDatabase(user.id.toString()) : undefined

    if (!user || !database) return <Login handleLogin={() => location.reload()} />

    return (
        user &&
        database && (
            <App
                config={{
                    database,
                    user,
                }}
            />
        )
    )
}

class ErrorInterceptor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
        }
    }

    componentDidCatch() {
        this.setState({
            error: true,
        })
    }

    render() {
        if (this.state.error) return <FatalError />

        return this.props.children
    }
}

const root = createRoot(document.getElementById('root'))

root.render(
    <ErrorInterceptor>
        <UserProvider />
    </ErrorInterceptor>
)

if (process.env.NODE_ENV == 'production' && navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
}
