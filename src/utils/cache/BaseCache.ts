export const setSession = (name, val) => {
  return sessionStorage.setItem(name, JSON.stringify({ v: val }));
};

export const getSession = (name) => {
  if (!sessionStorage.getItem(name)) {
    return "";
  } else {
    let v = "";
    try {
      v = JSON.parse(sessionStorage.getItem(name)).v; //try---如果‘name’是个{}，并且存在set赋值得v。那么return v 出去，否则catch抛出去
      if (v === undefined) {
        v = JSON.parse(sessionStorage.getItem(name));
      }
    } catch (e) {
      v = sessionStorage.getItem(name);
    }
    return v;
  }
};

export const setLocal = (name, val) => {
  return localStorage.setItem(name, JSON.stringify({ v: val }));
};

export const getLocal = (name) => {
  if (!JSON.parse(localStorage.getItem(name))) {
    return "";
  } else {
    let v = "";
    try {
      v = JSON.parse(localStorage.getItem(name)).v;
      if (v === undefined) {
        v = JSON.parse(localStorage.getItem(name));
      }
    } catch (e) {
      v = localStorage.getItem(name);
    }
    return v;
  }
};

export const sessionClear = () => {
  return sessionStorage.clear();
};

export const localClear = () => {
  return localStorage.clear();
};

export const removeSession = (name) => {
  return sessionStorage.removeItem(name);
};

export const getCookit = (key) => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(key + "=");
    if (c_start != -1) {
      c_start = c_start + key.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};

export const getCookie = (key, cookies) => {
  var value = "";
  var isInBrowser = typeof window !== "undefined";
  if (!cookies) {
    if (isInBrowser) {
      cookies = document.cookie;
    } else {
      return value;
    }
  }
  var cookieArr = cookies.split("; ");
  for (var i = 0, cookie = void 0, index = void 0; i < cookieArr.length; i++) {
    cookie = cookieArr[i];
    index = cookie.indexOf("=");
    if (cookie.substr(0, index) === key) {
      value = cookie.substr(index + 1);
    }
  }
  return value;
};
