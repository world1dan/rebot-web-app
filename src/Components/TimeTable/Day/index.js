import React, { PureComponent, Component, memo } from 'react';

import SubjectRow from './SubjectRow';
import './style.scss';

const day_titles = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье"
};




export default class Day extends PureComponent {
    
    render() {
        let rows = [];
        let subj;
        
        for (subj in this.props.day_data) {
            rows.push(<SubjectRow key={subj} timetableRef={this.props.timetableRef} path={this.props.pathToDay + "." + subj} manifest={this.props.manifest} lesson_data={this.props.day_data[subj]}/>);
        }

        return (
            
            <div className="UIBlock">
                <h1>{ day_titles[this.props.day_num] }</h1>
                <div className="content">
                    { rows }
                </div>
            </div>
        );
    }

}
