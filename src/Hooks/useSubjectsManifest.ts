import useInterval from './useInterval'
import useLocalStorage from './useLocalStorage'

import { ISubjectsManifest } from '../types'

const useSubjectsManifest = () => {
    const [manifest, setManifest] = useLocalStorage('CACHED_MANIFEST')

    const updateManifestFromServer = async () => {
        const url =
            'https://rebot-f643e-default-rtdb.europe-west1.firebasedatabase.app/subjects-manifest.json'

        const responce = await fetch(url)
        const data = await responce.json()

        if (!data.error) {
            setManifest(data)
        }
    }

    useInterval(() => {
        if (process.env.NODE_ENV == 'production' || !manifest) {
            updateManifestFromServer()
        }
    }, 600000)

    return manifest as ISubjectsManifest
}

export default useSubjectsManifest
