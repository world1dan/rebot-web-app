import React, { useEffect, useState, useImperativeHandle } from "react";
import SideView from "../Elements/SideView";
import SettingsUI from "./SettingsUI";
import './style.scss';


export default React.forwardRef(function Settings(props, ref) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        setSettingsOpen
    }));

    const [inversionState, setInversionState] = useState();

    useEffect(() => {
        const state = localStorage.inversion == "true" ? true : false;

        if (!state) {
            document.documentElement.style.setProperty('--inv', 0);
        } else {
            document.documentElement.style.removeProperty('--inv');
        }

        setInversionState(state);
    }, []);


    function setInversion(state) {
        if (!state) {
            document.documentElement.style.setProperty('--inv', 0);
        } else {
            document.documentElement.style.removeProperty('--inv');
        }
        localStorage.setItem("inversion", state);
        
        setInversionState(state);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute("theme", theme);
        localStorage.setItem("theme", theme)
    }

    function logout() {
        localStorage.user = null;
        window.location = "./auth.html"
    }


    return (
        <SideView
            id="settings"
            open={settingsOpen}
            title="Настройки"
            onClose={() => setSettingsOpen(false)}
            backgroundRef={props.backgroundRef}
            side="right">

            <SettingsUI
                logout={logout}
                inversion={inversionState}
                setInversion={setInversion}
                setTheme={setTheme}
            />
        </SideView>
    );
});