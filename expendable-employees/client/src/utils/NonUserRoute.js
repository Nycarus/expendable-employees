import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getUserToken} from "./userSession";

export function NonUserRoute({component: Component, ...rest}) {
    let isLoggedIn = false;

    if (getUserToken()){
        isLoggedIn = true;
    }

    return (
        <Route {...rest} render = {
            (props) => {
                if(isLoggedIn) {
                    return <Redirect to={{pathname: "/user", state: {from: props.location}}}/>;
                }
                else {
                    return <Component {...props}/>;
                }
            }
        }/>
    );
}