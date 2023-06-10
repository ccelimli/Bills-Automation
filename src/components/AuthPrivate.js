import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { getUserById } from "../redux/userSlice";

const AuthPrivateRoute = ({ children }) => {
    const [isJwtToken, setIsJwtToken] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token')
            setIsJwtToken(token ? false : true)

            if (token) {
                const decodedToken = await jwtDecode(token)
                const currentUserId = await decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            
                await dispatch(getUserById({currentUserId}))
                .then((response) => {
                    if (response?.meta?.requestStatus === 'fulfilled') {
                        if (response?.payload?.success) {
                            // console.log(response.payload.message);
                        } else {
                            throw new Error(response.payload.message)
                        }
                    } else {
                        throw new Error('Get User By Id Request Failed')
                    }
                })  
                .catch((err) => {
                    console.error(err);
                })
            } 
        }
        checkUser()
    }, [dispatch, children, isJwtToken])

    if (isJwtToken) {
        return (
            <Navigate
                to = {'/sign-in'}
            />
        )
    }

    return children
}

export default AuthPrivateRoute