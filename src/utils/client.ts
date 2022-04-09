/**
 * 判断是否在服务端
 * @type {Boolean}
 */
export const isServer = (() => {
  const ret = typeof window === "undefined";
  return () => ret;
})();

/**
 * 判断是否在客户端
 * @type {Boolean}
 */
export const isClient = () => {
  return !isServer();
};

/**
 * object转query
 * @param {Object} object参数
 * @return {String} query参数
 * @example {x:1,y:2}转化为x=1&y=2
 */
export const formatQuery = (obj: string | object) => {
  const retArr = Object.entries(obj).map(([key, val]) => {
    let queryVal = "";
    if (typeof val === "object") {
      queryVal = JSON.stringify(val);
    } else {
      queryVal = val;
    }
    const retStr = `${key}=${encodeURIComponent(queryVal)}`;
    return retStr;
  });
  return retArr.join("&");
};

/**
 * 判断是否在iOS中
 * @return {Boolean}
 */
export const isInIOS = (() => {
  if (isClient()) {
    const ua = navigator.userAgent;
    const ret = !!ua.match(/iphone|ipad|ipod/i);
    return () => ret;
  }
})();

/**
 * 判断是否在微信中(包含微信H5, 微信小程序)
 * @type {Boolean}
 */
export const isInWechat = (() => {
  if (isClient()) {
    const ua = navigator.userAgent;
    const ret = !!ua.match(/micromessenger/i);
    return () => ret;
  }
})();

/**
 * 判断是否在快应用
 */
export const isInQuickApp = (() => {
  const ua = navigator.userAgent;
  const ret = ua.includes("mode-quickapp");
  return () => ret;
})();

/**
 * 判断是否在百度小程序
 */
export const isInBaidu = (() => {
  const ua = navigator.userAgent;
  const ret = /swan\//.test(ua) || /^webswan-/.test((window as any).name);
  return () => ret;
})();

/**
 * 判断是否在头条小程序
 */
export const isInToutiao = (() => {
  const ua = navigator.userAgent;
  const ret = !!ua.match(/toutiaomicroapp/i);
  return () => ret;
})();

/**
 * 判断是否在支付宝中
 */
export const isInAlipay = (() => {
  const ua = navigator.userAgent;
  const ret = !!ua.match(/AlipayClient/i);
  return () => ret;
})();

/**
 * 判断是否在支付宝小程序
 */
export const isInAlipayMp = (() => {
  const ua = navigator.userAgent;
  const ret = isInAlipay() && !!ua.match(/MiniProgram/i);
  return () => ret;
})();

/**
 * 判断是否在支付宝H5中
 */
export const isInAlipayH5 = (() => {
  const ret = isInAlipay() && !isInAlipayMp();
  return () => ret;
})();

/**
 * 判断是否在QQ小程序
 */
export const isInQQ = (() => {
  const ua = navigator.userAgent;
  const ret = ua.includes("qq");
  return () => ret;
})();

/**
 * 判断是否需要适配iphoneX
 */
export const isIPhoneXSeries = (() => {
  const ret = (() => {
    const ua = navigator.userAgent;

    if (ua.match(/iphone/i)) {
      const xSeriesConfig = [
        {
          devicePixelRatio: 3, // iPhone X, iPhone Xs
          width: 375,
          height: 812,
        },
        {
          devicePixelRatio: 2, // iPhone XR, iPhone 11
          width: 414,
          height: 896,
        },
        {
          devicePixelRatio: 3, // iPhone Xs Max, iPhone 11 Pro Max
          width: 414,
          height: 896,
        },
        {
          devicePixelRatio: 3, // iPhone 11 Pro
          width: 375,
          height: 812,
        },
        {
          devicePixelRatio: 3, // iPhone 12 mini
          width: 360,
          height: 780,
        },
        {
          devicePixelRatio: 3, // iPhone 12, iPhone 12 Pro
          width: 390,
          height: 844,
        },
        {
          devicePixelRatio: 3, // iPhone 12 Pro Max
          width: 428,
          height: 926,
        },
      ];
      const {
        devicePixelRatio,
        screen: { width, height },
      } = window;
      return xSeriesConfig.some(
        (item) =>
          item.devicePixelRatio === devicePixelRatio &&
          item.width === width &&
          item.height === height
      );
    }
    return false;
  })();
  return () => ret;
})();

/**
 * 获取窗口可视范围的高度
 * @returns
 */
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}

/**
 * 获取窗口可视范围宽度
 * @returns
 */
export function getPageViewWidth() {
  let d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}

/**
 * 获取窗口宽度
 * @returns
 */
export function getPageWidth() {
  let g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

/**
 * 获取窗口尺寸
 * @returns
 */
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}

/**
 * 获取滚动条距顶部高度
 * @returns
 */
export function getPageScrollTop() {
  let a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}

/**
 * 获取滚动条距左边的高度
 * @returns
 */
export function getPageScrollLeft() {
  let a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}

/**
 * 开启全屏
 * @param {*} element
 */
export function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

/**
 * 滚动到指定元素区域
 */
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};

/**
 * http跳转https
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/**
 * 检查页面底部是否可见
 * @returns
 */
export const bottomVisible = () => {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight ||
      document.documentElement.clientHeight)
  );
};

/**
 * 打开一个窗口
 * @param { string } url
 * @param { string } windowName
 * @param { number } width
 * @param { number } height
 */
export function openWindow(
  url: string,
  windowName: string,
  width: number,
  height: number
) {
  var x = parseInt(screen.width / 2.0) - width / 2.0;
  var y = parseInt(screen.height / 2.0) - height / 2.0;
  var isMSIE = navigator.appName == "Microsoft Internet Explorer";
  if (isMSIE) {
    var p = "resizable=1,location=no,scrollbars=no,width=";
    p = p + width;
    p = p + ",height=";
    p = p + height;
    p = p + ",left=";
    p = p + x;
    p = p + ",top=";
    p = p + y;
    window.open(url, windowName, p);
  } else {
    var win = window.open(
      url,
      "ZyiisPopup",
      "top=" +
        y +
        ",left=" +
        x +
        ",scrollbars=" +
        scrollbars +
        ",dialog=yes,modal=yes,width=" +
        width +
        ",height=" +
        height +
        ",resizable=no"
    );
    eval("try { win.resizeTo(width, height); } catch(e) { }");
    win.focus();
  }
}

/**
 * 自适应页面（rem）
 * @param { number } width
 */
export function AutoResponse(width = 750) {
  const target = document.documentElement;
  target.clientWidth >= 600
    ? (target.style.fontSize = "80px")
    : (target.style.fontSize = (target.clientWidth / width) * 100 + "px");
}
