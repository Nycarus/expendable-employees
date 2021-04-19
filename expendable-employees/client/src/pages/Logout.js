import React from 'react';
import { Redirect } from 'react-router';
import {removeUserSession} from "../utils/userSession";
import {useHistory} from 'react-router-dom';

export default function Logout() {
    const history = useHistory();
    removeUserSession();
    return <Redirect to={{pathname: "/login"}}/>;
}