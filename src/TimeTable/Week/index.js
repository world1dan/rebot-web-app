import React, { PureComponent } from 'react';
import { onSnapshot } from "firebase/firestore";

import Day from '../Day';



export default class Week extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            timetable: false
        }
    }
    componentDidMount() {
        onSnapshot(this.props.timetableRef, (doc) => {
            this.setState({
                timetable: doc.data()
            })
        });
    }

    render() {
        if (this.state.timetable) {
            const days = [];
            let day;
    
            for (day in this.state.timetable) {
                days.push(<Day key={day} day_num={day} day_data={this.state.timetable[day]} manifest={this.props.manifest}/>);
            }
            return (
                <div className="auto-grid-340">
                    { days }
                </div>
            );
        } else {
            return "";
        }
    }
}