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
  var m: String | Number = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d: String | Number = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h: String | Number = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute: String | Number = date.getMinutes();
  var second: String | Number = date.getSeconds();
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
  var timer: number = time - new Date().getTime();
  timer = parseInt(timer / 1000);
  if (timer < 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * IOS格式时间 转 国际UTC标准时间
 * @param data
 * @returns
 */
export const iosDateToUtc = (data: string) => {
  return JSON.parse(
    JSON.stringify(data).replace(
      /\/Date\(\-?(\d+)(?:\-|\+)(?:\d+)\)\//g,
      function () {
        return new Date(Number(arguments[1]) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/^(.*)T(.*)\.\d+Z$/, "$1 $2");
      }
    )
  );
};

/**
 * 返回当前时间
 * @param type
 * @param addTime
 * @returns
 */
export function returnNowTime(type, addTime) {
  var dateObj = new Date();
  var cTime: any = dateObj.getTime();
  if (addTime) {
    cTime += addTime;
  }
  if (!type) {
    type = "number";
  }
  if (type == "number") {
    return cTime;
  }
  if (type == "YYYYMMDD") {
    var timeStamp = parseInt(cTime);
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
    return y + m + d;
  }
  return this.toDate(cTime / 1000, "str");
}

/**
 * 返回2个UTC时间之间的时间差
 * @param startTime
 * @param endTime
 * @returns
 */
export const getDateDiff = (startTime: any, endTime: any) => {
  //将日期字符串转换为时间戳
  var sTime: any = new Date(startTime).getTime(); //开始时间
  var eTime: any = new Date(endTime).getTime(); //结束时间
  //作为除数的数字
  var divNumSecond = 1000;
  var divNumMinute = 1000 * 60;
  var divNumHour = 1000 * 3600;
  var divNumDay = 1000 * 3600 * 24;

  const day: any = parseInt((eTime - sTime) / parseInt(divNumDay));
  const hour: any = parseInt(
    ((eTime - sTime) % parseInt(divNumDay)) / parseInt(divNumHour)
  );
  const minute: any = parseInt(
    parseInt(((eTime - sTime) % parseInt(divNumDay)) % parseInt(divNumHour)) /
    parseInt(divNumMinute)
  );
  const second: any =
    (parseInt(((eTime - sTime) % parseInt(divNumDay)) % parseInt(divNumHour)) %
      parseInt(divNumMinute)) /
    parseInt(divNumSecond);
  const str: any = day + "天" + hour + "小时" + minute + "分" + second + "秒";
  return str;
};

/**
 * 计算星座
 * @param mon
 * @param day
 * @returns
 */
export const constellation = (mon, day) => {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  mon = parseInt(mon);
  day = parseInt(day);

  const words = [
    "白羊座",
    "金牛座",
    "双子座",
    "巨蟹座",
    "狮子座",
    "处女座",
    "天秤座",
    "天蝎座",
    "射手座",
    "摩羯座",
    "水瓶座",
    "双鱼座",
  ];

  if (mon < 1 || mon > 12) {
    throw new Error("Invalid month.");
  }

  if (day < 1 || day > days[mon - 1]) {
    throw new Error("Invalid day.");
  }

  var val = mon * 100 + day;

  if (val >= 321 && val <= 419) {
    return words[0];
  } else if (val >= 420 && val <= 520) {
    return words[1];
  } else if (val >= 521 && val <= 621) {
    return words[2];
  } else if (val >= 622 && val <= 722) {
    return words[3];
  } else if (val >= 723 && val <= 822) {
    return words[4];
  } else if (val >= 823 && val <= 922) {
    return words[5];
  } else if (val >= 923 && val <= 1023) {
    return words[6];
  } else if (val >= 1024 && val <= 1122) {
    return words[7];
  } else if (val >= 1123 && val <= 1221) {
    return words[8];
  } else if (val >= 1222 || val <= 119) {
    return words[9];
  } else if (val >= 120 && val <= 218) {
    return words[10];
  } else if (val >= 219 && val <= 320) {
    return words[11];
  }
  return "";
};


/**
 * 判断某一年是否是闰年
 * @param year 可以是一个date类型，也可以是一个int类型的年份，不传默认当前时间
 */
export const _isLeapYear = (year) => {
  if (year === undefined) year = new Date();
  if (year instanceof Date) year = year.getFullYear();
  return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

/**
 * 获取某一年某一月的总天数，没有任何参数时获取当前月份的
 * 方式一：dateUtils.getDaysOfMonth();
 * 方式二：dateUtils.getDaysOfMonth(new Date());
 * 方式三：dateUtils.getDaysOfMonth(2013, 12);
 */
export const _getDaysOfMonth = (date, month) => {
  var y, m;
  if (date == undefined) date = new Date();
  if (date instanceof Date) {
    y = date.getFullYear();
    m = date.getMonth();
  }
  else if (typeof date == 'number') {
    y = date;
    m = month - 1;
  } else if (typeof date == 'String') {
    var strdate = new Date(date);
    y = strdate.getFullYear();
    m = strdate.getMonth();
  }
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 非闰年的一年中每个月份的天数
  //如果是闰年并且是2月
  if (m == 1 && _isLeapYear(y)) return days[m] + 1;
  return days[m];
}