import React, { useContext } from 'react'

import { ConfigContext } from '../../../Context'
import useRating from './useRating'

import Chart from './Chart'

import './style.scss'
import useUsers from './useUsers'

const Rating = () => {
    const [usersRatings, statistics] = useRating()
    const users = useUsers()
    const user = useContext(ConfigContext).user

    return (
        <div className="Rating">
            <Chart usersRatings={usersRatings} user={user} usersInfo={users} />
            <div className="stat">
                <div className="title">Всего оценок у тебя</div>
                <div className="num">{statistics?.userMarksCounter}</div>
            </div>
            <div className="stat">
                <div className="title">Всего оценок у всех</div>
                <div className="num">{statistics?.globalMarksCount}</div>
            </div>
        </div>
    )
}

export default Rating
