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
