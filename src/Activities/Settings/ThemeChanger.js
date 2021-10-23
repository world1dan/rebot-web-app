import React from 'react'


function ThemeChanger(props) {

    function setTheme(e) {
        const theme = e.target.id;
        props.setTheme(theme);

        const meta = document.querySelector('meta[name=theme-color]')
        meta.content = getComputedStyle(document.documentElement).getPropertyValue('--background2');
    }

    return (
        <div className="theme panel-element">
            <span className="circle" id="dark" style={{ backgroundColor: "#0F0F0F" }} onClick={setTheme}></span>
            <span className="circle" id="light" style={{ backgroundColor: "#fff" }} onClick={setTheme}></span>
        </div>
    )
}


export default ThemeChanger;
