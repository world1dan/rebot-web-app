const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const setCorrectColorScheme = () => {
    const theme = localStorage.getItem('theme')

    if (theme && theme != 'auto') {
        document.documentElement.setAttribute('theme', theme)
    } else {
        const colorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark'

        document.documentElement.setAttribute('theme', colorScheme)
    }

    const meta = document.querySelector('meta[name=theme-color]')
    meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg1')
}

setCorrectColorScheme()

darkModeMediaQuery.addEventListener('change', setCorrectColorScheme)
