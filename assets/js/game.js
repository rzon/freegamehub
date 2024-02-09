function getGameUrl() {
    var currentUrl = window.location.href; // 获取当前页面的完整 URL
    var currentUrlObj = new URL(currentUrl);
    var currentParams = new URLSearchParams(currentUrlObj.search);
    var currentGameParamValue = currentParams.get('game');

    // console.log(currentGameParamValue); // 输出当前 URL 中的 game 参数值
    return currentGameParamValue;
}

function iframeLoadFunc() {
    if (getDeviceType() == 'pc') {
        // console.log("^^^^^^^^^^^^^^^ iframeLoadFunc ^^^^^^^^^^^^^^^^^^^^");
        var iframeContentWindow = document.getElementById("gameIframeElem").contentWindow;
        var iframeWidth = parseInt($("#gameIframeElem").width());
        var iframeHeight = parseInt($("#gameIframeElem").height());
        var iframeCanvas = iframeContentWindow.canvas;
        if (iframeCanvas) {
            iframeCanvas.style.width = iframeWidth + "px";
            iframeCanvas.style.height = iframeHeight + "px";
        }
    }
}

$(document).ready(function(){
    var gameUrl = getGameUrl();
    if (gameUrl) {
        frames['gameIframe'].location.href = gameUrl;

        if (getDeviceType() == 'pc') {
            // var iframeCanvas = frames['gameIframe'].contentWindow.canvas;
            // console.log("style is:" + iframeCanvas.style);
        }
    }
});
