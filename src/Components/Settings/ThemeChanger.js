import React from 'react'


function ThemeChanger(props) {

    function setTheme(e) {
        const theme = e.target.id;
        props.setTheme(theme);
    }

    return (
        <div className="theme panel-element">
            <span className="circle" id="purple" style={{ backgroundColor: "#360A6C" }} onClick={setTheme}></span>
            <span className="circle" id="blue" style={{ backgroundColor: "#0A1B3C" }} onClick={setTheme}></span>
            <span className="circle" id="dark" style={{ backgroundColor: "#0F0F0F" }} onClick={setTheme}></span>
            <span className="circle" id="ultraDark" style={{ backgroundColor: "#000" }} onClick={setTheme}></span>
            <span className="circle" id="light" style={{ backgroundColor: "#F2F3F4" }} onClick={setTheme}></span>
        </div>
    )
}


export default ThemeChanger;
