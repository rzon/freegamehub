// 定义事件名称映射对象，将自定义事件名称映射到标准化的名称
const eventNameMap = {
    am_hd: 'view_promotion',
    am_md: 'select_item'
  };
  
  // 跟踪广告点击事件
  function trackAdClick() {
    const activeElement = document.activeElement; // 获取当前活动的DOM元素
    const adIframes = document.querySelectorAll('.adsbygoogle iframe'); // 获取所有.adsbygoogle类下的iframe元素
    const adContainers = document.querySelectorAll('.adsbygoogle'); // 获取所有.adsbygoogle类的容器元素
  
    // 检查是否点击了广告
    if (adIframes.length > 0 && adContainers.length > 0) {
      const adIframeElements = [...adIframes]; // 将NodeList转换为数组
      const adContainerElements = [...adContainers]; // 将NodeList转换为数组
      const isAdActive = activeElement && activeElement.tagName.toLowerCase() === 'iframe' && adIframeElements.includes(activeElement); // 检查活动元素是否是广告iframe
      const isAdContainerClicked = adContainerElements.some(container => container.contains(activeElement)); // 检查活动元素是否在广告容器内
  
      if (isAdActive && isAdContainerClicked && adContainerElements.some(container => container.getAttribute('data-ad-status') === 'filled')) {
        const eventName = 'ad_interaction'; // 定义事件名称
        gtag('event', eventName); // 触发 Google 分析事件
        triggerThirdPartyEvent(eventName); // 触发第三方事件
  
        // 记录点击次数
        const clickCountKey = `${eventName}_click_count`;
        let clickCount = parseInt(sessionStorage.getItem(clickCountKey), 10) || 0;
        clickCount++;
        gtag('event', `${eventName}_${clickCount}`); // 触发带有计数的 Google 分析事件
        sessionStorage.setItem(clickCountKey, clickCount);
      }
    }
  }
  
  // 触发第三方事件
  function triggerThirdPartyEvent(eventName) {
    if (ttq) { // 检查第三方分析工具是否已定义
      ttq.track(eventName, {
        contents: [
          {
            content_id: categoryForAm,
            content_type: 'product'
          }
        ]
      });
  
      const replacedEventName = eventNameMap[eventName]; // 获取映射后的标准事件名称
      if (replacedEventName) {
        ttq.track(replacedEventName, {
          contents: [
            {
              content_id: categoryForAm,
              content_type: 'product'
            }
          ]
        });
      }
    }
  }
  
  // 跟踪模糊事件
  function trackBlurEvent() {
    const activeElement = document.activeElement; // 获取当前活动的DOM元素
    const adIframes = document.querySelectorAll('.adsbygoogle iframe'); // 获取所有.adsbygoogle类下的iframe元素
    const adContainers = document.querySelectorAll('.adsbygoogle'); // 获取所有.adsbygoogle类的容器元素
  
    // 检查是否离开了广告
    if (adIframes.length > 0 && adContainers.length > 0) {
      const adIframeElements = [...adIframes]; // 将NodeList转换为数组
      const adContainerElements = [...adContainers]; // 将NodeList转换为数组
      const isAdActive = activeElement && activeElement.tagName.toLowerCase() === 'iframe' && adIframeElements.includes(activeElement); // 检查活动元素是否是广告iframe
      const isAdContainerBlurred = !adContainerElements.some(container => container.contains(activeElement)); // 检查活动元素是否不在广告容器内
  
      if (isAdActive && isAdContainerBlurred) {
        const eventName = 'ad_blur'; // 定义事件名称
        gtag('event', eventName); // 触发 Google 分析事件
        triggerThirdPartyEvent(eventName); // 触发第三方事件
  
        const replacedEventName = eventNameMap[eventName]; // 获取映射后的标准事件名称
        if (replacedEventName) {
          gtag('event', replacedEventName); // 触发替换后的 Google 分析事件
          triggerThirdPartyEvent(replacedEventName); // 触发替换后的第三方事件
        }
  
        // 模拟页面跳转
        setTimeout(() => {
          window.location.reload();
        }, 3000);
  
        // 移除事件监听器
        window.removeEventListener('blur', trackBlurEvent);
      }
    }
  }
  
  // 绑定事件监听器
  document.addEventListener('blur', trackAdClick); // 当页面失去焦点时调用trackAdClick
  document.addEventListener('focus', () => { // 当页面获得焦点时
    if (document.visibilityState === 'visible') { // 检查页面是否可见
      trackAdClick(); // 调用trackAdClick函数
    }
  });
  window.addEventListener('visibilitychange', trackAdClick); // 当页面可见性变化时调用trackAdClick
  window.addEventListener('blur', trackBlurEvent); // 当页面失去焦点时调用trackBlurEvent  