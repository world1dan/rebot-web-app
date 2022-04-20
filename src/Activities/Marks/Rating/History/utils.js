export function sortMarks(sortingType, marks) {
    switch (sortingType) {
        case 'date-recent':
            return marks.sort((a, b) => b.time - a.time)
        case 'date-old':
            return marks.sort((a, b) => a.time - b.time)
        case 'mark':
            return marks.sort((a, b) => b.mark - a.mark)
        case 'user':
            return marks.sort((a, b) => a.username.localeCompare(b.username))
    }
}
