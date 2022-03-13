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
export const formatDateTime = (date: string, num: number = 3, interval: string = '-') => {
    const arr = date.split("T");
    const d = arr[0];
    const darr = d.split('-');
    const t = arr[1];
    const tarr = t.split('+');
    const marr = tarr[0].split(':');
    const tzone = Number(tarr[1].substr(0, 2))
    const dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
    let time = new Date(Date.parse(dd));
    time.setTime(time.setHours(time.getHours() + (8 - tzone)));
    let Y = time.getFullYear() + interval;
    const addZero = (num: number) => num < 10 ? '0' + num : num;
    let M = addZero(time.getMonth() + 1) + interval;
    let D = addZero(time.getDate());
    let h = ' ' + addZero(time.getHours());
    let m = ':' + addZero(time.getMinutes());
    let s = ':' + addZero(time.getSeconds());
    let result = Y + M + D
    switch (num) {
      case 2:
        result = h + m
        break
      case 3:
        result = Y + M + D
        break;
      case 4:
        result = Y + M + D + h
        break;
      case 5:
        result = Y + M + D + h + m
        break;
      case 6:
        result = Y + M + D + h + m + s
        break;
    }
    return result;
  }