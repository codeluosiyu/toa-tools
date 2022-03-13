// --- 数组操作 ---
// 数组合并
export const arrayConcat = function () {
  var tmpArr = [];
  for (let i = 0; i < arguments.length; i++) {
    tmpArr = tmpArr.concat(arguments[i]);
  }
  return tmpArr;
};

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
