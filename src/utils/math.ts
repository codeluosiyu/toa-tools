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

/**
 * 从一个给定的数组arr中,随机返回num个不重复项
 * @param arr
 * @param num
 * @returns
 */
export const getArrayItems = function (arr: Array<any>, num: number) {
  //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
  var temp_array = new Array();
  for (var index in arr) {
    temp_array.push(arr[index]);
  }
  //取出的数值项,保存在此数组
  var return_array = new Array();
  for (var i = 0; i < num; i++) {
    //判断如果数组还有可以取出的元素,以防下标越界
    if (temp_array.length > 0) {
      //在数组中产生一个随机索引
      var arrIndex = Math.floor(Math.random() * temp_array.length);
      //将此随机索引的对应的数组元素值复制出来
      return_array[i] = temp_array[arrIndex];
      //然后删掉此索引的数组元素,这时候temp_array变为新的数组
      temp_array.splice(arrIndex, 1);
    } else {
      //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
      break;
    }
  }
  return return_array;
};

/**
 * 返回数组种重复数据的列表
 * @param nums
 * @returns
 */
export const findDuplicates = function (nums: Array<any>) {
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
 * 在M*N网格内筛选出最短路径，寻路
 * @param grid 0 空、1 障碍
 * @param k
 * @returns
 */
export const shortestPath = function (grid: Array<Array<number>>, k: number) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const height = grid.length;
  const width = grid[0].length;
  const dp = Array(height)
    .fill()
    .map((_) =>
      Array(width)
        .fill()
        .map((_) => Array(k + 1).fill(Infinity))
    );
  dp[0][0][0] = 0;
  const queue = [[0, 0]];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const status = dp[y][x];

    for (const [offsetX, offsetY] of directions) {
      const nextXY = [x + offsetX, y + offsetY];
      const [nextX, nextY] = nextXY;

      if (nextX >= 0 && nextY >= 0 && nextX < width && nextY < height) {
        const nextStatus = dp[nextY][nextX];
        const isObstacle = grid[nextY][nextX] == 1;

        let available = false;
        if (!isObstacle) {
          for (let i = 0; i < k + 1; i++) {
            const nextStep = status[i] + 1;
            if (nextStep < nextStatus[i]) {
              nextStatus[i] = nextStep;
              available = true;
            }
          }
        } else {
          for (let i = 0; i < k; i++) {
            const nextStep = status[i] + 1;
            if (nextStep < nextStatus[i + 1]) {
              nextStatus[i + 1] = nextStep;
              available = true;
            }
          }
        }
        if (available) queue.push(nextXY);
      }
    }
  }
  let totalSteps = Math.min(...dp[height - 1][width - 1]);
  return totalSteps == Infinity ? -1 : totalSteps;
};
