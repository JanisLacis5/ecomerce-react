import React, {useContext, useEffect, useState} from "react"
import {useAuth0} from "@auth0/auth0-react"

const UserContext = React.createContext()
export const UserProvider = ({children}) => {
    const {loginWithRedirect, isAuthenticated, logout} = useAuth0()
    return (
        <UserContext.Provider
            value={{loginWithRedirect, isAuthenticated, logout}}>
            {children}
        </UserContext.Provider>
    )
}
// make sure use
export const useUserContext = () => {
    return useContext(UserContext)
}
