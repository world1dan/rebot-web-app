import React from 'react'
import PropTypes from "prop-types"

import "./style.scss"


const Overview = (props) => {
    return (
        <div className="Overview">
            <div className="lesson card">
                <div className="main-content">
                    <h5 className="title">Физика</h5>
                    <div className="homework">Параграф 10 упр 7</div>
                </div>
                <div className="tool-btns-wraper">
                    <button className="tool-btn">Решение</button>
                    <button className="tool-btn">
                        <svg width="18" height="18" viewBox="0 0 19 19" fill="currentColor"><path d="M9.49165 18.4297C14.2259 18.4297 18.1335 14.3164 18.1335 9.3418C18.1335 4.36719 14.2175 0.253906 9.4833 0.253906C4.75742 0.253906 0.858154 4.36719 0.858154 9.3418C0.858154 14.3164 4.76577 18.4297 9.49165 18.4297ZM5.45043 9.35059C5.45043 8.83203 5.80113 8.47168 6.2854 8.47168H8.66503V5.9668C8.66503 5.45703 8.99903 5.09668 9.47495 5.09668C9.96759 5.09668 10.3099 5.45703 10.3099 5.9668V8.47168H12.6979C13.1738 8.47168 13.5245 8.83203 13.5245 9.35059C13.5245 9.8516 13.1738 10.2119 12.6979 10.2119H10.3099V12.7168C10.3099 13.2178 9.96759 13.5869 9.47495 13.5869C8.99903 13.5869 8.66503 13.2178 8.66503 12.7168V10.2119H6.2854C5.80113 10.2119 5.45043 9.8516 5.45043 9.35059Z"/></svg>
                        Оценка
                    </button>
                </div>
            </div>
            <div className="lesson card">
                <div className="main-content">

                </div>
                <div className="tool-btns-wraper">
                    <button className="tool-btn"></button>
                    <button className="tool-btn"></button>
                </div>
            </div>
            <div className="lesson card">
                <div className="main-content">

                </div>
                <div className="tool-btns-wraper">
                    <button className="tool-btn"></button>
                    <button className="tool-btn"></button>
                </div>
            </div>
            <div className="lesson card">
                <div className="main-content">

                </div>
                <div className="tool-btns-wraper">
                    <button className="tool-btn"></button>
                    <button className="tool-btn"></button>
                </div>
            </div>
            <div className="lesson card">
                <div className="main-content">

                </div>
                <div className="tool-btns-wraper">
                    <button className="tool-btn"></button>
                    <button className="tool-btn"></button>
                </div>
            </div>
        </div>
    )
}


Overview.propTypes = {
}



export default Overview