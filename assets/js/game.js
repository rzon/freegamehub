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

/**
 * csv 数据添加到 html 中
 */
function appendCsvDataToHtml() {
    var gameUrlLi = getCsvData();

    var nineGridItemTemplateHtmlLi = [];

    for (var i = 0; i < gameUrlLi.length; i++) {
        var nineGridItemTemplateHtml = $("#nineGridAreaTemplate").html();
        var gameUrl = '/game.html?game=' + gameUrlLi[i][0].trim();
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gameUrl}/g, gameUrl);
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][1].trim());

        nineGridItemTemplateHtmlLi.push(nineGridItemTemplateHtml);
    }

    $("#cardLayoutDiv").append(nineGridItemTemplateHtmlLi.join(""));
}

/**
 * 匹配游戏的 url
 * @param gameUrl
 */
function getImageURL(gameUrl) {
    var gameUrlLi = getCsvData();
    for (var i = 0; i < gameUrlLi.length; i++) {
        if (gameUrlLi[i][0].trim() == gameUrl) {
            return gameUrlLi[i][1].trim();
        }
    }
    return null;
}

/**
 * 追加 GoogleAdsTemplate
 * @param resultHtmlLi
 */
function appendGoogleAdsTemplate() {
    var googleAdsTemplateHtml = $("#googleAdsTemplate").html();
    googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleScriptContent}/g, adsbygoogleScript);
    googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleBottomScriptContent}/g, adsbygoogleBottomScript);
    $("#cardIframeAdsContentDiv").html(googleAdsTemplateHtml);
}

/**
 * 点击开始游戏
 */
function play() {
    var gameUrl = getGameUrl();
    if (gameUrl) {
        $("#cardIframeAdsDiv").css("display", "none");
        frames['gameIframe'].location.href = gameUrl;
    }
}

$(document).ready(function(){
    var gameUrl = getGameUrl();
    if (gameUrl) {
        // frames['gameIframe'].location.href = gameUrl;

        // if (getDeviceType() == 'pc') {
        // }
        var imageUrl = getImageURL(gameUrl);
        if (imageUrl) {
            $("#playGameImg").attr("src", imageUrl);
            $("#playGameImg").css("display", "block");
        }
    }
    appendCsvDataToHtml();
    appendGoogleAdsTemplate();
});
