import React, { memo, useContext } from "react"

import MarksView from "./MarksView"
import Wraper from "../../Components/Wraper"
import "./style.scss"
import H1 from "Components/Typography/H1"
import { MarksContext } from "../../Context"



const Marks = () => {

    const marks = useContext(MarksContext)


    return (
        <Wraper styles={{ paddingLeft: 0, paddingRight: 0 }}>

            <div className="marks">
                <H1 text="Оценки"/>
                <MarksView marks={marks ?? {}}/>
            </div>

        </Wraper>
    )
}



export default memo(Marks)



/*
{ calculator && 
                    <AdaptivePanel handleClose={() => setCalculator(false)} direction="right">
                        <MarksCalculator marks="10, 9, 7, 4, 10" subject={{}}/>
                    </AdaptivePanel>}
<Radio 
                    variants={[
                        {
                            id: 1,
                            title: "1"
                        },
                        {
                            id: 2,
                            title: "2"
                        },
                        {
                            id: 3,
                            title: "3"
                        },
                        {
                            id: 4,
                            title: "4"
                        }]}
                    defaultState={1}
                />
                */