import React, { Component } from 'react';

import { fetchAndActivate, getValue } from '@firebase/remote-config';
import { remoteConfig } from '../../../Context';

import SubjectRow from "../../TimeTable/Day/SubjectRow";
//import Tools from "./Tools";





export default class Now extends Component {
    
    constructor(props) {

        super(props);
        
        this.state = {
            currentLesson: null,
            lessonsTime: null
        }
    }


    componentDidMount() {
        fetchAndActivate(remoteConfig).then(() => {
            const lessonsJSON = getValue(remoteConfig, "lessonsTime").asString();
            const lessonsTimeObj = JSON.parse(lessonsJSON);
 
            this.setState({ lessonsTime: lessonsTimeObj });
        });

        function convertTime(millis) {
            const minutes = Math.floor(millis / 60000);
            const seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }  


        this.timer = setInterval(() => {
            if (this.state.lessonsTime) {
                const date = new Date();


                const hours = date.getHours();
                const mins = date.getMinutes();

                for (let lessonNum in this.state.lessonsTime) {
                    const lesson = this.state.lessonsTime[lessonNum]

                    const start = lesson.start.split(":");
                    const end = lesson.end.split(":");


        
                    const lessonStart = new Date();
                    lessonStart.setHours(start[0], start[1], 0);

                    const lessonEnd = new Date()
                    lessonEnd.setHours(end[0], end[1], 0);


                    const now = new Date();

                    if (lessonStart <= now && now <= lessonEnd) {
                        console.log(convertTime(lessonEnd-now));

                        this.setState({ currentLesson: lessonNum });
                        break;
                    }
                    
                }
            }
        }, 1000)
    }

    render() {

        if (!this.state.currentLesson) return null;

        const path = this.props.pathToDay + "." + this.state.currentLesson;
        const lesson_data = this.props.day_data[this.state.currentLesson];

        return (
            <div className="UIBlock">
                <h1>Сейчас</h1>
                <SubjectRow lesson_data={lesson_data} path={path}/>
            </div>
        );
    }
}