var initialY = null


export default function useScrollFix() {
    const onTouchStart = (e) => {
        initialY = e.touches[0].clientY
    }

    const onTouchMove = (e) => {
        if (initialY === null) return

        const currentY = e.touches[0].clientY
        const diffY = initialY - currentY
    
        if (e.target.scrollWidth != e.target.clientWidth) return
    
        const el = e.currentTarget

        if ((diffY > 0 && el.scrollHeight - el.scrollTop <= el.clientHeight) || el.scrollTop == 0) {
            e.preventDefault()
        }

        initialY = null
    }

    return { onTouchStart, onTouchMove }
}