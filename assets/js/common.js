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
        url: '/assets/excel/game_list.csv?date=' + (new Date().getTime()),
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