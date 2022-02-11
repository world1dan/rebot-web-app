const cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/

const parseCSSVariable = (current) => {
    const match = cssVariableRegex.exec(current)
    if (!match) return [,]

    const [, token, fallback] = match
    return [token, fallback]
}

export const changeThemeColor = (color) => {
    const meta = document.querySelector('meta[name=theme-color]')

    if (color.startsWith('var')) {
        meta.content = getComputedStyle(
            document.documentElement
        ).getPropertyValue(parseCSSVariable(color)[0])
    } else {
        meta.content = color
    }
}
