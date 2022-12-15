import { parseCookies, setCookie } from "nookies";

const USER_TOKEN = "USER_TOKEN";
const MAXAGE_TOKEN = "MAXAGE_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export const setItemToCookie = (key: string, value: any) => {
    setCookie(null, key, value, {
        path: "/",
        // httpOnly: true
    });
}
export const getItemFromCookie = (key: string) => {
    const cookieRes = parseCookies();
    return cookieRes[key] ?? "";
}

export const setUserToken = (valueToken: string, timeExpried: number) => {
    setItemToCookie(USER_TOKEN, valueToken);
    if (timeExpried) {
        setItemToCookie(MAXAGE_TOKEN, timeExpried);
    }
}

export const setRefreshToken = (valueToken: string) => {
    setItemToCookie(REFRESH_TOKEN, valueToken);
}