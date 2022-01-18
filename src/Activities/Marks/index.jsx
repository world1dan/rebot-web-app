import React, { memo, useState } from "react"

import QuarterMarks from "./QuarterMarks"
import YearMarks from "./YearMarks"
import Rating from "./Rating"

import Wraper from "../../Components/Wraper"
import Radio from "Components/Blocks/SegmentedControl"

import "./style.scss"


const Marks = () => {
    const [currentTab, setCurrentTab] = useState("quarter")

    return (
        <Wraper styles={{ paddingLeft: 0, paddingRight: 0}}>
            <div className="marks">
                <header className="marks-header">
                    <h1 className="marks-title">Оценки</h1>
                    <div className='tab-switcher'>
                        <Radio onChange={setCurrentTab} activeItem={currentTab} items={[
                            {
                                id: "quarter",
                                title: "Четверть"
                            },
                            {
                                id: "year",
                                title: "Год"
                            },
                            {
                                id: "rating",
                                title: "Рейтинг"
                            }
                        ]}/>
                    </div>
                </header>

                { currentTab == 'quarter' && <QuarterMarks key='quarter'/> }
                { currentTab == 'year' && <YearMarks key='year'/> }
                { currentTab == 'rating' && <Rating key='rating'/> }
            </div>
        </Wraper>
    )
}



export default memo(Marks)
