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
            // console.log('Data received: ', data);
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