import { useContext } from 'react'

import { ConfigContext } from '../../../Context'

import useRating from './useRating'
import useUsers from './useUsers'

import History from './History'
import Chart from './Chart'

import './style.scss'
import Suspense from '../../../Components/Suspense'

const Rating = () => {
    const [usersRatings, statistics] = useRating()
    const users = useUsers()
    const user = useContext(ConfigContext).user

    return (
        <div className="Rating">
            <div className="block-left">
                <Chart usersRatings={usersRatings} user={user} usersInfo={users} />

                <Suspense rowsHeight={48} rowsCount={2} delay={400}>
                    <div className="stat">
                        <div className="title">Всего оценок у тебя</div>
                        <div className="num">{statistics?.userMarksCounter}</div>
                    </div>
                    <div className="stat">
                        <div className="title">Всего оценок у всех</div>
                        <div className="num">{statistics?.globalMarksCount}</div>
                    </div>
                </Suspense>
            </div>
            <Suspense rowsHeight={40} rowsCount={16} delay={400}>
                {users && usersRatings && (
                    <History usersRatings={usersRatings} usersInfo={users} />
                )}
            </Suspense>
        </div>
    )
}

export default Rating
