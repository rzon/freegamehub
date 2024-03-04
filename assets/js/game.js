var IframeOnClick = {
    resolution: 200,
    iframes: [],
    interval: null,
    Iframe: function() {
        this.element = arguments[0];
        this.cb = arguments[1];
        this.hasTracked = false;
    },
    track: function(element, cb) {
        this.iframes.push(new this.Iframe(element, cb));
        if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function() { _this.checkClick(); }, this.resolution);
        }
    },
    checkClick: function() {
        if (document.activeElement) {
            var activeElement = document.activeElement;
            for (var i in this.iframes) {
                if (activeElement === this.iframes[i].element) { // user is in this Iframe
                    if (this.iframes[i].hasTracked == false) {
                        this.iframes[i].cb.apply(window, []);
                        this.iframes[i].hasTracked = true;
                    }
                } else {
                    this.iframes[i].hasTracked = false;
                }
            }
        }
    }
};

var iframes = [];

// 函数用于扫描页面并添加新创建的iframe到数组中
function scanAndAddIframes() {
    // 获取页面上的所有iframe元素
    var allIframes = document.getElementsByTagName('iframe');

    // 遍历所有iframe元素
    for (var i = 0; i < allIframes.length; i++) {
        var iframe = allIframes[i];

        // 检查iframe是否已经在数组中
        if (iframes.indexOf(iframe) === -1) {
            // 如果不在数组中，则添加到数组中
            iframes.push(iframe);
            console.log('新创建的iframe已添加到数组中:', iframe);

            IframeOnClick.track(iframe, function(innerIFrame) {
                return function() {
                    console.log("IframeOnClick", innerIFrame.id);
                    if (innerIFrame.src.indexOf("google") > -1) {
                        if (window.ttq) {
                            // 触发追踪事件
                            var gameUrl = getGameUrl();
                            window.ttq.track('CompleteRegistration', {
                                contents:[{
                                    content_id: gameUrl,
                                    content_type:"product",
                                }]
                            });
                        }
                    } else {
                        console.log("click other");
                    }
                }
            }(iframe));
        }
    }
}

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

    var leftCount = parseInt(gameUrlLi.length / 2);
    if (gameUrlLi % 2 != 0) {
        leftCount += 1;
    }

    var leftHtmlLi = [];
    for (var i = 0; i < leftCount; i++) {
        var nineGridItemTemplateHtml = $("#nineGridAreaTemplate").html();
        var gameUrl = '/game.html?game=' + gameUrlLi[i][0].trim();
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gameUrl}/g, gameUrl);
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][1].trim());
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{flag}/g, "left");

        leftHtmlLi.push(nineGridItemTemplateHtml);
    }
    $("#cardLayoutDivLeft").append(leftHtmlLi.join(""));

    var rightHtmlLi = [];
    for (var i = 0; i < leftCount; i++) {
        var nineGridItemTemplateHtml = $("#nineGridAreaTemplate").html();
        var gameUrl = '/game.html?game=' + gameUrlLi[i][0].trim();
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gameUrl}/g, gameUrl);
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][1].trim());
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{flag}/g, "leftInRight");

        rightHtmlLi.push(nineGridItemTemplateHtml);
    }
    for (var i = leftCount; i < gameUrlLi.length; i++) {
        var nineGridItemTemplateHtml = $("#nineGridAreaTemplate").html();
        var gameUrl = '/game.html?game=' + gameUrlLi[i][0].trim();
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gameUrl}/g, gameUrl);
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][1].trim());
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{flag}/g, "right");

        rightHtmlLi.push(nineGridItemTemplateHtml);
    }

    $("#cardLayoutDivRight").append(rightHtmlLi.join(""));

    /*
    var nineGridItemTemplateHtmlLi = [];
    for (var i = 0; i < gameUrlLi.length; i++) {
        var nineGridItemTemplateHtml = $("#nineGridAreaTemplate").html();
        var gameUrl = '/game.html?game=' + gameUrlLi[i][0].trim();
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gameUrl}/g, gameUrl);
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][1].trim());

        nineGridItemTemplateHtmlLi.push(nineGridItemTemplateHtml);
    }

    $("#cardLayoutDiv").append(nineGridItemTemplateHtmlLi.join(""));
    */
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
/*
function appendGoogleAdsTemplate() {
    var googleAdsTemplateHtml = $("#googleAdsTemplate").html();
    googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleScriptContent}/g, adsbygoogleScript);
    googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleBottomScriptContent}/g, adsbygoogleBottomScript);
    $("#cardIframeSuperposeContentDiv").html(googleAdsTemplateHtml);
}
*/

/**
 * 点击开始游戏
 */
function play() {
    var gameUrl = getGameUrl();
    if (gameUrl) {
        $("#cardIframeSuperposeDiv").css("display", "none");
        frames['gameIframe'].location.href = gameUrl;
        var width = $(window).width() - 10;
        var height = $(window).height() - 10;
        $("#clickPlayDialog").dialog({
            modal: true,
            title: 'Advertisement',
            width: width,
            height: height,
            open: function( event, ui ) {
                var googleAdsTemplateHtml = $("#clickPlayAdsTemplate").html();
                googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleScriptContent}/g, adsbygoogleScript);
                googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleBottomScriptContent}/g, adsbygoogleBottomScript);
                googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{width}/g, (width - 10) + "px");

                $("#clickPlayDialog").html(googleAdsTemplateHtml);
            }
        });
    }
}

function trackClickPlay() {
    // 确保TikTok像素代码已加载
    if (window.ttq) {
        // 触发追踪事件
        var gameUrl = getGameUrl();
        window.ttq.track('AddToWishlist', {});
        /*window.ttq.track('CompleteRegistration', {
            contents:[{
                content_id: gameUrl,
                content_type:"product",
            }]
        });*/

    }
    // 调用原有的play()函数
    //play();
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
    // appendGoogleAdsTemplate();
    setInterval(scanAndAddIframes, 1000); // 5000毫秒 = 5秒
});
