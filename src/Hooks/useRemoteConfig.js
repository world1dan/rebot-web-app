import { useState, useEffect } from "react"

import { getValue, fetchAndActivate } from "firebase/remote-config"
import { remoteConfig } from "../Context"


export default function useRemoteConfig(configName) {

    const [config, setConfig] = useState(null)


    useEffect(() => {
        const cachedConfigJSON = localStorage.getItem("RC_CACHED_" + configName)

        if (cachedConfigJSON) {
            const object = JSON.parse(cachedConfigJSON)
            setConfig(object)
        }

        fetchAndActivate(remoteConfig).then(() => {
            const configJSON = getValue(remoteConfig, configName).asString()
            const configObject = JSON.parse(configJSON)

            localStorage.setItem("RC_CACHED_" + configName, configJSON)
            setConfig(configObject)
        })

    }, [configName])



    return config
}