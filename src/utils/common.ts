/** 拼接秒数 */
export const formatNumber = (n) => {
    const s = n.toString();
    return s[1] ? s : "0" + s;
};

/** 过滤表情 */
export const filterEmoji = (name = "") => {
    if (name) {
        const str = name.replace(
            /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
            ""
        );
        return str;
    }
    return "";
};

/** 验证税号 */
export const isNumber = (num) =>
    /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(num);

/** 验证手机号 */
export const isPhone = (phone) => /^[1][0-9]{10}$/.test(phone);

/** 验证邮箱 */
export const isEmail = (email) =>
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
        email
    );

/** 对象数组根据对象某一个属性去重 */
export const unique = (arr, key, hash = {}) =>
    arr.reduce(function (item, next) {
        hash[next[key]] ? "" : (hash[next[key]] = true && item.push(next));
        return item;
    }, []);

// 验证emoji表情
export const hasEmoji = function (value, tips = "") {
    let char =
        /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    if (char.test(value)) {
        console.log(`${tips}不能含有特殊字符`);
        return true;
    }
    return false;
};

/** 保留N位小数 */
export const getFloat = function (number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
        return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
    number = Number(number).toFixed(n);
    return number;
};

/** 时间戳转 YY-mm-dd HH:ii:ss */
export const timeStrtoUtc = function (timeStamp, returnType) {
    timeStamp = parseInt(timeStamp);
    var date = new Date();
    if (timeStamp < 90000000000) {
        date.setTime(timeStamp * 1000);
    } else {
        date.setTime(timeStamp);
    }
    var y = date.getFullYear();
    var m: any = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d: any = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h: any = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute: any = date.getMinutes();
    var second: any = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    if (returnType == "str") {
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
    return [y, m, d, h, minute, second];
};

/** 查询数组中第N大的数据 */
export const insertQueryArrIndex = function (arr, index) {
    if (arr.length == 0) {
        return;
    }
    if (index > arr.length - 1 || index - 1 < 0) {
        return;
    }
    for (let i = 1; i < arr.length; i++) {
        var current = arr[i];
        var preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] < current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr[index - 1];
};

/** 验证函数节流 */
export const throttle = (fn, wait) => {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, wait);
    };
};
