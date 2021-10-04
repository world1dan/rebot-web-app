


export default function getAdaptivity() {

    const userAgent = navigator.userAgent.toLowerCase();

    const isIpad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const isMobileSafari = /iPad|iPhone/.test(navigator.platform) || isIpad;

    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(puffin(?!.*(IP|AP|WP))))/.test(userAgent) || isIpad;
    const canSplit = window.screen.width > 800;

    const isPortrait = window.matchMedia("(orientation: portrait)");
    const isLandscape = window.matchMedia("(orientation: landscape)");

    return {
        isIpad, isMobileSafari, isTablet, canSplit, isPortrait, isLandscape
    }
}