import { useState, useEffect } from "react"


export default function useSubjectsManifest() {

    const [manifest, setManifest] = useState(null)

    useEffect(() => {
        const cachedConfigJSON = localStorage.getItem("CACHED_MANIFEST")

        if (cachedConfigJSON) {
            setManifest(JSON.parse(cachedConfigJSON))
        }

        const url = 'https://rebot-f643e-default-rtdb.europe-west1.firebasedatabase.app/subjects-manifest.json'

        fetch(url).then(async(resp) => {
            const data = await resp.json()

            if (!data?.error) {
                setManifest(data)
                localStorage.setItem("CACHED_MANIFEST", JSON.stringify(data))
            }
        })
    }, [])


    return manifest
}
