/**
 * 保留N位小数
 * @param number
 * @param n
 * @returns
 */
export const getFloat = function (number: any, n: any) {
  n = n ? parseInt(n) : 0;
  if (n <= 0) {
    return Math.round(number);
  }
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
  number = Number(number).toFixed(n);
  return number;
};

/**
 * 从一个给定的数组arr中,随机返回num个不重复项
 * @param arr
 * @param num
 * @returns
 */
export const getArrayItems = function (arr: Array<any>, num: number) {
  //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
  var temp_array = new Array();
  for (var index in arr) {
    temp_array.push(arr[index]);
  }
  //取出的数值项,保存在此数组
  var return_array = new Array();
  for (var i = 0; i < num; i++) {
    //判断如果数组还有可以取出的元素,以防下标越界
    if (temp_array.length > 0) {
      //在数组中产生一个随机索引
      var arrIndex = Math.floor(Math.random() * temp_array.length);
      //将此随机索引的对应的数组元素值复制出来
      return_array[i] = temp_array[arrIndex];
      //然后删掉此索引的数组元素,这时候temp_array变为新的数组
      temp_array.splice(arrIndex, 1);
    } else {
      //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
      break;
    }
  }
  return return_array;
};

/**
 * 返回数组种重复数据的列表
 * @param nums
 * @returns
 */
export const findDuplicates = function (nums: Array<any>) {
  const res = [];

  for (const num of nums) {
    const absNum = Math.abs(num);
    if (nums[absNum - 1] < 0) {
      res.push(absNum);
    } else {
      nums[absNum - 1] *= -1;
    }
  }

  return res;
};

/**
 * 在M*N网格内筛选出最短路径，寻路
 * @param grid 0 空、1 障碍
 * @param k
 * @returns
 */
export const shortestPath = function (grid: Array<Array<number>>, k: number) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const height = grid.length;
  const width = grid[0].length;
  const dp = Array(height)
    .fill()
    .map((_) =>
      Array(width)
        .fill()
        .map((_) => Array(k + 1).fill(Infinity))
    );
  dp[0][0][0] = 0;
  const queue = [[0, 0]];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const status = dp[y][x];

    for (const [offsetX, offsetY] of directions) {
      const nextXY = [x + offsetX, y + offsetY];
      const [nextX, nextY] = nextXY;

      if (nextX >= 0 && nextY >= 0 && nextX < width && nextY < height) {
        const nextStatus = dp[nextY][nextX];
        const isObstacle = grid[nextY][nextX] == 1;

        let available = false;
        if (!isObstacle) {
          for (let i = 0; i < k + 1; i++) {
            const nextStep = status[i] + 1;
            if (nextStep < nextStatus[i]) {
              nextStatus[i] = nextStep;
              available = true;
            }
          }
        } else {
          for (let i = 0; i < k; i++) {
            const nextStep = status[i] + 1;
            if (nextStep < nextStatus[i + 1]) {
              nextStatus[i + 1] = nextStep;
              available = true;
            }
          }
        }
        if (available) queue.push(nextXY);
      }
    }
  }
  let totalSteps = Math.min(...dp[height - 1][width - 1]);
  return totalSteps == Infinity ? -1 : totalSteps;
};

/** 生成指定范围内的随机数 */
export const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** 数组乱序 */
export const arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
};

/** 数组扁平化 */
export const flatten = (arr) => {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
};

/** 数组中获取随机数 */
export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** 生成随机字符串 */
export const randomString = (len) => {
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  let strLen = chars.length;
  let randomStr = "";
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};

/** 字符串首字母大写 */
export const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** 手机号中间四位变成* */
export const telFormat = (tel) => {
  tel = String(tel);
  return tel.substr(0, 3) + "****" + tel.substr(7);
};

/** 驼峰命名转换成短横线命名 */
export const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (item) => "-" + item.toLowerCase());
};

/** 短横线命名转换成驼峰命名 */
export const getCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase());
};

/** 全角转换为半角 */
export const toCDB = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};

/** 半角转换为全角 */
export const toDBC = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};

/** 数字转化为大写金额 */
export const digitUppercase = (n) => {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  n = Math.abs(n);
  let s = "";
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return s
    .replace(/(零.)*零元/, "元")
    .replace(/(零.)+/g, "零")
    .replace(/^整$/, "零元整");
};

/** 数字转化为中文数字 */
export const intToChinese = (value) => {
  const str = String(value);
  const len = str.length - 1;
  const idxs = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
  ];
  const num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
    let pos = 0;
    if ($1[0] !== "0") {
      pos = len - idx;
      if (idx == 0 && $1[0] == 1 && idxs[len - idx] == "十") {
        return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - (left % 4);
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return "";
      } else {
        return num[$1[0]];
      }
    }
  });
};

/**
 * 拆分整数和小数
 * @param tranvalue
 * @returns
 */
export const splits = (tranvalue) => {
  var value = new Array("", "");
  temp = tranvalue.split(".");
  for (var i = 0; i < temp.length; i++) {
    value = temp;
  }
  return value;
};
