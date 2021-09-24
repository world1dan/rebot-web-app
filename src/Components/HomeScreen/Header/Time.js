import React, { useState, useEffect } from 'react'

export default function Time() {

    const [date, setDate] = useState("");


    useEffect(() => {

        const update = () => {
            const date = new Date();

            const options = {
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }

            const string = date.toLocaleString("ru", options)

            setDate(string)
        }

        update();
        setInterval(update, 1000);
        
    }, [])


    return (
        <div className="time">
            { date }
        </div>
    )
}
