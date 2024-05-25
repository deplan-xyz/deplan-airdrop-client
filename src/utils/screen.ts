export const isDesktop = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const desktopOS = ['windows', 'macintosh', 'linux'];
    const isLargeScreen = window.innerWidth > 1024 && window.innerHeight > 768;
    const isDesktopOS = desktopOS.some((os) => userAgent.includes(os));

    return isLargeScreen || isDesktopOS;
};
