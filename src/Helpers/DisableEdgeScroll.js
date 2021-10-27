
var initialY = null


export default function DisableEdgeScroll (container) {

    const startTouch = (e) => {
        initialY = e.touches[0].clientY
    }

    const moveTouch = (e) => {
        if (initialY === null) return
        
        const currentY = e.touches[0].clientY

        const diffY = initialY - currentY



        if (e.target.scrollWidth != e.target.clientWidth) return


        if (diffY > 0) {
            if (container.scrollHeight - container.scrollTop <= container.clientHeight) {
                e.preventDefault()
            }
        } else {
            if (container.scrollTop == 0) {
                e.preventDefault()
            }
        }  
        initialY = null
    }

    container.addEventListener("touchstart", startTouch, {passive: false})
    container.addEventListener("touchmove", moveTouch, {passive: false})
} 

