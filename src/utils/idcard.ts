/**
 * 校验身份证的合法性
 * @param idcard
 * @returns
 */
export const checkIdcard = (idcard: number | string) => {
  var Errors = new Array(
    "ok",
    "身份证号码位数错误",
    "身份证号码出生日期错误",
    "身份证号码校验错误",
    "身份证地区错误"
  );
  var area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外",
  };

  var idcard, Y, JYM, ereg;
  var S, M;
  var idcard_array = new Array();
  idcard_array = idcard.split("");
  //地区检验
  if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
  //身份号码位数及格式检验
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
      } else {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
      }
      if (ereg.test(idcard)) return Errors[0];
      else return Errors[2];
      break;
    case 18:
      //18位身份号码检测
      //出生日期的合法性检查
      //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (
        parseInt(idcard.substr(6, 4)) % 4 == 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 == 0 &&
          parseInt(idcard.substr(6, 4)) % 4 == 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}[1-2]+[0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
      } else {
        ereg =
          /^[1-9][0-9]{5}[1-2]+[0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
      }
      // 测试出生日期的合法性
      if (ereg.test(idcard)) {
        //计算校验位
        S =
          (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
          (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
          (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
          (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
          (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
          (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
          (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
          parseInt(idcard_array[7]) * 1 +
          parseInt(idcard_array[8]) * 6 +
          parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1); //判断校验位
        if (M == idcard_array[17]) return Errors[0]; //检测ID的校验位
        else return Errors[3];
      } else {
        return Errors[2];
      }
      break;
    default:
      return Errors[1];
      break;
  }
};

// 计算最后一位应该是多少
function idCardEndNum(idCard) {
  idCard = idCard.toString();
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0;
  var ai = 0;
  var wi = 0;
  for (var i = 0; i < 17; i++) {
    ai = idCard[i];
    wi = factor[i];
    sum += ai * wi;
  }
  var last = parity[sum % 11];
  return last;
}

// 解析生日信息
function birthDay(idCard) {
  idCard = idCard.toString();
  var birthday, month, day, nong;
  let year = idCard.substr(6, 4);
  month = idCard.substr(10, 2);
  day = idCard.substr(12, 2);
  birthday = year + "/" + month + "/" + day;
  nong = Nong(birthday);
  let nongyear = nong.substr(0, 4);
  return {
    date: birthday,
    nong: nong,
    year: year,
    month: month,
    day: day,
    nongCn: NongCn(birthday),
    week: dict.week(birthday), // 星期几
    zodiac: dict.zodiac(month, day), // 星座
    zodiac_zh: dict.zodiac_zh(nongyear), // 生肖
  };
}

// 验证身份证号是否正确
function checkIdCard(idCard) {
  idCard = idCard.toString();
  if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
    if (idCard.length >= 18) {
      return idCardEndNum(idCard) == idCard[17].toUpperCase();
    } else {
      return false;
    }
  }
  return false;
}

// 补全身份证号
function repairIdCard(idCard) {
  idCard = idCard.toString();
  if (/(^\d{17}$)/.test(idCard)) return idCard + idCardEndNum(idCard);
  if (/(^\d{18}$)/.test(idCard))
    return idCard.slice(0, 17) + idCardEndNum(idCard);
}

// 15位转换18位
function num15to18(idCard) {
  idCard = idCard.toString();
  if (/(^\d{15}$)/.test(idCard))
    return repairIdCard(idCard.slice(0, 6) + "19" + idCard.slice(6, 15));
}

// 性别解析
function sex(idCard) {
  idCard = idCard.toString();
  if (idCard[16] % 2) return "男";
  return "女";
}

export default {
  checkIdcard: checkIdcard,
};
