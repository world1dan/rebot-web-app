import { useMemo } from 'react'
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
}

const useCloseGesture = (handleClose, swipeConfidenceThreshold = 10000) => {
    const onDragEnd = (_e, { offset, velocity }) => {
        const swipe = swipePower(offset.y, velocity.y)
        console.log(swipe)
        if (swipe > swipeConfidenceThreshold) {
            handleClose()
        }
    }

    const bind = useMemo(() => {
        return {
            onDragEnd,
        }
    }, [swipeConfidenceThreshold])
    return bind
}

export default useCloseGesture
