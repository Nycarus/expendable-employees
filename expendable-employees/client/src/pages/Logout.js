import React from 'react';
import { Redirect } from 'react-router';
import {removeUserSession} from "../utils/userSession";

export default function Logout() {
    removeUserSession();
    return <Redirect to={{pathname: "/login"}}/>;
}