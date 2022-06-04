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
export const arrayIndexOf = function (arr, needFind) {
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
 * curry函数
 */
export const curry (fn) {
  function inner(len, arg) {
    if (len == 0)
      return fn.apply(null, arg)
    return function (x) {
      return inner(len - 1, arg.concat(x))
    }
  }
  return inner(fn.length, [])
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
 * 将嵌套的数组转换为扁平的数组，并按照从小到大排序
 * @param arr 
 * @returns 
 */
export const arrayFlatten = (arr) => {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));  // 如果是数组，就使用concat()函数连接数组
    } else {
      res.push(arr[i]);  // 将数组项的值放进数组res中
    }
  }
  function compare(value1, value2) {
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }
  res.sort(compare);
  return res;
}