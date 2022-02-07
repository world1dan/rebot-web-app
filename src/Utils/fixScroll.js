
export default function fixScroll(target) {

    const onScroll = (e) => {
        const element = e.currentTarget

        if (element.scrollTop == 0) {
            element.scrollTop = 1
        } else if (element.scrollHeight - element.scrollTop == element.clientHeight) {
            element.scrollTop = element.scrollTop - 1
        }
    }
    target.scrollTop = 1
    target.addEventListener("scroll", onScroll, { passive: true })
}


/*


const onTouchStart = (e) => {

        if (e.currentTarget.scrollTop == 0) {
            e.currentTarget.scrollTop = 1
        } else if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight) {
            e.currentTarget.scrollTop = e.currentTarget.scrollTop - 1
        }
    
        initialY = e.touches[0].clientY
    }

    const onTouchMove = (e) => {
        if (initialY === null) return

        const currentY = e.touches[0].clientY
        const diffY = initialY - currentY

        if (e.target.scrollWidth != e.target.clientWidth) return

        const el = e.currentTarget
        if (e.currentTarget.scrollTop == 0) {
            e.currentTarget.scrollTop = 1
        } else if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight) {
            e.currentTarget.scrollTop = e.currentTarget.scrollTop - 1
        }
        if (diffY > 0) {
            if (el.scrollHeight - el.scrollTop <= el.clientHeight) {
                e.preventDefault()
            }
        } else {
            if (el.scrollTop == 0) {
                el.scrollTop = 1
            }
        }  
        initialY = null
    }
*/