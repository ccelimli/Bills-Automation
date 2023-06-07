import React from "react";
import { Navigate } from "react-router-dom"

const AuthPrivateRoute = ({ children }) => {
    //SuperSecurityKeySuperSecurityKey
    const token = localStorage.getItem('token')

    console.warn(token);

    const currentUser = false
        
        if (currentUser) {
            console.log("User Found")
            return (
                <Navigate
                    to = {'/sign-in'}
                />
            )
        }
        
    return children
}

export default AuthPrivateRoute