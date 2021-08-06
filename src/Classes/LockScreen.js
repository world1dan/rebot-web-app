import UI from "./UI";

class SecurityManager {
    constructor() {
        this.lockscreen = document.querySelector("#lockscreen");
        this.indicator = this.lockscreen.querySelector("#indicator");

        this.lockscreen.querySelectorAll("#numpad button").forEach((btn) => {
            btn.addEventListener("click", this.addCodeNum);
        });
    }
    addCodeNum(event) {
        const lockscreen = document.querySelector("#lockscreen");
        const indicator = lockscreen.querySelector("#indicator");
        const unactiveDots = indicator.querySelectorAll(".char:not(.active)");

        if (unactiveDots) {
            let password = lockscreen.getAttribute("data-password");

            password += event.target.textContent;

            lockscreen.setAttribute("data-password", password);

            unactiveDots[0].classList.add("active");
        }

        if (unactiveDots.length == 1) {
            const password = lockscreen.getAttribute("data-password");

            if (localStorage.lockCode == password) {
                lockscreen.classList.add("unactive");
            } else {
                lockscreen.setAttribute("data-password", "");
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

export default new SecurityManager();
