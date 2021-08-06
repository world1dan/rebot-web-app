class UI {

    static alert(text) {
        let alert = document.querySelector(".alert");
        alert.textContent = text;

        alert.style = "display: block; animation: alert 0.45s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;";

        if (window.active_timeout) {
            clearTimeout(window.active_timeout);
        }


        window.active_timeout = setTimeout(() => {

            alert.style = "display: block; animation: alert-down 0.4s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;";

            alert.addEventListener("animationend", () => {
                alert.style = "";
            }, { once: true });

            window.active_timeout = undefined;
        }, 1400);
    }

    static open(target) {
        target.style = "display: block; animation: slide-left 0.6s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;";
    }

    static slide(target) {
        target.classList.toggle("active");
    }

    static change_tab(target, btn) {
        const toClose = document.querySelector(".app.active");

        if (toClose == target) return;

        toClose.classList.remove("active");
        target.classList.add("active");

        toClose.scrollTo(0, 0);
        target.scrollTo(0, 0);

        window.scrollTo(0, 0);
        document.body.scrollTo(0, 0);

        if (btn) {
            document.querySelector(".bottom-nav span[active='true']").setAttribute("active", "false");
            btn.setAttribute("active", "true");
        }
    }

    static getInput(callback, param) {
        const searchWraper = document.querySelector("#rebot .search");

        const inputRebot = searchWraper.querySelector("input.rebot");
        const inputGoogle = searchWraper.querySelector("input.google");

        const iconGoogle = searchWraper.querySelector("img.google");
        const iconRebot = searchWraper.querySelector("img.rebot");

        inputRebot.classList.add("active");
        inputGoogle.classList.remove("active");

        inputRebot.focus();

        iconGoogle.classList.remove("active");
        iconRebot.classList.add("active");

        inputRebot.addEventListener("keydown", function handle(event) {
            if (event.key == "Enter") {
                const nums = inputRebot.value.replace(" ", "").split(',');

                callback(param, nums);

                inputRebot.blur();

                inputRebot.removeEventListener("keydown", handle);
            }
        });

        inputRebot.addEventListener("blur", function onBlur() {
            inputRebot.value = "";

            inputRebot.classList.remove("active");
            inputGoogle.classList.add("active");

            iconRebot.classList.remove("active");
            iconGoogle.classList.add("active");

            inputRebot.removeEventListener("blur", onBlur);
        }, { once: true });


    }
}

export default UI;