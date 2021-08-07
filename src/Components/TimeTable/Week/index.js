import React, { useEffect, useState, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { database, timetableContext } from '../../../Context';
import Day from '../Day';
import './style.scss';

export default function Week() {
    const [ isOffline, setOffline ] = useState(!navigator.onLine);
    const [ week, setWeek ] = useState(2);
    const fullTimetable = useContext(timetableContext);
   

    useEffect(() => {
        window.addEventListener('online',  () => setOffline(true));
        window.addEventListener('offline', () => setOffline(true));
    }, []);
    

    if (fullTimetable) {
       const timetable = fullTimetable[week];
        const days = [];
        let day;
        
        for (day in timetable) {
            days.push(<Day key={day} pathToDay={week + "." + day} day_num={day} day_data={timetable[day]}/>);
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
                <TransitionGroup exit={false}>
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