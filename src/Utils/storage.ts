import { parseCookies, setCookie } from "nookies";
import cookie from "cookie";

const handleTokenToCookie = (key: string, tokenValue: string) => {
    setCookie(null, key, tokenValue, {
        path: "/"
    });
}

export const getTokenFromCookie = (key: string) => {
    const tokenStorage = parseCookies();
    return tokenStorage[key] ?? "";
}

//to-do validate expried token and work with refresh token
