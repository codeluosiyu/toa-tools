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
