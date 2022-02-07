import { useState, useEffect } from 'react'

export default function useSubjectsManifest() {
    const [manifest, setManifest] = useState(() => {
        const cachedConfigJSON = localStorage.getItem('CACHED_MANIFEST')

        if (cachedConfigJSON) {
            return JSON.parse(cachedConfigJSON) ?? null
        }
    })

    const updateManifestFromServer = () => {
        const url =
            'https://rebot-f643e-default-rtdb.europe-west1.firebasedatabase.app/subjects-manifest.json'

        fetch(url).then(async (resp) => {
            const data = await resp.json()

            if (!data?.error) {
                setManifest(data)
                localStorage.setItem('CACHED_MANIFEST', JSON.stringify(data))
            }
        })
    }
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            updateManifestFromServer()

            const interval = setInterval(updateManifestFromServer, 1200000)
            return () => clearInterval(interval)
        }
    }, [])

    return manifest
}
