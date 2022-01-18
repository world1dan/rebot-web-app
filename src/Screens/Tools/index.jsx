import Wraper from 'Components/Wraper'
import React from 'react'

import Category from './Category'
import QEquation from './Solvers/QEquation'
import ReactionBalancer from './Solvers/ReactionBalancer'

import "./style.scss"




const Tools = () => {
    return (
        <Wraper styles={{maxWidth: 500, margin: "0 auto"}}>
            <h5 className="tools-descr">Здесь будут разные калькуляторы и конвертеры</h5>
            <Category title="Алгебра">
                <div className="Category-content">
                    <header className="content-header">Квадратное уравнение</header>
                    <QEquation/>
                </div>
            </Category>
            <Category title="Химия">
                <div className="Category-content">
                    <header className="content-header">Молекулярная масса</header>
                    <ReactionBalancer/>
                </div>
            </Category>
        </Wraper>
    )
}

export default Tools
