/**
 * 检查是否支持CSS动画
 * @returns
 */
export const checkCssAnimation = function () {
  var styles = document.createElement("div").style;
  var animations = [
    "animation",
    "webkitAnimation",
    "msAnimation",
    "MozAnimation",
    "-moz-animation",
    "-webkit-animation",
  ];
  for (var i = 0, len = animations.length; i < len; i++) {
    if (animations[i] in styles) {
      return true;
    }
  }
  return false;
};
