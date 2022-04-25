//import './Beta/index'

import './ColorScheme'
const inversion = localStorage.getItem('inversion')

if (inversion && inversion == 'false') {
    document.documentElement.style.setProperty('--inv', 0)
}

import { firestore } from './Context'
import { doc, collection } from 'firebase/firestore'

import { createRoot } from 'react-dom/client'

import analyticsEvent from './Utils/analyticsEvent'
import ErrorBoundary from './Components/ErrorBoundary'
import App from './App'
import Login from './Activities/Login'

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

    const handleError = (error, errorInfo) => {
        const errorString = error.toString() + errorInfo.componentStack

        analyticsEvent({
            type: 'app-error',
            error: errorString,
            username: user.first_name ?? null,
            UUID: user.id,
        })
    }

    return (
        user &&
        database && (
            <ErrorBoundary onError={handleError}>
                <App
                    config={{
                        database,
                        user,
                    }}
                />
            </ErrorBoundary>
        )
    )
}

const root = createRoot(document.getElementById('root'))

root.render(<UserProvider />)

if (process.env.NODE_ENV == 'production' && navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
}
