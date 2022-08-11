/**
 * 数组合并
 * @returns 
 */
export const arrayConcat = function () {
    var tmpArr = [];
    for (let i = 0; i < arguments.length; i++) {
        tmpArr = tmpArr.concat(arguments[i]);
    }
    return tmpArr;
};

/**
 * 删除数组指定部分
 * @returns 
 */
export const arrayDrop = function (array, index, howmany) {
    if (!index) {
        index = 0;
    }
    if (!howmany) {
        howmany = 1;
    }
    array.splice(index, howmany);
    return array;
};

/**
 * 检查数组是否包含
 * @returns 
 */
export const arrayIndexOf = function (arr: Array<String | Number | Boolean | unknown>, needFind: String | Number | Boolean | unknown) {
    var index = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == needFind) {
            index = i;
            return i;
        }
    }
    return index;
};

/**
 * 检查数组不同
 * @returns 
 */
export const arrayDifference = function (a, b) {
    const set = new Set(b);
    return a.filter((x) => !set.has(x));
};

export const arrayShuffle = function (arr) {
    let l = arr.length;
    while (l) {
        const i = Math.floor(Math.random() * l--);
        [arr[l], arr[i]] = [arr[i], arr[l]];
        console.log(i);
    }
    return arr;
};

export const arraySum = function (arr) {
    return arr.reduce((acc, val) => acc + val, 0);
};

export const arrayAvg = function (arr) {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
};

export const arrayEach = function (arr, fun) {
    for (let i = 0; i < arr.length; i++) {
        fun(arr[i], i);
    }
};

/**
 * 2数之间的随机数
 * @param min
 * @param max
 * @returns
 */
export const random = function (min: number, max: number): number {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * min + 1 + "", 10);
            break;
        case 2:
            return parseInt(Math.random() * (max - min + 1) + min + "", 10);
            break;
        default:
            return 0;
    }
};

/**
 * 判断是不是一个空对象
 * @param obj
 * @returns
 */
export const isEmptyObj = function (obj) {
    return JSON.stringify(obj) === "{}";
};

/**
 * 判断是不是一个空对象
 * @param obj 
 * @returns 
 */
export const isPlainObject = (obj) => {
    return typeof obj == "object" && Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * 生成一个不重复的随机数组
 * @param {number} len 数组长度
 * @param {number} min 最小随机数
 * @param {number} max 最大随机数
 * @return {array} 不重复的随机数组
 */
export const randomUniqueArr = (len, min, max) => {
    if (max - min < len) {
        return null;
    }
    const hash = [];

    while (hash.length < len) {
        const num = Math.floor(Math.random() * 100);

        if (hash.indexOf(num) === -1) {
            hash.push(num);
        }
    }
    return hash;
};


/**
 * 判断以X开头
 * @param target 
 * @param str 
 * @param ignorecase 
 * @returns 
 */
export const startsWith = (target: String, str: string, ignorecase: boolean) => {
    var start_str = target.substr(0, str.length);
    return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
}

/**
 * 判断以X结尾
 * @param target 
 * @param str 
 * @param ignorecase 
 * @returns 
 */
export const endsWith = (target: String, str: string, ignorecase: boolean) => {
    var end_str = target.substring(target.length - str.length);
    return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str;
}

/**
 * limit方法，超出区间外，则取最近的区间边界值
 * @param target 
 * @param n1 
 * @param n2 
 * @returns 
 */
export const limitNumber = (target, n1, n2) => {
    var a = [n1, n2].sort()
    if (target < a[0]) return target = a[0]
    if (target > a[1]) return target = a[1]
    return target
}

/**
 * 分割数组
 * @param nums 
 * @returns 
 */
export const partitionDisjoint = (nums: string | any[]) => {
    let n = nums.length;
    let maxLeft = new Array(n).fill(Number.MIN_SAFE_INTEGER);
    let minRight = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    maxLeft[0] = nums[0];
    minRight[n - 1] = nums[n - 1];
    for (let i = 1, j = n - 2; i < n; i++, j--) {
        maxLeft[i] = Math.max(nums[i], maxLeft[i - 1]);
        minRight[j] = Math.min(nums[j], minRight[j + 1]);
    }
    for (let i = 1; i < n; i++) {
        if (maxLeft[i - 1] <= minRight[i]) return i;
    }
    return -1;
}

/**
 * 判断是不是伪数组
 * @param obj 
 * @returns 
 */
export const isArrayList = (obj) => {
    var toString = Object.toString
    var rarraylike = /(ArraylLi stlColl ectionlMaplArguments)\]$/
    var rfunction = /^\s*\bfunction\b/
    if (!obj) {
        return false
    }

    const n = obj.length
    if (n === n >>> 0) {
        const type = toString.call(obj).slice(8, -1)
        if (rarraylike.test(type)) {
            return false
        }
        if (type === "Array") {
            return true
        }
        try {
            if (obj.property.isEnumerable.call(obj, 'length') === false) {
                return rfunction.test(obj.item || obj.callee)
            }
        } catch (e) {
            return !obj.window
        }
    }
    return false

}

