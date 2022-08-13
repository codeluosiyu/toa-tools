/**
 * 获取所有URL参数 getAllUrlParams
 * @description: 把url参数 转换为json对象(但是# 后面的 都不会解析 ),所以在 Vue 中 history模式可以使用，但是 hash模式 他会返回一个空
 * @param {type}  路径 || 在页面或者组件里面调用，他会自己取的当前页面路径
 * @return {type}  Object  注：无参数的时候，返回一个json
 */
export function getAllUrlParams(url) {
    // 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
    let queryString = url ? url.split("?")[1] : window.location.search.slice(1);
    // 用来存储我们所有的参数
    let obj = {};
    // 如果没有传参，返回一个空对象
    if (!queryString) {
        return obj;
    }
    // #后面的东西不是查询字符串的一部分，所以去掉它
    queryString = queryString.split("#")[0];
    // 将参数分成数组
    let arr = queryString.split("&");
    for (let i = 0; i < arr.length; i++) {
        // 分离成key:value的形式
        let a = arr[i].split("=");
        // 将undefined标记为true
        let paramName = a[0];
        let paramValue = typeof a[1] === "undefined" ? true : a[1];
        // 如果调用对象时要求大小写区分，可删除这两行代码
        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string") paramValue = paramValue.toLowerCase();
        // 如果paramName以方括号结束, e.g. colors[] or colors[2]
        if (paramName.match(/[(\d+)?]$/)) {
            // 如果paramName不存在，则创建key
            let key = paramName.replace(/[(\d+)?]/, "");
            if (!obj[key]) obj[key] = [];
            // 如果是索引数组 e.g. colors[2]
            if (paramName.match(/[\d+]$/)) {
                // 获取索引值并在对应的位置添加值
                let index = /[(\d+)]/.exec(paramName)[1];
                obj[key][index] = paramValue;
            } else {
                // 如果是其它的类型，也放到数组中
                obj[key].push(paramValue);
            }
        } else {
            // 处理字符串类型
            if (!obj[paramName]) {
                // 如果如果paramName不存在，则创建对象的属性
                obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === "string") {
                // 如果属性存在，并且是个字符串，那么就转换为数组
                obj[paramName] = [obj[paramName]];
                obj[paramName].push(paramValue);
            } else {
                // 如果是其它的类型，还是往数组里丢
                obj[paramName].push(paramValue);
            }
        }
    }
    return obj;
}

/**
 * parseQueryString
 * @description: 这个所有模式下 都可以使用，他会 取得 ? 号后面的 所有内容
 * @param {type} 路径 || 在页面或者组件里面调用，他会自己取的当前页面路径
 * @return {type} Object  注：无参数的时候，返回一个空json
 */
export function parseQueryString(url) {
    let queryString = url ? url.split("?")[1] : window.location.href;
    let obj = {};
    //这个 去查找是否，传了参数过来
    if (queryString.indexOf("?") === -1) {
        return obj;
    }
    let keyvalue = [];
    let key = "",
        value = "";
    let paraString = queryString
        .substring(queryString.indexOf("?") + 1, queryString.length)
        .split("&");
    for (let i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

/**
 * 修改url中的参数
 * @param { string } paramName
 * @param { string } replaceWith
 */
export function replaceParamVal(paramName: string, replaceWith: any) {
    var oUrl = location.href.toString();
    var re = eval("/(" + paramName + "=)([^&]*)/gi");
    location.href = oUrl.replace(re, paramName + "=" + replaceWith);
    return location.href;
}

/**
 * 删除url中指定的参数
 * @param { string } name
 */
export function funcUrlDel(name: string) {
    var loca = location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name) > -1) {
        var obj = {};
        var arr: Array<any> = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        var url =
            baseUrl +
            JSON.stringify(obj)
                .replace(/[\"\{\}]/g, "")
                .replace(/\:/g, "=")
                .replace(/\,/g, "&");
        return url;
    }
}

/**
 * 解析页面URL参数params(并处理 decodeURIComponent )
 * @param name
 * @returns
 */
export const delUrlParam = (name: string) => {
    let loca = window.location;
    let baseUrl = loca.origin + loca.pathname + "?";
    let query = decodeURIComponent(loca.search.split("?")[1]);
    if (!query) return loca;

    if (loca.href.indexOf(name) < 0) return loca.href;

    let obj = {};
    let arr: any = query.indexOf("&") > -1 ? query.split("&") : [query];
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=");
        obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];

    const url =
        baseUrl +
        JSON.stringify(obj)
            .replace(/[\"\{\}]/g, "")
            .replace(/\:/g, "=")
            .replace(/\,/g, "&");
    return url;
};

/**
 * URLSearchParams
 * @param url String   可选参数， url地址
 * @param OneKey String   可选参数， 获取当前网址指定参数
 * @param Delete_key Array    可选参数， 过滤指定参数
 * @returns
 */
export const getUrlData = function (url, OneKey, Delete_key = []) {
    if (!url) url = window.location.search;
    var url_l = url.split("?")[1];
    var url_ll = url_l.split("&"),
        obj = {};
    url_ll.forEach((item, idx) => {
        var key = item.split("=")[0];
        var val = item.split("=")[1];
        if (Delete_key.indexOf(key) == -1) obj[key] = val;
    });
    if (OneKey && url_l.indexOf(OneKey)) return obj[OneKey];
    return obj;
};

/**
 * 获取单个参数
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}
 */
export const getParam = (name, url) => {
    if (typeof name !== "string") return false;
    if (!url) url = window.location.href;
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * 设置单个参数
 * @param name
 * @param val
 * @param url
 * @returns
 */
export const setParam = (name, val, url) => {
    if (typeof name !== "string") return false;
    if (!url) url = window.location.href;
    var _name = name.replace(/[\[\]]/g, "\\$&");
    var value = name + "=" + encodeURIComponent(val);
    var regex = new RegExp(_name + "=[^&]*");
    var urlArr = url.split("#");
    var result = "";

    if (regex.exec(url)) {
        result = url.replace(regex, value);
    } else {
        result = urlArr[0] + "&" + value + (urlArr[1] || "");
    }

    return result;
};

/**
 * 移除单个参数
 * @param name
 * @param url
 * @returns
 */
export const removeParam = (name, url) => {
    if (typeof name !== "string") return false;
    if (!url) url = window.location.href;
    var urlparts = url.split("?");
    var prefix = encodeURIComponent(name + "=");
    var pars = urlparts[1].split(/[&;]/g);
    var i = 0,
        len = pars.length;

    for (; i < len; i++) {
        if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
        }
    }

    url = urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");

    return url;
};

/**
 * 获取多个参数
 * @param  {String} names
 * @param  {String} url
 * @return {[String|Boolean]}
 */
export const getParams = (names, url) => {
    if (typeof name !== "string") return false;
    var names = names.split(" ");
    var result = {};
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;
    for (; i < len; i++) {
        result[names[i]] = getParam(names[i], url);
    }
    return result;
};

/**
 * 设置多个参数
 * @param {Object} obj
 * @param  {String} url
 * @return {[String|Boolean]}
 */
export const setParams = (obj, url) => {
    var result = url || "";
    if (Object.prototype.toString.call(obj) !== "[object Object]") return false;
    for (var name in obj) {
        result = setParam(name, obj[name], result);
    }
    return result;
};

/**
 * 移除多个参数
 * @param  {String} names
 * @param  {String} url
 * @return {[String|Boolean]}
 */
export const removeParams = (names, url) => {
    var result = url || "";
    var names = names.split(" ");
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;

    for (; i < len; i++) {
        result = removeParam(names[i], result);
    }
    return result;
};
