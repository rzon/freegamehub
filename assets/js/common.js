/**
 * 判断是移动端, 还是 pc 端
 * @returns {*}
 */
function getDeviceType() {
    var userAgent = navigator.userAgent;
    if(/Mobi|Android/i.test(userAgent)) {
        return "mobile";
    } else {
        return "pc";
    }
}
