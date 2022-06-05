const isMobile = () => {
    const device = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(device)) {
        return true;
    } else {
        return false;
    }
}
export {isMobile}
