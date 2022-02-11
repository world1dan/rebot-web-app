import { useContext } from 'react'

import { ConfigContext } from '../../../Context'

import useRating from './useRating'
import useUsers from './useUsers'

import History from './History'
import Chart from './Chart'

import './style.scss'

const Rating = () => {
    const [usersRatings, statistics] = useRating()
    const users = useUsers()
    const user = useContext(ConfigContext).user

    return (
        <div className="Rating">
            <div className="block-left">
                <Chart
                    usersRatings={usersRatings}
                    user={user}
                    usersInfo={users}
                />
                <div className="stat">
                    <div className="title">Всего оценок у тебя</div>
                    <div className="num">{statistics?.userMarksCounter}</div>
                </div>
                <div className="stat">
                    <div className="title">Всего оценок у всех</div>
                    <div className="num">{statistics?.globalMarksCount}</div>
                </div>
            </div>
            {users && usersRatings && (
                <History
                    usersRatings={usersRatings}
                    user={user}
                    usersInfo={users}
                />
            )}
        </div>
    )
}

export default Rating
