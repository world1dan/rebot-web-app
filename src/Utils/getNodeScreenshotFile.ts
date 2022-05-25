import { toBlob } from 'html-to-image'

const getNodeScreenshotFile = async (node: HTMLElement, filename: string) => {
    const blob = await toBlob(node)

    if (!blob) return null

    return new File([blob], filename, { type: 'image/png' })
}

export default getNodeScreenshotFile
