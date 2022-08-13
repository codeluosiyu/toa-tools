/**
 * 字符串长度计算
 * @param str
 * @param countSpace
 * @returns
 */
export const count = (str, countSpace = true) => {
    if (countSpace) {
        return str.length;
    }
    return removeAllSpace(str).length;
};

/**
 * 去除全部空格
 * @param str
 * @returns
 */
export const removeAllSpace = (str) => {
    return str.replace(/\s+/g, "");
};

/**
 * 去除首尾空格
 * @param str
 * @returns
 */
export const trim = (str) => {
    return str.trim();
};

/**
 * 去除左侧空格
 * @param str
 * @returns
 */
export const trimL = (str) => {
    return str.replace(/^\s+/g, "");
};

/**
 * 去除右侧空格
 * @param str
 * @returns
 */
export const trimR = (str) => {
    return str.replace(/\s+$/g, "");
};

/**
 * 字符串搜索
 * @param str
 * @param kwd
 * @param caseSensitive
 * @returns
 */
export const search = (str, kwd, caseSensitive = true) => {
    if (!caseSensitive) {
        kwd = kwd.toLowerCase();
        str = str.toLowerCase();
    }
    return str.indexOf(kwd);
};

/**
 * 获取 扩展名
 * @param str
 * @returns
 */
export const getExtension = (str) => {
    str = str.split(".");
    return str.pop();
};

/**
 * 全部替换
 * @param str 
 * @param replaceKey 
 * @param replaceVal 
 * @returns 
 */
export const replaceAll = (str, replaceKey, replaceVal) => {
    var reg = new RegExp(replaceKey, 'g');
    return str.replace(reg, replaceVal || '');
}

/**
 * 均分数组
 * @param array 
 * @param subGroupLength 
 * @returns 
 */
export const averageArrGroup = (array, subGroupLength) => {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}

/**
 * toFixed修正版
 * @param number 
 * @param m 
 * @returns 
 */
export const toFixed = (number, m) => {
    if (typeof number !== 'number') {
        throw new Error("target is not a number");
    }
    let result = Math.round(Math.pow(10, m) * number) / Math.pow(10, m);
    result = String(result);
    if (result.indexOf(".") == -1) {
        if (m != 0) {
            result += ".";
            result += new Array(m + 1).join('0');
        }
    } else {
        let arr = result.split('.');
        if (arr[1].length < m) {
            arr[1] += new Array(m - arr[1].length + 1).join('0')
        }
        result = arr.join('.')
    }
    return result
}

/**
 * 判断字符串是否为json字符串
 * @param str 
 * @returns 
 */
export const isJsonString = (str) => {
    try {
        if (typeof (JSON.parse(str)) === 'object') {
            return true
        }
    } catch (e) {
        return false
    }
    return false
}
