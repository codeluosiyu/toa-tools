import { BaseLocalStorage } from "./BaseLocalStorage";

export class LocalStorageMiniapp extends BaseLocalStorage {
  private _miniAppObj: any;

  constructor(miniAppObj: any) {
    super();
    this._miniAppObj = miniAppObj;
  }

  // 同步
  setItem(key: string, value: unknown) {
    return this._miniAppObj.setStorageSync(
      this.keyPrefix + key,
      JSON.stringify(value)
    );
  }

  getItem(key: string) {
    let raw = this._miniAppObj.getStorageSync(this.keyPrefix + key);
    try {
      if (raw == undefined || raw == "") {
        return undefined;
      } else {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn(
        "Parse JSON Error when getItem from localStorage: " + key,
        raw,
        e
      );
      return undefined;
    }
  }

  removeItem(key: string) {
    this._miniAppObj.removeStorageSync(this.keyPrefix + key);
  }

  clear() {
    this._miniAppObj.clearStorageSync();
  }

  keys() {
    return (this._miniAppObj.getStorageInfoSync().keys as string[])
      .filter((v) => v.indexOf(this.keyPrefix) === 0)
      .map((v) => v.substr(this.keyPrefix.length));
  }
}
