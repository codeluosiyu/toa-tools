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
