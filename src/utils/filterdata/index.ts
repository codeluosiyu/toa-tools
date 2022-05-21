/**
 * @param {number[]} nums
 * @return {number[]}
 */
export const findDuplicates = function (nums) {
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
 * 数组对象去重
 * @param arr
 * @param key
 * @param hash
 * @returns
 */
export const unique = (arr: AnyArray, key: string, hash: any = {}) =>
  arr.reduce(function (item, next) {
    hash[next[key]] ? "" : (hash[next[key]] = true && item.push(next));
    return item;
  }, []);

/**
 * 校验输入框是都有表情
 * @param substring
 * @returns
 */
export const isEmojiCharacter = (substring) => {
  for (var i = 0; i < substring.length; i++) {
    const hs = substring.charCodeAt(i);
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls = substring.charCodeAt(i + 1);
        var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (uc >= 0x1d000 && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1);
      if (ls === 0x20e3) {
        return true;
      }
    } else {
      if (hs >= 0x2100 && hs <= 0x27ff) {
        return true;
      } else if (hs >= 0x2b05 && hs <= 0x2b07) {
        return true;
      } else if (hs >= 0x2934 && hs <= 0x2935) {
        return true;
      } else if (hs >= 0x3297 && hs <= 0x3299) {
        return true;
      } else if (
        hs === 0xa9 ||
        hs === 0xae ||
        hs === 0x303d ||
        hs === 0x3030 ||
        hs === 0x2b55 ||
        hs === 0x2b1c ||
        hs === 0x2b1b ||
        hs === 0x2b50
      ) {
        return true;
      }
    }
  }
};
