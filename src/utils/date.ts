/**
 * 返回时分秒中的秒
 * @param n
 * @returns
 */
export const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

/**
 * UTC时间转YYYY-MM-DD HH:MM:SS
 * @param date
 * @param num
 * @param interval
 * @returns
 */
export const formatDateTime = (
  date: string,
  num: number = 3,
  interval: string = "-"
) => {
  const arr = date.split("T");
  const d = arr[0];
  const darr = d.split("-");
  const t = arr[1];
  const tarr = t.split("+");
  const marr = tarr[0].split(":");
  const tzone = Number(tarr[1].substr(0, 2));
  const dd =
    parseInt(darr[0]) +
    "/" +
    parseInt(darr[1]) +
    "/" +
    parseInt(darr[2]) +
    " " +
    parseInt(marr[0]) +
    ":" +
    parseInt(marr[1]) +
    ":" +
    parseInt(marr[2]);
  let time = new Date(Date.parse(dd));
  time.setTime(time.setHours(time.getHours() + (8 - tzone)));
  let Y = time.getFullYear() + interval;
  const addZero = (num: number) => (num < 10 ? "0" + num : num);
  let M = addZero(time.getMonth() + 1) + interval;
  let D = addZero(time.getDate());
  let h = " " + addZero(time.getHours());
  let m = ":" + addZero(time.getMinutes());
  let s = ":" + addZero(time.getSeconds());
  let result = Y + M + D;
  switch (num) {
    case 2:
      result = h + m;
      break;
    case 3:
      result = Y + M + D;
      break;
    case 4:
      result = Y + M + D + h;
      break;
    case 5:
      result = Y + M + D + h + m;
      break;
    case 6:
      result = Y + M + D + h + m + s;
      break;
  }
  return result;
};

/**
 * 时间戳转 YY-mm-dd HH:ii:ss
 * @param timeStamp
 * @param returnType
 * @returns
 */
export const timeStampToDate = function (
  timeStamp: any,
  returnType: string | undefined
) {
  timeStamp = parseInt(timeStamp);
  var date = new Date();
  if (timeStamp < 90000000000) {
    date.setTime(timeStamp * 1000);
  } else {
    date.setTime(timeStamp);
  }
  var y = date.getFullYear();
  var m: number | string = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d: number | string = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h: number | string = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute: number | string = date.getMinutes();
  var second: number | string = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  if (returnType == "str") {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  }
  return [y, m, d, h, minute, second];
};

/**
 * 字符串转时间戳
 * @param timeStamp
 * @returns
 */
export const toTimeStamp = function (timeStamp) {
  var reg =
    /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
  var res = timeStamp.match(reg);
  if (res == null) {
    var reg2 =
      /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    var res2 = timeStamp.match(reg2);
    if (res2 == null) {
      console.log("时间格式错误 E001");
      return false;
    }
    var year = parseInt(res2[3]);
    var month = parseInt(res2[1]);
    var day = parseInt(res2[2]);
    var h = parseInt(res2[4]);
    var i = parseInt(res2[5]);
    var s = parseInt(res2[6]);
  } else {
    var year = parseInt(res[1]);
    var month = parseInt(res[2]);
    var day = parseInt(res[3]);
    var h = parseInt(res[4]);
    var i = parseInt(res[5]);
    var s = parseInt(res[6]);
  }
  if (year < 1000) {
    console.log("时间格式错误");
    return false;
  }
  if (h < 0 || h > 24) {
    console.log("时间格式错误");
    return false;
  }
  if (i < 0 || i > 60) {
    console.log("时间格式错误");
    return false;
  }
  if (s < 0 || s > 60) {
    console.log("时间格式错误");
    return false;
  }
  return Date.parse(new Date(year, month - 1, day, h, i, s) + "");
};

/**
 * 根据时间戳计算多少分钟/小时/天之前
 * @param time
 * @returns
 */
export const fromTime = function (time: number) {
  if (time < 90000000000) {
    time *= 1000;
  }
  var timer = new Date().getTime() - time;
  timer = parseInt(timer / 1000 + "");
  if (timer < 180) {
    return "刚刚";
  } else if (timer >= 180 && timer < 3600) {
    return parseInt(timer / 60 + "") + "分钟前";
  } else if (timer >= 3600 && timer < 86400) {
    return parseInt(timer / 3600 + "") + "小时前";
  } else if (timer >= 86400 && timer < 2592000) {
    return parseInt(timer / 86400 + "") + "天前";
  } else {
    return this.toDate(time, "str");
  }
};

/**
 * 计算当前时间，传入类型
 * @param type
 * @param addTime
 * @returns
 */
export const nowTimeStemp = (type: string, addTime: number) => {
  var dateObj = new Date();
  var cTime = dateObj.getTime();
  try {
    if (addTime) {
      cTime += addTime;
    }
    if (!type) {
      type = "number";
    }
    if (type == "number") {
      return cTime;
    } else if (type == "str") {
      return timerToUTC(cTime / 1000, "str");
    } else if (type == "array") {
      return timerToUTC(cTime / 1000, "array");
    }
  } catch (error) {
    return cTime;
  }
};

/**
 * 时间戳 转 UTC格式时间, 入参是时间戳、返回的类型
 * @param timeStamp
 * @param returnType
 * @returns
 */
export const timerToUTC = (timeStamp, returnType) => {
  timeStamp = parseInt(timeStamp);
  var date = new Date();
  if (timeStamp < 90000000000) {
    date.setTime(timeStamp * 1000);
  } else {
    date.setTime(timeStamp);
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  if (returnType == "str") {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  }
  if (returnType == "assistEndTime") {
    return y * 1 - 2000 + "/" + m + "/" + d;
  }
  return [y, m, d, h, minute, second];
};

/**
 * 根据时间戳 检查 时间是否过期 true 表示没过期， false 表示过期
 * @param time
 * @returns
 */
export const checkTimeStamp = (time) => {
  if (time < 90000000000) {
    time *= 1000;
  }
  var timer = time - new Date().getTime();
  timer = parseInt(timer / 1000);
  if (timer < 0) {
    return false;
  } else {
    return true;
  }
};
