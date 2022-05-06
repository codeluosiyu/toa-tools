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
