import React, { useState, useEffect } from "react"



const Time = () => {

    const [date, setDate] = useState("")

    const options = {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }

    useEffect(() => {
        const update = () => {
            // @ts-ignore
            const string = new Date().toLocaleString("ru", options)

            setDate(string)
        }

        update()

        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [])


    return (
        <div className="time">
            { date }
        </div>
    )
}



export default Time