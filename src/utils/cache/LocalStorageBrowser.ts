import { BaseLocalStorage } from "./BaseLocalStorage";

export class LocalStorageBrowser extends BaseLocalStorage {
  setItem(key: string, value: unknown) {
    localStorage.setItem(this.keyPrefix + key, JSON.stringify(value));
  }

  getItem(key: string) {
    let raw = localStorage.getItem(this.keyPrefix + key);
    try {
      if (raw == undefined) {
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

  removeItem(key: string): void {
    localStorage.removeItem(this.keyPrefix + key);
  }

  clear(): void {
    localStorage.clear();
  }

  keys(): string[] {
    return Object.keys(localStorage)
      .filter((v) => v.indexOf(this.keyPrefix) === 0)
      .map((v) => v.substr(this.keyPrefix.length));
  }
}
