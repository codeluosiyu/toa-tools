/** 兼容浏览器和小程序的缓存方法 */
export abstract class BaseLocalStorage {
  keyPrefix = "";
  abstract getItem<T = unknown>(key: string): T | undefined;
  abstract setItem(key: string, value: any): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
  abstract keys(): string[];
}
