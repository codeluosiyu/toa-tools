/**
 * 生成随机字符串(可指定长度)
 * @param len
 * @returns {string}
 */
export const randomString = function (len) {
  len = len || 8;
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  var maxPos = $chars.length;
  var pwd = "";
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 数组乱序
 * @param arr 
 * @returns 
 */
export const shuffleArray = (arr) => {
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[m], arr[index]] = [arr[index], arr[m]]
  }
  return arr;
}

