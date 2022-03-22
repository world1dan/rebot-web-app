const generateMatrix = (year, month) => {
    const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const matrix = []

    const firstDay = new Date(year, month, 0).getDay()

    let maxDays = nDays[month]

    if (month == 1) {
        // February
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            maxDays += 1
        }
    }

    let counter = 1

    for (let row = 1; row < 7; row++) {
        matrix[row] = []
        for (let col = 0; col < 7; col++) {
            matrix[row][col] = -1
            if (row == 1 && col >= firstDay) {
                // Fill in rows only after the first day of the month
                matrix[row][col] = counter++
            } else if (row > 1 && counter <= maxDays) {
                // Fill in rows only if the counter’s not greater than
                // the number of days in the month
                matrix[row][col] = counter++
            }
        }
    }

    return matrix
}

export default generateMatrix
