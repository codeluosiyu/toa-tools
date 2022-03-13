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
