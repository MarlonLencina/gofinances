import { createContext, ReactNode, useContext, useState } from "react";

import * as AuthSession from 'expo-auth-session'

interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

interface authContextData {
    signWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as authContextData)

export interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider = ({children}: AuthProviderProps) => {

    const [user, setUser] = useState<UserProps>({} as UserProps)

    async function signWithGoogle(){

        try {
            
            const CLIENT_ID = process.env.CLIENT_ID
            const REDIRECT_URI = process.env.REDIRECT_URI
            const RESPONSE_TYPE = 'token'
            const SCOPE = encodeURI('profile email')

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const {params, type} = 
            await AuthSession.startAsync({
                authUrl 
            }) as AuthorizationResponse

            console.log(params, type)

            if(type === 'success'){

                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

                const data = await response.json()


                setUser({
                    id: data.id,
                    email: data.email,
                    name: data.given_name,
                    photo: data.picture
                })
                }

                console.log(user)

        } catch (error) {

            throw new Error(error)
            
        }
    }


    return (
        <AuthContext.Provider value={{
            signWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export {
    AuthProvider,
    useAuth
}