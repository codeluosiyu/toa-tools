/**
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