/**
 * 比较2个NPM包的版本号
 * @param version1 
 * @param version2 
 * @returns 
 */
export const compareVersion = function (version1, version2) {
    let a1 = version1.split(".");
    let a2 = version2.split(".");
    let i = 0;
    let result = 0;
    while (i < a1.length || i < a2.length) {
        a1[i] = a1[i] ? a1[i] / 1 : 0;
        a2[i] = a2[i] ? a2[i] / 1 : 0;
        if (a1[i] > a2[i]) {
            result = 1;
            break;
        } else if (a1[i] < a2[i]) {
            result = -1;
            break;
        }
        i++;
    }
    return result;
};

/**
 * 手写trim方法
 * @param str 
 */
export const trim = (str) => {
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
    \u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break;
        }
    }

    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1)
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}


/**
 * 连续数组
 * @param nums 
 * @returns 
 */
export const findMaxLengthFromArr = (nums) => {
    const n = nums.length;
    const map = new Map();
    map.set(0, -1);
    let pre = 0;
    let res = 0;
    for (let i = 0; i < n; i++) {
        pre += nums[i] == 0 ? -1 : 1;
        if (map.has(pre)) {
            res = Math.max(res, i - map.get(pre));
        } else {
            map.set(pre, i);
        }
    }
    return res;
};

/**
 * 数组嵌套 
 * @param nums 
 * @returns 
 */
export const arrayNesting = (nums: number[]): number => {
    const dfs = (idx: number): number => {
        if (nums[idx] == -1) {
            return 0
        }
        let nxt = nums[idx]
        nums[idx] = -1
        return 1 + dfs(nxt)
    }
    let ans = 0
    for (let i = 0; i < nums.length; i++) {
        ans = Math.max(ans, dfs(i))
    }
    return ans
};

/**
 * 替换数组中的元素
 * @param {number[]} nums
 * @param {number[][]} operations
 * @return {number[]}
 */
export const arrayChange = (nums, operations) => {
    const pos = new Map()
    for (let i = 0; i < nums.length; i++) {
        pos.set(nums[i], i)
    }
    for (const [prev, next] of operations) {
        const prePos = pos.get(prev)
        pos.delete(prev)
        pos.set(next, prePos)
        nums[prePos] = next
    }
    return nums
};

/** 检查是不是数组 */
export const isArray = (arg) => {
    return Object.prototype.toString.call(arg) === '[object Array]'
}

