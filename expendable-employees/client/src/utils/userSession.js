import axios from "axios";

/* To be implemented: Authenticate Token

export function isAuthenticated() {
    axios.get
}
*/

export function getUserToken() {
    let token = window.sessionStorage.getItem("token");

    if (token) {
        return token;
    }
    else {
        return null;
    }
}

export function removeUserSession() {
    window.sessionStorage.removeItem("token");
}

export function setUserSession(data) {
    window.sessionStorage.setItem("token", data.token);
}