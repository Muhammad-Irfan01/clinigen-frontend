import Cookies from "js-cookie";

export const cookie = {
    set: (key: string, val: string) => Cookies.set(key, val, {expires: 7}),

    get: (key: string) => Cookies.get(key),

    remove: (key: string) => Cookies.remove(key),
}