import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getUserToken} from "./userSession";

export function ProtectedRoute({component: Component, fallBack: fallback, ...rest}) {
    let isLoggedIn = false;

    if (getUserToken()){
        isLoggedIn = true;
    }

    return (
        <Route {...rest} render = {
            (props) => {
                if(isLoggedIn) {
                    return <Component {...props}/>;
                }
                else {
                    return <Redirect to={{pathname: "/login", state: {from: props.location}}}/>;
                }
            }
        }/>
    );
}