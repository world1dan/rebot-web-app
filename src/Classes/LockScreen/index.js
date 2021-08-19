import UI from "../UI";
import "./style.scss";

class LockScreen {
    constructor() {
        this.lockscreen = document.querySelector("#lockscreen");
        this.indicator = this.lockscreen.querySelector("#indicator");

        this.lockscreen.querySelectorAll("#numpad button").forEach((btn) => {
            btn.addEventListener("click", this.addCodeNum);
        });
    }
    addCodeNum(event) {

        event.target.classList.add("clicked");

        event.target.addEventListener("transitionend", (event) => {
            event.target.classList.remove("clicked");
        }, {once: true})
    
        const lockscreen = document.querySelector("#lockscreen");
        const indicator = lockscreen.querySelector("#indicator");
        const unactiveDots = indicator.querySelectorAll(".char:not(.active)");
        const invalidAlert = lockscreen.querySelector("#invalid-alert");


        const passwordOld = lockscreen.getAttribute("data-password");
        const password = passwordOld + event.target.textContent;

        lockscreen.setAttribute("data-password", password);
        unactiveDots[0].classList.add("active");


        if (unactiveDots.length == 1) {

            if (localStorage.lockCode == password) {
                lockscreen.classList.add("unactive");
    
                lockscreen.addEventListener("transitionend", (e) => {
                    e.target.style.display = "none";
                }, { once: true });
            } else {

                invalidAlert.classList.add("active");
                lockscreen.setAttribute("data-password", "");

                indicator.querySelectorAll(".char").forEach((char) => {
                    char.classList.remove("active");
                })
            }

        }

    }


    changeLockCode(form) {
        const oldCodeInput = form.querySelector("input#oldCode");
        const newCodeInput = form.querySelector("input#newCode");

        const oldCode = localStorage.lockCode;

        if (oldCode) {
            if (oldCodeInput.value != oldCode) {
                UI.alert("Неверный код");
                oldCodeInput.value = "";
                return;
            }
        }

        const newCode = newCodeInput.value.replace(/\D/g, '');

        if (newCode.length == 4) {
            localStorage.lockCode = newCode;
            UI.alert("Код установлен");
            UI.slide(window.securitySettings);
            oldCodeInput.value = "";
            newCodeInput.value = "";
        } else if (newCode.length == 0) {
            localStorage.lockCode = "";
            UI.alert("Код отключен");
            UI.slide(window.securitySettings);
            oldCodeInput.value = "";
            newCodeInput.value = "";
        } else {
            UI.alert("Код должен состоять из 4 цифр");
        }



    }

}

export default new LockScreen();
