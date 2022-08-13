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
 * 取url参数
 * @param {String} name url参数
 * @param {Boolean} decodeSearch 是否对location.search整体解码一次, 默认true
 * @return {String} url值
 */
export const getQuery = (name = "", decodeSearch = true) => {
    const reg = new RegExp("(?:^|&)" + name + "=([^&]*)(?:&|$)", "i");
    let search = location.search;
    search = decodeSearch ? decodeURIComponent(search) : search;
    const ret = search.substr(1).match(reg);
    if (ret) return decodeURIComponent(ret[1]);
    return "";
};

/**
 * 获取所有url参数
 * @param {Array} 需要排除的参数数组
 * @return {Object} 参数键值对
 */
export const getQueryAll = (exclude = <any>[]) => {
    if (typeof window !== "undefined") {
        const search: any = window.location.search;
        const paramArr =
            search !== "" ? search.split("?").pop().split("&") : [];
        const paramObj = {};
        paramArr.forEach(entry => {
            const [key, value] = entry.split("=");
            if (!exclude.includes(key)) {
                paramObj[key] = decodeURIComponent(value);
            }
        });
        return paramObj;
    } else {
        return ""
    }
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
    var x = parseInt(`${screen.width / 2.0}`) - width / 2.0;
    var y = parseInt(`${screen.height / 2.0}`) - height / 2.0;
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
        window.focus();
    }
}

/**
 * 客户端检测，并返回客户端的详细信息
 * @param w
 * @param nav
 * @returns
 */
export const clientInfo = (w, nav) => {
    var _Client = function () {
        // 呈现引擎
        this.engine = {};
        // 浏览器
        this.brower = {};
        // 系统平台
        this.system = {};
        // 初始化
        this.init();
    };
    _Client.prototype.init = function () {
        var ua = nav.userAgent,
            p = nav.platform;
        // 检测呈现引擎和浏览器
        if (w.opera) {
            // opera
            this.engine.name = this.brower.name = "opera";
            this.engine.ver = this.brower.ver = w.opera.version();
        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
            this.engine.name = "webkit";
            this.engine.ver = RegExp["$1"];
            if (/Chrome\/(\S+)/.test(ua)) {
                // chrome
                this.brower.name = "chrome";
                this.brower.ver = RegExp["$1"];
            } else if (/Version\/(\S)+/.test(ua)) {
                // safari
                this.brower.name = "safari";
                this.brower.ver = RegExp["$1"];
            } else {
                // 近似确定版本号
                var safariVersion = 1,
                    webkitVersion = parseFloat(this.engine.ver);
                if (webkitVersion < 100) {
                    safariVersion = 1;
                } else if (webkitVersion < 312) {
                    safariVersion = 1.2;
                } else if (webkitVersion < 412) {
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }
                this.brower.name = "safari";
                this.brower.ver = safariVersion;
            }
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            // konq
            this.engine.name = "khtml";
            this.brower.name = "konq";
            this.engine.ver = this.brower.ver = RegExp["$1"];
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            this.engine.name = "gecko";
            this.engine.ver = RegExp["$1"];
            if (/Firefox\/(\S+)/.test(ua)) {
                // firefox
                this.brower.name = "firefox";
                this.brower.ver = RegExp["$1"];
            } else {
                this.brower.name = null;
                this.brower.ver = null;
            }
        } else if (/MSIE ([^;]+)/.test(ua)) {
            // IE
            this.engine.name = this.brower.name = "ie";
            this.engine.ver = this.brower.ver = RegExp["$1"];
        } else {
            this.engine.name = this.brower.name = null;
            this.engine.ver = this.brower.ver = null;
        }

        // 检测系统平台
        // 移动设备
        if (ua.indexOf("iPhone") > -1) {
            this.system.mobile = {};
            this.system.mobile.name = "iphone";
            this.system.mobile.ver = null;
        } else if (ua.indexOf("iPod") > -1) {
            this.system.mobile = {};
            this.system.mobile.name = "ipod";
            this.system.mobile.ver = null;
        } else if (ua.indexOf("iPad") > -1) {
            this.system.mobile = {};
            this.system.mobile.name = "ipad";
            this.system.mobile.ver = null;
        } else if (ua.indexOf("NokiaN") > -1) {
            this.system.mobile = {};
            this.system.mobile.name = "nokian";
            this.system.mobile.ver = null;
        } else if (/Android (\d+\.\d+)/.test(ua)) {
            this.system.mobile = {};
            this.system.mobile.name = "android";
            this.system.mobile.ver = RegExp["$1"];
        }
        // 游戏设备
        if (ua.indexOf("Wii") > -1) {
            this.system.game = {};
            this.system.game.name = "wii";
            this.system.game.ver = null;
        } else if (/playstation/i.test(ua)) {
            this.system.game = {};
            this.system.game.name = "ps";
            this.system.game.ver = null;
        }

        if (p.indexOf("Win") == 0) {
            // Windows
            this.system.name = "win";
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                if (RegExp["$1"] == "NT") {
                    switch (RegExp["$2"]) {
                        case "5.0":
                            this.system.ver = "2000";
                            break;
                        case "5.1":
                            this.system.ver = "XP";
                            break;
                        case "6.0":
                            this.system.ver = "Vista";
                            break;
                        case "6.1":
                            this.system.ver = "7";
                            break;
                        default:
                            this.system.ver = "NT";
                    }
                } else if (RegExp["$1"] == "9x") {
                    this.system.ver = "ME";
                } else {
                    this.system.ver = RegExp["$1"];
                }
                // 检测Windows CE或Windows Phone
                if (this.system.ver == "CE") {
                    this.system.mobile = {};
                    this.system.mobile.name = "ce";
                    this.system.mobile.ver = "CE";
                } else if (this.system.ver == "Ph") {
                    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
                        this.system.ver = "Phone";
                        this.system.mobile = {};
                        this.system.mobile.name = "phone";
                        this.system.mobile.ver = RegExp["$1"];
                    }
                }
            }
        } else if (p.indexOf("Mac") == 0) {
            // Mac
            this.system.name = "mac";
            this.system.ver = null;
            // 检测IOS版本号
            if (ua.indexOf("Mobile") > -1) {
                if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
                    this.system.mobile.ver = RegExp.$1.replace("_", ".");
                } else {
                    this.system.mobile.ver = 2;
                }
            }
        } else if (p == "X11" || p.indexOf("Linux") == 0) {
            // Unix or Linux
            this.system.name = "x11";
            this.system.ver = null;
        }
    };
    // 对象是否包含此方法
    _Client.prototype.isHostMethod = function (object, property) {
        // author: Peter Michaux
        var t = typeof object[property];
        return (
            t == "function" || !!(t == "object" && object[property]) || t == "object"
        );
    };
    // 是否是移动设备
    _Client.prototype.isMobile = function () {
        var t = typeof this.system.mobile;
        return t != "undefined";
    };
    return _Client;
};


/**
 * 获取浏览器光标信息
 * @param win 
 * @returns 
 */
export const getSelectionCoords = (win) => {
    win = win || window;
    var doc = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                if (rect) {
                    x = rect.left;
                    y = rect.top;
                }
            }
            if ((x == 0 && y == 0) || rect === undefined) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    span.appendChild(doc.createTextNode("\u200b"));
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);
                    spanParent.normalize();
                }
            }
        }
    }
    return { x: x, y: y };
}
