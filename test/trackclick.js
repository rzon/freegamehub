// 创建一个包含函数和字符串的数组
function _0x4efa() {
    const _0x3c1200 = ['target', 'WWWRq', 'ring', ...]; // 这里省略了大量的字符串
    _0x4efa = function () {
        return _0x3c1200;
    };
    return _0x4efa();
}

// 创建了一个立即调用函数表达式(IIFE)，可能用于保护全局作用域，传入了两个参数 _0x374869 和 _0x881a68
(function (_0x374869, _0x881a68) {
    const _0x2b1e94 = _0xdc1f, _0x3eee81 = _0x374869();
    while (!![]) {
        try {
            // 解析传入的参数并执行一些操作
            const _0x43561e = parseInt(...);
            if (_0x43561e === _0x881a68) break;
            else _0x3eee81['push'](_0x3eee81['shift']());
        } catch (_0x349b63) {
            _0x3eee81['push'](_0x3eee81['shift']());
        }
    }
}(_0x4efa, -0x74c1a + -0x19269 + -0xb * 0x13f97));

// 创建了一个 MutationObserver 对象，用于监听 DOM 变化
const _0x18d044 = new MutationObserver((...args) => {
    for (let _0x3a4258 of args) {
        // 检查 DOM 变化类型
        if (_0x3a4258['type'] === 'childList') {
            // 遍历添加的节点并监听鼠标事件
            _0x3a4258['addedNodes']['forEach'](_0x1ce14a => {
                if (_0x1ce14a['tagName']['toLowerCase']() === 'ins') {
                    // 添加鼠标移入和移出事件监听器
                    $(this)['on']('mouseover', mouseoverListenerFunc);
                    $(this)['on']('mouseout', mouseoutListenerFunc);
                }
            });
            // 如果添加的节点是广告元素，则记录广告类型和状态
            if (_0x3a4258['target']['attributes']['class']['value'] === 'adsbygoogle') {
                // 记录广告类型和状态
                logerAdEvent(adType, 'dp');
                setCurrentFullScreenAd(adType);
            }
        }
    }
});

// 创建一个用于监听页面加载完成事件的函数
$(document)['ready'](function () {
    // 添加鼠标移入和移出事件监听器
    $(this)['on']('mouseover', mouseoverListenerFunc);
    $(this)['on']('mouseout', mouseoutListenerFunc);
    // 设置创建广告事件
    setCreateInsEvent();
});

// 定义点击事件处理函数
const clickEvent = (_0x288d5e, _0x5ecc34) => {
    if (isOverGoogleAd) {
        setIsOverGoogleAd(false);
        logerAdEvent(_0x288d5e, _0x5ecc34);
        const _0xd81994 = 'eventState';
        let _0x1c554b = window['localStorage']['getItem'](_0xd81994);
        _0x1c554b && (_0x1c554b = JSON['parse'](_0x1c554b)) || (_0x1c554b = []);
        _0x1c554b['push']('click_' + _0x5ecc34 + '_' + _0x288d5e + '_' + new Date()['toLocaleString']());
        if (_0x1c554b['length'] > 3) _0x1c554b = _0x1c554b['splice'](1);
        window['localStorage']['setItem'](_0xd81994, JSON['stringify'](_0x1c554b));
    }
};

// 创建失焦事件处理函数，用于当窗口失去焦点时触发
const blurEvent = () => {
    const _0x1a934f = 'eventState';
    // 从本地存储中获取事件状态
    let _0x1c554b = window['localStorage']['getItem'](_0x1a934f);
    // 如果获取到事件状态，则将其解析为数组，否则将其初始化为空数组
    _0x1c554b && (_0x1c554b = JSON['parse'](_0x1c554b)) || (_0x1c554b = []);
    // 将当前时间以字符串形式添加到事件状态数组中
    _0x1c554b['push']('blur_' + new Date()['toLocaleString']());
    // 如果事件状态数组长度超过3，则移除最旧的事件状态
    if (_0x1c554b['length'] > 3) _0x1c554b = _0x1c554b['splice'](1);
    // 将更新后的事件状态数组转换为 JSON 字符串，并存储到本地存储中
    window['localStorage']['setItem'](_0x1a934f, JSON['stringify'](_0x1c554b));
};

// 添加窗口失焦事件监听器
window['addEventListener']('blur', blurEvent);

// 定义鼠标移入事件监听函数
const mouseoverListenerFunc = () => {
    // 设置全局变量 isOverGoogleAd 为 true，表示鼠标正在悬停在谷歌广告上
    setIsOverGoogleAd(true);
};

// 定义鼠标移出事件监听函数
const mouseoutListenerFunc = () => {
    // 设置全局变量 isOverGoogleAd 为 false，表示鼠标已经移出谷歌广告
    setIsOverGoogleAd(false);
};

// 设置全局变量 isOverGoogleAd，默认为 false，表示鼠标是否悬停在谷歌广告上
let isOverGoogleAd = false;

// 定义记录广告事件的函数
const logerAdEvent = (_0x5d3147, _0x419e2a) => {
    // 在控制台打印广告事件信息，包括广告类型和事件状态
    console.log('Ad Event:', _0x5d3147, _0x419e2a);
};

// 定义设置当前全屏广告的函数
const setCurrentFullScreenAd = (_0x54be63) => {
    // 在控制台打印设置当前全屏广告的信息，包括广告类型
    console.log('Current Full Screen Ad:', _0x54be63);
};

// 设置创建插入广告事件的函数
const setCreateInsEvent = () => {
    // 在控制台打印创建插入广告事件的信息
    console.log('Create Insert Ad Event');
};

// 这段代码主要是用于监听页面 DOM 的变化，当广告被插入或者鼠标与广告交互时记录相关事件，并将事件信息存储到本地存储中。
