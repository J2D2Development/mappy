export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_MAP = 'SET_MAP';

export function login(user) {
    return { type: LOGIN, user };
}

export function logout() {
    return { type: LOGOUT };
}

export function setMap(mapObj) {
    return { type: SET_MAP, mapObj };
}