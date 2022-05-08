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
