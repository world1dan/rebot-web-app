import React from 'react'
import Category from './Category'
import QEquation from './Solvers/QEquation'
import ReactionBalancer from './Solvers/ReactionBalancer'

import SheetView from '../../Components/SheetView'

import './style.scss'

const Tools = ({ handleClose }) => {
    return (
        <SheetView type="fullHeightOnMobile" handleClose={handleClose}>
            <Category title="Алгебра">
                <div className="Category-content">
                    <div className="content-header">Квадратное уравнение</div>
                    <QEquation />
                </div>
            </Category>
            <Category title="Химия">
                <div className="Category-content">
                    <div className="content-header">Молекулярная масса</div>
                    <ReactionBalancer />
                </div>
            </Category>
        </SheetView>
    )
}

export default Tools
