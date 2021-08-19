import React, { useEffect, useState, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { timetableContext } from '../../../Context';
import Day from '../Day';
import './style.scss';

export default function Week(props) {
    const [ isOffline, setOffline ] = useState(!navigator.onLine);

    const [ week, setWeek ] = useState(2);



    const fullTimetable = useContext(timetableContext);

    useEffect(() => {
        window.addEventListener('online',  () => setOffline(true));
        window.addEventListener('offline', () => setOffline(true));
    }, []);
    

    const title = week==1 ? "Прошлая неделя" : week==2 ? "Эта неделя" : "Следующая неделя";
    const days = [];

    if (fullTimetable) {
        const timetable = fullTimetable[week];
        let day;
        
        for (day in timetable) {
            days.push(<Day key={day} pathToDay={week + "." + day} day_num={day} day_data={timetable[day]}/>);
        }
    }


    return (
        <div>
            <header id="week-header">
                <div className="block-style weekChanger">
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
                <button className="block-style settings-btn" onClick={() => props.setSettingsOpen(true)}><i className="fas fa-cog"></i></button>
            </header>
    
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
        </div>
    );
}