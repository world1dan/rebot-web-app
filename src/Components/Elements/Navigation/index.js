
import React from 'react';

import { Icon28Search, Icon28HomeOutline, Icon28EducationOutline, Icon28CalendarOutline } from '@vkontakte/icons';

import './style.scss';

import NavButton from './NavButton';

export default function Navigation(props) {

    return (
        <div className="bottom-nav">
            <div className="nav-content">
                <NavButton
                    title={"Главная"}
                    icon={Icon28HomeOutline}
                    setActiveTab={() => props.setActiveTab(1)} 
                    isActive={props.activeTab==1}
                />
                <NavButton
                    title={"Поиск"}
                    icon={Icon28Search}
                    setActiveTab={() => props.setActiveTab(2)} 
                    isActive={props.activeTab==2}
                />
                <NavButton
                    title={"Оценки"}
                    icon={Icon28EducationOutline}
                    setActiveTab={() => props.setActiveTab(3)} 
                    isActive={props.activeTab==3}
                />
                <NavButton 
                    title={"Неделя"}
                    icon={Icon28CalendarOutline}
                    setActiveTab={() => props.setActiveTab(5)} 
                    isActive={props.activeTab==5}
                />
            </div>
        </div>
    )
}