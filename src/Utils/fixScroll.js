export default function fixScroll(target) {
    const onScroll = (e) => {
        const element = e.currentTarget

        if (element.scrollTop == 0) {
            element.scrollTop = 1
        } else if (
            element.scrollHeight - element.scrollTop ==
            element.clientHeight
        ) {
            element.scrollTop = element.scrollTop - 1
        }
    }
    target.scrollTop = 1
    target.addEventListener('scroll', onScroll, { passive: true })
}
