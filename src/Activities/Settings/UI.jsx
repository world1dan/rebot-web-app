import React from "react"
import PropTypes from "prop-types"

import H1 from "../../Components/Typography/H1"


import Switch from "../../Components/Blocks/Switch"
import "./style.scss"
import Radio from "../../Components/Blocks/Radio"
import VerticalLayout from "../../Components/Layouts/VerticalLayout"
import Button from "../../Components/Blocks/Button"
import Updater from "./Updater"

const UI = ({ inversion, changeInversion, theme, changeTheme, logout }) => {


    return (
        <VerticalLayout>
            <H1 text="Настройки"></H1>
            <Radio
                defaultState={theme}
                onChange={(id) => changeTheme(id)}
                variants={[
                    { title: "Темная", id: "dark" },
                    { title: "Светлая", id: "light" }
                ]}/>

            <Updater/>
            <Switch
                title="Затемнять решения"
                descr="Светлый текст на темном фоне"
                icon={<i className="fas fa-moon"></i>}
                onChange={(e) => changeInversion(e.target.checked)}
                checked={inversion}
            />

            <Button text="Выйти из аккаунта" onClick={logout}/>

        </VerticalLayout>
    )
}



UI.propTypes = {

}

export default UI






/*
<div className="settings-block">
                <ThemeChanger setTheme={props.setTheme}/>

                <Switch
                    title="Затемнять решения"
                    descr="Светлый текст на темном фоне"
                    icon={<i className="fas fa-moon"></i>}
                    onChange={(e) => props.setInversion(e.target.checked)}
                    checked={props.inversion}
                />

                <Button
                    title="Выйти"
                    icon={<i className="fas fa-sign-out-alt"></i>}
                    onClick={props.logout}
                />
            </div>*/