export const browserType = () => {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
    const ua = navigator.userAgent.toLowerCase();
    const testUa = regexp => regexp.test(ua);
    const testVs = regexp => (ua.match(regexp) + "")
        .replace(/[^0-9|_.]/ig, "")
        .replace(/_/ig, ".");

    // 系统
    let system = "unknown";
    if (testUa(/windows|win32|win64|wow32|wow64/ig)) {
        system = "windows"; // window系统
    } else if (testUa(/macintosh|macintel/ig)) {
        system = "osx"; // osx系统
    } else if (testUa(/x11/ig)) {
        system = "linux"; // linux系统
    } else if (testUa(/android|adr/ig)) {
        system = "android"; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/ig)) {
        system = "ios"; // ios系统
    }

    // 系统版本
    let systemVs = "unknown";
    if (system === "windows") {
        if (testUa(/windows nt 5.0|windows 2000/ig)) {
            systemVs = "2000";
        } else if (testUa(/windows nt 5.1|windows xp/ig)) {
            systemVs = "xp";
        } else if (testUa(/windows nt 5.2|windows 2003/ig)) {
            systemVs = "2003";
        } else if (testUa(/windows nt 6.0|windows vista/ig)) {
            systemVs = "vista";
        } else if (testUa(/windows nt 6.1|windows 7/ig)) {
            systemVs = "7";
        } else if (testUa(/windows nt 6.2|windows 8/ig)) {
            systemVs = "8";
        } else if (testUa(/windows nt 6.3|windows 8.1/ig)) {
            systemVs = "8.1";
        } else if (testUa(/windows nt 10.0|windows 10/ig)) {
            systemVs = "10";
        }
    } else if (system === "osx") {
        systemVs = testVs(/os x [\d._]+/ig);
    } else if (system === "android") {
        systemVs = testVs(/android [\d._]+/ig);
    } else if (system === "ios") {
        systemVs = testVs(/os [\d._]+/ig);
    }

    // 平台
    let platform = "unknow";
    if (system === "windows" || system === "osx" || system === "linux") {
        platform = "desktop"; // 桌面端
    } else if (system === "android" || system === "ios" || testUa(/mobile/ig)) {
        platform = "mobile"; // 移动端
    }

    // 内核和载体
    let engine = "unknow";
    let supporter = "unknow";
    if (testUa(/applewebkit/ig) && testUa(/safari/ig)) {
        engine = "webkit"; // webkit内核
        if (testUa(/edge/ig)) {
            supporter = "edge"; // edge浏览器
        } else if (testUa(/opr/ig)) {
            supporter = "opera"; // opera浏览器
        } else if (testUa(/chrome/ig)) {
            supporter = "chrome"; // chrome浏览器
        } else {
            supporter = "safari"; // safari浏览器
        }
    } else if (testUa(/gecko/ig) && testUa(/firefox/ig)) {
        engine = "gecko"; // gecko内核
        supporter = "firefox"; // firefox浏览器
    } else if (testUa(/presto/ig)) {
        engine = "presto"; // presto内核
        supporter = "opera"; // opera浏览器
    } else if (testUa(/trident|compatible|msie/ig)) {
        engine = "trident"; // trident内核
        supporter = "iexplore"; // iexplore浏览器
    }

    // 内核版本
    let engineVs = "unknow";
    if (engine === "webkit") {
        engineVs = testVs(/applewebkit\/[\d.]+/ig);
    } else if (engine === "gecko") {
        engineVs = testVs(/gecko\/[\d.]+/ig);
    } else if (engine === "presto") {
        engineVs = testVs(/presto\/[\d.]+/ig);
    } else if (engine === "trident") {
        engineVs = testVs(/trident\/[\d.]+/ig);
    }

    // 载体版本
    let supporterVs = "unknow";
    if (supporter === "chrome") {
        supporterVs = testVs(/chrome\/[\d.]+/ig);
    } else if (supporter === "safari") {
        supporterVs = testVs(/version\/[\d.]+/ig);
    } else if (supporter === "firefox") {
        supporterVs = testVs(/firefox\/[\d.]+/ig);
    } else if (supporter === "opera") {
        supporterVs = testVs(/opr\/[\d.]+/ig);
    } else if (supporter === "iexplore") {
        supporterVs = testVs(/(msie [\d.]+)|(rv:[\d.]+)/ig);
    } else if (supporter === "edge") {
        supporterVs = testVs(/edge\/[\d.]+/ig);
    }

    // 外壳和外壳版本
    let shell = "none";
    let shellVs = "unknow";
    if (testUa(/micromessenger/ig)) {
        shell = "wechat"; // 微信浏览器
        shellVs = testVs(/micromessenger\/[\d.]+/ig);
    } else if (testUa(/qqbrowser/ig)) {
        shell = "qq"; // QQ浏览器
        shellVs = testVs(/qqbrowser\/[\d.]+/ig);
    } else if (testUa(/ubrowser/ig)) {
        shell = "uc"; // UC浏览器
        shellVs = testVs(/ubrowser\/[\d.]+/ig);
    } else if (testUa(/2345explorer/ig)) {
        shell = "2345"; // 2345浏览器
        shellVs = testVs(/2345explorer\/[\d.]+/ig);
    } else if (testUa(/metasr/ig)) {
        shell = "sougou"; // 搜狗浏览器
    } else if (testUa(/lbbrowser/ig)) {
        shell = "liebao"; // 猎豹浏览器
    } else if (testUa(/maxthon/ig)) {
        shell = "maxthon"; // 遨游浏览器
        shellVs = testVs(/maxthon\/[\d.]+/ig);
    } else if (testUa(/bidubrowser/ig)) {
        shell = "baidu"; // 百度浏览器
        shellVs = testVs(/bidubrowser [\d.]+/ig);
    }

    return Object.assign({
        engine, // webkit gecko presto trident
        engineVs,
        platform, // desktop mobile
        supporter, // chrome safari firefox opera iexplore edge
        supporterVs,
        system, // windows osx linux android ios
        systemVs
    }, shell === "none" ? {} : {
        shell, // wechat qq uc 2345 sougou liebao maxthon baidu
        shellVs
    });
}



