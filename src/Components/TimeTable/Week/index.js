import React, { PureComponent } from 'react';
import { onSnapshot } from "firebase/firestore";

import Day from '../Day';
import './style.scss';


export default class Week extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            timetable: false,
            isOffline: false
        }

        this.updateNetworkStatus = () => {
            this.setState({
                isOffline: !navigator.onLine
            })
        }

        window.addEventListener('online',  this.updateNetworkStatus);
        window.addEventListener('offline', this.updateNetworkStatus);
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

                <div>
                    { this.state.isOffline && 
                        <div className="offline-alert">
                            <div className="text">
                                <h4>Интернет недоступен</h4>
                                <p>Данные будут сохранены при подключении</p>
                            </div>
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                    }
                
                    <div className="week-grid">
                        { days }
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}