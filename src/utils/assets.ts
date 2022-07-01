/**
 * 获取资源后缀
 * @param obj
 * @returns
 */
export const getAssetsType = async (obj: string) => {
  // 获取字符串中.之后的所有字符
  var index = obj.lastIndexOf(".");
  obj = obj.substring(index + 1, obj.length);
  return obj;
};

/**
 * 已知宽高获取图片相对于屏幕的高度使得自适应
 * @param obj
 * @param targetWidth
 * @returns
 */
export const getMediaHeight = async (obj: any, targetWidth = 750) => {
  let ratio = obj.width / obj.height;
  let targetHeight = targetWidth / ratio;
  return (targetHeight + 2).toFixed(2);
};
