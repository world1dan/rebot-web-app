import React, { useEffect, useState } from 'react';
import { onSnapshot } from "firebase/firestore";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Day from '../Day';
import './style.scss';
import { Switch } from 'react-router-dom';


export default function Week(props) {

    const [ timetableFull, setTimetableFull ] = useState(false);
    const [ timetable, setTimetable ] = useState(false);
    const [ isOffline, setOffline ] = useState(!navigator.onLine);
    const [ week, setWeek ] = useState(2);

    useEffect(() => {
        window.addEventListener('online',  () => setOffline(true));
        window.addEventListener('offline', () => setOffline(true));
    }, []);

    useEffect(() => {
        onSnapshot(props.timetableRef, (doc) => {
            setTimetableFull(doc.data());
        });
    }, [props.timetableRef]);

    useEffect(() => {
        setTimetable(timetableFull[week])
    }, [week, timetableFull]);
    

    if (timetable) {
        const days = [];
        let day;
        
        for (day in timetable) {
            days.push(<Day key={day} pathToDay={week + "." + day} timetableRef={props.timetableRef} day_num={day} day_data={timetable[day]} manifest={props.manifest}/>);
        }

        const title = week==1 ? "Прошлая неделя" : week==2 ? "Эта неделя" : "Следующая неделя";


        return (
            <div>
                <div className="UIBlock weekChanger">
                    { week > 1 
                        ?
                        <button onClick={() => setWeek(week - 1)}>
                            <i className="fas fa-chevron-left fa-2x"></i>
                        </button>
                        : 
                        <button className="unactive">
                                <i className="fas fa-chevron-left fa-2x"></i>
                        </button>
                    }
                    <span>{title}</span>
                    { week < 3 
                        ?
                        <button onClick={() => setWeek(week + 1)}>
                            <i className="fas fa-chevron-right fa-2x"></i>
                        </button>
                        :
                        <button className="unactive">
                            <i className="fas fa-chevron-right fa-2x"></i>
                        </button>
                    }
                </div>
    
                { isOffline &&
                    <div className="offline-alert">
                        <div className="text">
                            <h4>Интернет недоступен</h4>
                            <p>Данные будут сохранены при подключении</p>
                        </div>
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                }
                <TransitionGroup exit={true}>
                    <CSSTransition key={week} timeout={300} classNames="week-grid">
                        <div className="week-grid">
                            { days }
                        </div>
                    </CSSTransition>
                </TransitionGroup>

                <div className="UIBlock tools">
                    <button onClick={() => globalThis.UI.slide(globalThis.settings)}><i className="fas fa-cog"></i></button>
                </div>
            </div>
        );
    } else {
        return null;
    }
}