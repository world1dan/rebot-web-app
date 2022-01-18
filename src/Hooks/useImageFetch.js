import { useEffect, useState } from "react"

const useImageFetch = (url) => {
    const [image, setImage] = useState(null)
    const [loaded, setLoaded] = useState(true)
    const [failed, setFailed] = useState(false)



    const loadImage = async () => {

        console.log(url)
        const response = await fetch(url, {
            method: 'GET',

            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        console.log(response)
        const blob = await response.blob()

        const imageObjectURL = URL.createObjectURL(blob);
        
        setImage(imageObjectURL)
    }



    useEffect(loadImage, [url])

    return { image, loaded, failed }
    
}

export default useImageFetch