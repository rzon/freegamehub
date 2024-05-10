/**
 * csv 数据添加到 html 中
 */
function appendCsvDataToHtml() {
    var gameUrlLi = getCsvData();
    var htmlLi = [];
    for (var i = 0; i < gameUrlLi.length; i++) {
        var gameTemplateHtml = $("#gameTemplate").html();
        gameTemplateHtml = gameTemplateHtml.replace(/{gameUrl}/g, gameUrlLi[i][0].trim());
        if (gameUrlLi[i][2] && gameUrlLi[i][2].trim()) {
            gameTemplateHtml = gameTemplateHtml.replace(/{gamePic}/g, gameUrlLi[i][2].trim());
            htmlLi.push(gameTemplateHtml);
        }
    }
    $("#gameArea").append(htmlLi.join(""));
}

$(document).ready(function(){
    appendCsvDataToHtml();
});
