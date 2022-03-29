import useInterval from './useInterval'
import useLocalStorage from './useLocalStorage'

const useSubjectsManifest = () => {
    const [manifest, setManifest] = useLocalStorage('CACHED_MANIFEST')

    const updateManifestFromServer = () => {
        const url =
            'https://rebot-f643e-default-rtdb.europe-west1.firebasedatabase.app/subjects-manifest.json'

        fetch(url).then(async (resp) => {
            const data = await resp.json()

            if (!data?.error) {
                setManifest(data)
            }
        })
    }

    useInterval(() => {
        if (process.env.NODE_ENV == 'production' || !manifest) {
            updateManifestFromServer()
        }
    }, 600000)

    return manifest
}

export default useSubjectsManifest
