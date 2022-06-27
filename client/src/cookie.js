import jwtDecode from "jwt-decode";

export function saveJwtToCookie(JWT) {
    document.cookie = JWT;
}

export function getUserFromCookie() {
    try {
        return jwtDecode(getJwt());
    } catch (e) {
        return null;
    }
}

export function getJwt() {
    return document.cookie;
}