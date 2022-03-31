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
