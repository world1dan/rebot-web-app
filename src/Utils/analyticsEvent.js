const ANALYTICS_URL = 'https://world1dan.pythonanywhere.com/report'

export default function analyticsEvent(payload = {}) {
    if (process.env.NODE_ENV !== 'development') {
        try {
            fetch(ANALYTICS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors',
                body: JSON.stringify(payload),
            })
        } catch (e) {
            console.log('ANALYTICS_ERROR: ', e.message)
        }
    }
}
