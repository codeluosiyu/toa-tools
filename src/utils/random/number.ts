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

/**
 * 切分数组
 * @param nums 
 * @returns 
 */
export const splitArray = (nums) => {
  return bfs(nums, divide(nums));
  function bfs(nums, { factors, multiples }) {
    const n = nums.length;
    const steps = Array.from({ length: n + 1 }, () => Infinity);
    steps[0] = 0;
    let status: any = new Set([0]);
    while (status.size) {
      const status2 = new Set();
      for (const i of status) {
        const step = steps[i] + 1;
        for (const [factor, next] of factors[i]) {
          const multiple = multiples.get(factor);
          for (let j = next; j < multiple.length; j++) {
            const index = multiple[j] + 1;
            if (step < steps[index]) {
              steps[index] = step;
              if (index < n) status2.add(index);
            }
          }
        }
      }
      status = status2;
    }
    return steps[n];
  }

  function divide(nums) {
    const n = nums.length;
    const max = Math.max(...nums);
    const positions = new Map();
    for (let i = 0; i < n; i++) {
      const num = nums[i];
      if (!positions.has(num)) {
        positions.set(num, []);
      }
      positions.get(num).push(i);
    }

    const factors = Array.from({ length: n }, () => new Map());
    const multiples = new Map();

    const isPrimes = Array(max + 1).fill(true);
    isPrimes[0] = false;
    isPrimes[1] = false;
    for (let i = 2; i <= max; i++) {
      if (isPrimes[i]) {
        if (positions.has(i)) {
          for (const index of positions.get(i)) {
            addFactor(i, index);
          }
        }
        for (let j = i + i; j <= max; j += i) {
          isPrimes[j] = false;
          if (positions.has(j)) {
            for (const index of positions.get(j)) {
              addFactor(i, index);
            }
          }
        }
        if (multiples.has(i)) {
          multiples.get(i).sort((a, b) => a - b);
        }
      }
    }
    return { factors, multiples };

    function addFactor(factor, i) {
      if (!multiples.has(factor)) {
        multiples.set(factor, []);
      }
      factors[i].set(factor, multiples.get(factor).push(i) - 1);
    }
  }
};

