/**
 * 输入一个数组，然后拍平输出，保证文件名唯一
 * @param names
 * @returns
 */
export const getFolderNames = (names: string[]): string[] => {
  let d: { [_: string]: number } = {};
  return names.map((name) => {
    let s = name;
    while (s in d) {
      s = `${name}(${d[name]})`;
      ++d[name];
    }
    d[s] = 1;
    return s;
  });
};

/**
 * 计算文件占用体积
 * @param size
 * @returns
 */
export const handleSize = (size) => {
  const KB = size / 1024;
  const MB = KB / 1024;
  const GB = MB / 1024;
  const TB = GB / 1024;
  if (MB < 1) {
    return `${KB.toFixed(2)} KB`;
  } else if (GB < 1) {
    return `${MB.toFixed(2)} MB`;
  } else if (TB < 1) {
    return `${GB.toFixed(2)} GB`;
  } else {
    return `${TB.toFixed(2)} TB`;
  }
};
