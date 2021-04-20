export function getUser() {
    let user = window.sessionStorage.getItem("user");
    
    if (user){
        return user;
    }
    else {
        return null;
    }
}

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
    window.sessionStorage.removeItem("user");
}

export function setUserSession(data) {
    window.sessionStorage.setItem("token", data.token);
    window.sessionStorage.setItem("user", data.user_id);
}