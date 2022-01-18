import useImageFetch from 'Hooks/useImageFetch'
import React from 'react'

export const ImageWithLoader = ({ url }) => {

    const { image, loading, failed } = useImageFetch(url)


    return (
        <img src={image} width='100%'/>
    )
}
