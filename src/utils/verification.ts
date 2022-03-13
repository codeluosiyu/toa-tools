/**
 * 过滤表情
 * @param name
 * @returns
 */
export const filterEmoji = (name) => {
  const str = name.replace(
    /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
    ""
  );
  return str;
};

/**
 * 过滤税号
 * @param num
 * @returns
 */
export const isNumber = (num: string) =>
  /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(num);

/**
 * 验证手机号
 * @param phone
 * @returns
 */
export const isPhone = (phone: any) => /^[1][0-9]{10}$/.test(phone);

/**
 * 验证邮箱
 * @param email
 * @returns
 */
export const isEmail = (email: string) =>
  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
    email
  );

/**
 * 验证是否存在特殊符号或者表情
 * @param value
 * @param tips
 * @returns
 */
export const hasEmoji = function (value: string, tips = "") {
  let char =
    /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
  if (char.test(value)) {
    return true;
  }
  return false;
};

/**
 * 获取数组索引值
 * @param param0 
 * @returns 
 */
export const getIndexArr = function ({
    id = "",
    productTree = [],
    idKey = 'id',
    childrenKey = 'child'
  }: { id: string, productTree?: Array<any>, idKey?: string, childrenKey?: string }) {
    let indexArr: number[] = []
    let fn: (arr: Array<any>) => boolean = (arr) => arr.some((elem: any, index) => {
      if (elem[idKey] == id) {
        indexArr.push(index)
        return true
      } else if (elem[childrenKey] && elem[childrenKey] instanceof Array && elem[childrenKey].length) {
        return fn(elem[childrenKey]) && indexArr.push(index)
      }
      return false
    })
    fn(productTree)
    indexArr.reverse()
    return indexArr
  }