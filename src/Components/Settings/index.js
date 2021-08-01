import { setDoc, onSnapshot } from "firebase/firestore";

import './style.scss';



export default class SettingsManager {
    constructor(settings) {

        this.settings = settings;

        onSnapshot(settings, (doc) => {
            if (doc.data() == undefined) {
                setDoc(this.settings, {
                    "inversion_set": true,
                    "stealth_set": false,
                    "theme": "dark"
                });
            }

            if (!doc.metadata.hasPendingWrites) {
                let config = doc.data();
                for (let i in doc.data()) {
                    localStorage[i] = config[i];
                }
                this.load();
            }
        });
    }

    load() {
        if (localStorage.stealth_set == "true") {
            document.querySelector('#stealth_set').checked = true;

            document.querySelectorAll(".stealth").forEach(el => {
                el.style.display = "none";
            });

            document.querySelectorAll(".subject-block").forEach(el => {
                el.style.gridTemplateColumns = "88px 1fr";
            });
        }
        if (localStorage.inversion_set == "true") {
            document.querySelector('#inversion_set').checked = true;
            document.documentElement.style.setProperty('--inv', 0.87);
        } else {
            document.documentElement.style.setProperty('--inv', 0);
            document.querySelector('#inversion_set').checked = false;
        }

        if (localStorage.theme) {
            document.documentElement.setAttribute("theme", localStorage.theme);
        }

    }


    set(checkbox) {
        localStorage.setItem(checkbox.id, checkbox.checked);
        setDoc(this.settings, {
            [checkbox.id]: checkbox.checked
        }, { merge: true });

        if (checkbox.id == "stealth_set") {
            if (checkbox.checked) {
                window.UI.alert("Стелс мод включен)");
            } else {
                location.reload();
            }
        }

        this.load();
    }

    set_theme(theme) {
        document.documentElement.setAttribute("theme", theme);
        window.UI.alert("Тема изменена");

        setDoc(this.settings, {
            "theme": theme
        }, { merge: true });

        localStorage.setItem("theme", theme);
    }

}
