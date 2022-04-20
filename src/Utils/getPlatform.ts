export type PlatformTypes = 'android' | 'ios' | 'windows' | 'mac' | 'unknown'

const getPlatform = (): PlatformTypes => {
    if (navigator.userAgent.indexOf('Android') > -1) {
        return 'android'
    }

    if (
        navigator.userAgent.indexOf('iPhone') > -1 ||
        navigator.userAgent.indexOf('iPad') > -1 ||
        (navigator.userAgent.indexOf('Mac') > -1 && navigator.maxTouchPoints > 1)
    ) {
        return 'ios'
    }

    if (navigator.userAgent.indexOf('Windows') > -1) {
        return 'windows'
    }

    if (navigator.userAgent.indexOf('Mac')) {
        return 'mac'
    }

    return 'unknown'
}

export default getPlatform
