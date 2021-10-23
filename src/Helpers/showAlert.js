import "./Alert.css"

export const showAlert = (text) => {

    const alert = document.querySelector(".alert")

    alert.textContent = text
    alert.style = "display: block; animation: alert 0.45s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;"

    if (globalThis.active_timeout) {
        clearTimeout(globalThis.active_timeout)
    }

    globalThis.active_timeout = setTimeout(() => {

        alert.style = "display: block; animation: alert-down 0.4s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;"

        alert.addEventListener("animationend", () => {
            alert.style = ""
        }, { once: true })

        globalThis.active_timeout = null
    }, 1400)
}