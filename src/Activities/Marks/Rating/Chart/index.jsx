import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import Loading from 'Components/Loading'
import Column from './Column'

import "./style.scss"


const Chart = ({ usersRatings, user, usersInfo }) => {
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 220)
    })

    const columns = usersRatings?.sort((b, a) => a.rating - b.rating).map((person, i) => {
        const percent = person.rating / 10 * 100
        return (
            <Column 
                key={person.userUUID}
                percent={percent}
                i={i}
                user={person}
                userInfo={usersInfo?.[person.userUUID]}
                isOwn={user.id == person.userUUID}/>
        )
    })
    

    return (
        <div className="Rating__Chart__Wrapper">
            { loading || !usersInfo ? <Loading/> : (
                <div className="Rating__Chart">
                    
                    <motion.div className="data-wraper">
                        { columns }
                    </motion.div>
                </div>
            )}
        </div>
    )
}

Chart.propTypes = {

}


export default Chart