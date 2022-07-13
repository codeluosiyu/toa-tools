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


function charToBinary(text) {
  var code = "";
  for (let i of text) {
    // 字符编码
    let number = i.charCodeAt().toString(2);
    // 1 bytes = 8bit，将 number 不足8位的0补上
    for (let a = 0; a <= 8 - number.length; a++) {
      number = 0 + number;
    }
    code += number;
  }
  return code;
}

/**
 * 将二进制数据每 6bit 位替换成一个 base64 字符
 * @param code 
 * @returns 
 */
export const binaryTobase64 = (code) => {
  let base64Code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let res = '';
  if (code.length % 24 === 8) {
    code += '0000';
    res += '=='
  }
  if (code.length % 24 === 16) {
    code += '00';
    res += '='
  }

  let encode = '';
  for (let i = 0; i < code.length; i += 6) {
    let item = code.slice(i, i + 6);
    encode += base64Code[parseInt(item, 2)];
  }
  return encode + res;
}