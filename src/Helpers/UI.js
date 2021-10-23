
const getInput = (callback, param) => {

    const searchWraper = document.querySelector("#rebot .search")

    const inputRebot = searchWraper.querySelector("input.rebot")
    const inputGoogle = searchWraper.querySelector("input.google")

    const iconGoogle = searchWraper.querySelector("img.google")
    const iconRebot = searchWraper.querySelector("img.rebot")

    inputRebot.classList.add("active")
    inputGoogle.classList.remove("active")

    inputRebot.focus()

    iconGoogle.classList.remove("active")
    iconRebot.classList.add("active")

    inputRebot.addEventListener("keydown", function handle(event) {
        if (event.key == "Enter") {
            const nums = inputRebot.value.replace(" ", "").split(",")

            callback(param, nums)

            inputRebot.value = ""
            inputRebot.blur()

            inputRebot.removeEventListener("keydown", handle)
        }
    })

    inputRebot.addEventListener("blur", function onBlur() {
        const nums = inputRebot.value.replace(" ", "").split(",")

        if (inputRebot.value) {
            callback(param, nums)
            inputRebot.value = ""
        } else {
            inputRebot.value = ""
        }

        inputRebot.classList.remove("active")
        inputGoogle.classList.add("active")

        iconRebot.classList.remove("active")
        iconGoogle.classList.add("active")

        inputRebot.removeEventListener("blur", onBlur)
    }, { once: true })

}

export default getInput
