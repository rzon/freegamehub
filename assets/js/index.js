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

/**
 * 获取 csv 游戏内容
 * @returns {Array}
 */
function getCsvData() {
    // /assets/excel/game_list.csv
    var response;

    // 发起同步 AJAX GET 请求
    $.ajax({
        url: '/assets/excel/game_list.csv',
        type: 'GET',
        async: false, // 设置为同步
        success: function(data, status, xhr) {
            // 请求成功时的回调函数
            response = data;
            console.log('Data received: ', data);
        },
        error: function(xhr, status, error) {
            // 请求失败时的回调函数
            console.log('Request failed: ', error);
            alert('An error occurred while fetching the data. Please try again later.');
        }
    });

    // 由于请求是同步的，这里会在请求完成后执行
    if (response) {
        // 处理返回的数据
        var gameUrlLi = [];
        var li = response.split('\n');
        if (li.length > 0) {
            for (var i = 1; i < li.length; i++) {
                if (li[i]) {
                    var itemLi = li[i].split(',');
                    if (itemLi.length >= 2) {
                        gameUrlLi.push(itemLi);
                    }
                }
            }
        }
        return gameUrlLi;
    }
    return [];
}

/**
 * 追加 cardTemplateHtml
 * @param resultHtmlLi
 * @param nineGridItemTemplateHtmlLi
 */
function appendCardTemplateHtml(resultHtmlLi, nineGridItemTemplateHtmlLi) {
    var cardTemplateHtml = $("#cardTemplate").html();
    cardTemplateHtml = cardTemplateHtml.replace(/{nineGridItemContent}/g, nineGridItemTemplateHtmlLi.join(""));
    resultHtmlLi.push(cardTemplateHtml);
}

/**
 * 添加 PopularGame div
 * @param resultHtmlLi
 */
function appendPopularGameTemplateHtml(resultHtmlLi) {
    var popularGameTemplateHtml = $("#popularGameTemplate").html();
    resultHtmlLi.push(popularGameTemplateHtml);
}

/**
 * 追加 GoogleAdsTemplate
 * @param resultHtmlLi
 */
function appendGoogleAdsTemplate(resultHtmlLi) {
    var googleAdsTemplateHtml = $("#googleAdsTemplate").html();
    googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleScriptContent}/g, adsbygoogleScript);
    googleAdsTemplateHtml = googleAdsTemplateHtml.replace(/{adsbygoogleBottomScriptContent}/g, adsbygoogleBottomScript);
    resultHtmlLi.push(googleAdsTemplateHtml);
}

/**
 * csv 数据添加到 html 中
 */
function appendCsvDataToHtml() {
    var gameUrlLi = getCsvData();
    var resultHtmlLi = [];

    var nineGridItemTemplateHtmlLi = [];

    var itemCount = 9;

    var isAddPopularGame = false;
    var isAddGoogleAds = false;

    for (var i = 0; i < gameUrlLi.length; i++) {
        var nineGridItemTemplateHtml = $("#nineGridItemTemplate").html();
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gameUrl}/g, gameUrlLi[i][0].trim());
        nineGridItemTemplateHtml = nineGridItemTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][1].trim());

        nineGridItemTemplateHtmlLi.push(nineGridItemTemplateHtml);

        if (i == 8) {
            appendCardTemplateHtml(resultHtmlLi, nineGridItemTemplateHtmlLi);
            nineGridItemTemplateHtmlLi = [];

            // popularGameTemplate
            appendPopularGameTemplateHtml(resultHtmlLi);
            isAddPopularGame = true;
        } else if (nineGridItemTemplateHtmlLi.length == itemCount) {
            appendCardTemplateHtml(resultHtmlLi, nineGridItemTemplateHtmlLi);
            nineGridItemTemplateHtmlLi = [];
        }

        if (resultHtmlLi.length == 3) {
            appendGoogleAdsTemplate(resultHtmlLi);
            isAddGoogleAds = true;
        }
    }

    if (nineGridItemTemplateHtmlLi.length > 0) {
        appendCardTemplateHtml(resultHtmlLi, nineGridItemTemplateHtmlLi);
        nineGridItemTemplateHtmlLi = [];
    }

    if (!isAddPopularGame) {
        appendPopularGameTemplateHtml(resultHtmlLi);
    }
    if (!isAddGoogleAds) {
        appendGoogleAdsTemplate(resultHtmlLi);
    }

    $("#cardLayoutDiv").html(resultHtmlLi.join(""));
}

$(document).ready(function(){
    appendCsvDataToHtml();
});
