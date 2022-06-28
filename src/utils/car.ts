/**
 * 验证车牌号
 * @param val 
 * @returns 
 */
export const isCarNum = (val: string) => {
  var patrn = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/
  var patrn2 = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))$/
  if (!patrn.test(val) && !patrn2.test(val)) {
    return false
  } else {
    return true
  }
}

/**
 * 校验车架号
 * @param val 
 * @returns 
 */
export const isVehicle = (val: string) => {
  var patrn = /^[A-HJ-NP-Za-hj-np-z0-9]+$/
  if (!patrn.test(val) || val === '') {
    return false
  } else {
    return true
  }
}
