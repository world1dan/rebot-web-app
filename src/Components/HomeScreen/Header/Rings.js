import React from 'react';

import Dropdown from '../../Elements/Dropdown';

import "./style.scss";



const ringsTimetable = [
    "8.00 - 8.45",
    "8.55 - 9.40",
    "9.55 - 10.40",
    "10.55 - 11.40",
    "11.55 - 12.40",
    "12.50 - 13.35",
    "13.55 - 14.40"
];


const Rings = () => {

    const content = ringsTimetable.map((time, index) => {
        return ( 
            <div className="rings-row" key={index}>
                <span className="index">{ index + 1 }</span>
                <span className="content">{ time }</span>
            </div> 
        );
    })


    return (
        <Dropdown custom icon={<i className="fas fa-bell"></i>}>
            { content }
        </Dropdown>
    );
}

export default Rings;