import React from "react"
import {AuthProvider} from "../hooks/AuthContext"
import {ToastProvider} from "../hooks/ToastContext"


const AppProvider = ({children}: {children:React.ReactNode})=>{
    return(
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    )
}
export default AppProvider