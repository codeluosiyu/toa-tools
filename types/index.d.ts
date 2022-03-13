declare module "toa-tools" {
    // client methods
    export const loading: {
        show: (options?: {
            content?: string;
            isShowCancel?: boolean;
            needMask?: boolean;
        }) => void;
        hide: () => void;
    };
    export const appVersion: () => string;
    export const isInApp: () => boolean;
    export const isInWechat: () => boolean;
    export const isInWechatH5: () => boolean;
    export const isInWechatMp: () => boolean;
    export const isInQuickApp: () => boolean;
    export const isInBaiDu: () => boolean;
    export const isInToutiao: () => boolean;
    export const isInAlipay: () => boolean;
    export const isInAlipayH5: () => boolean;
    export const isInAlipayMp: () => boolean;
    export const isInQQ: () => boolean;
    export const isInIOS: () => boolean;
    export const isIPhoneXSeries: () => boolean;
    export const isInCtApp: () => boolean;
    export const isInCtWeb: () => boolean;
    export const isInZhixingApp: () => boolean;
    export const getEnvByHost: () => string;
    export const postUBT: (
        pageid: {
            h5: string;
            app?: string;
            wechatH5?: string;
            wechatMp?: string;
            quickApp?: string;
            baidu?: string;
            toutiao?: string;
            alipayMp?: string;
            QQ?: string;
        },
        callback?: () => void
    ) => void;
    export const jump: (arg0: string | object) => void;
    export const back: () => {};
    export const getQuery: (arg0: string, arg1?: boolean) => string;
    export const getQueryAll: () => object;
    export const url: {
        dirname: () => string;
        basename: () => string;
        filename: () => string;
    };
    export const isLogin: () => boolean;
    export const forceLogin: (options?: {
        env?: string;
        from?: string;
        backUrl?: string;
        dynamic?: boolean;
        appCallback?: () => void;
    }) => void;
    export const login: (
        callback?: () => void,
        options?: {
            env?: string;
            from?: string;
            backUrl?: string;
            dynamic?: boolean;
            appCallback?: () => void;
        }
    ) => void;
    export const setShare: (
        options: {
            appType?: any[];
            icon?: string;
            title?: string;
            desc?: string;
            href?: string;
            image?: string;
            wechatMp?: string | object;
            quickApp?: string;
            baidu?: string;
            toutiao?: string;
            alipayMp?: string;
            qq?: string;
            miniProgramID?: string;
        },
        success?: () => void,
        cancel?: () => void
    ) => any;
    export const callOneShare: (
        options: {
            type?: string;
            icon?: string;
            title?: string;
            desc?: string;
            href?: string;
            image?: string;
            wechatMp?: string;
        },
        success?: () => void,
        cancel?: () => void
    ) => void;
    export const wechatReady: (callback?: (wx: object) => void) => void;
    export const quickAppReady: (callback?: (qa: object) => void) => void;
    export const baiduReady: (callback?: (swan: object) => void) => void;
    export const toutiaoReady: (callback?: (tt: object) => void) => void;
    export const alipayReady: (callback?: (my: object) => void) => void;
    export const qqReady: (callback?: (qq: object) => void) => void;
    export const openWechatMp: (options: { path: string }) => void;
    export const setTitle: (title?: string) => void;
    export const setNavBar: (options: { hide?: boolean; color?: string }) => void;
    export const getWechatUserInfo: (
        callback?: (userInfo: object) => void
    ) => void;
    export const activateApp: (
        url?: string,
        downloadApp?: boolean,
        callback?: () => void
    ) => void;
    export const getUnion: () => object;
    export const getRmsToken: (callback?: (rmsToken) => void) => void;
    export const pay: (options: object) => void;
    export const pay2: (options: object) => void;
    export const localStorage: {
        setItem: (
            key: string,
            value: string | number | object,
            timeout: number
        ) => void;
        getItem: (key: string) => string | object;
        removeItem: (key: string) => void;
    };
    export const sessionStorage: {
        setItem: (key: string, value: string | number | object) => void;
        getItem: (key: string) => string | object;
        removeItem: (key: string) => void;
    };
    export const app: {
        on: (key: string, callback: (...args) => void) => void;
        off: (key: string) => void;
    };
    export const on: (key: string, callback: (...args) => void) => void;
    export const emit: (key: string, ...args) => void;
    export const off: (key: string) => void;
    export const $: () => any;
    export const debounce: (
        func: () => void,
        wait: number,
        immediate?: boolean
    ) => any;
    export const throttle: (
        func: () => void,
        wait: number,
        options?: {
            leading?: boolean;
            trailing?: boolean;
        }
    ) => any;

    // server methods
    export const version: () => string;
    export const isString: () => boolean;
    export const isNumber: () => boolean;
    export const isArray: () => boolean;
    export const isObject: () => boolean;
    export const isFunction: () => boolean;
    export const isUndefined: () => boolean;
    export const isServer: () => boolean;
    export const isClient: () => boolean;
    export const getGateway: (config: {
        req?: object;
        env?: string;
        code?: string;
        name?: string;
    }) => string;
    export const model: (
        code: string | object,
        name?: string,
        body?: object,
        req?: object,
        env?: string
    ) => Promise<any>;
    export const modelSet: (params: object) => void;
    export const modelLog: (callback: () => void, keepOne?: boolean) => void;
    export const CModel: (config?: object) => any;
    export const base64: {
        encode: (arg0: string) => void;
        decode: (arg0: string) => void;
    };
    export const time2Date: (time?: number, type?: string) => string;
    export const date2Time: (date?: string) => number;
    export const formatDate: <T>(arg0: T) => T;
    export const formatQuery: (arg0: object) => string;
    export const randomInt: (lower: number, upper: number) => number;
}
