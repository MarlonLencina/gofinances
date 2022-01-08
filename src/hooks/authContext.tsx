import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import * as AuthSession from 'expo-auth-session'

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as AppleAuthentication from 'expo-apple-authentication'

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
    user: UserProps
    userStorageIsLoading: boolean
    signWithGoogle: () => Promise<void>
    signWithApple: () => Promise<void>
    signOut: () => Promise<void>
}

export const AuthContext = createContext({} as authContextData)

export interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider = ({children}: AuthProviderProps) => {

    const userStorageKey = '@gofinances:user'

    const [user, setUser] = useState<UserProps>({} as UserProps)
        
    const [userStorageIsLoading, setUserStorageIsLoading] = useState(true)

    const loadStorage = async () => {

        const data = await AsyncStorage.getItem(userStorageKey)
        const user = JSON.parse(data) as UserProps
        setUser(user)
        setUserStorageIsLoading(false)
        // console.log(`buscando no storage => ${JSON.stringify(data)}`)

    }

    useEffect(() => {

        loadStorage()

    }, [])


    // const LoadStorageData = async () => {

    //     const response = await AsyncStorage.getItem(userStorageKey)

    //     if(response){
    //         const userLogged = JSON.parse(response) as UserProps;
    //         setUser(userLogged)
            
    //         setUserStorageIsLoading(false)
    //     }

    // }

    // useEffect(() => {
    //     LoadStorageData()
    // })


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


            if(type === 'success'){

                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

                const data = await response.json()

                const user = {
                    id: data.id,
                    email: data.email,
                    name: data.given_name,
                    photo: data.picture
                }

                setUser(user)

                await AsyncStorage.setItem(userStorageKey, JSON.stringify(user))
                // console.log(`salvando no storage => ${JSON.stringify(JSON.stringify(user))}`)

                }

        } catch (error) {

            throw new Error(error)
            
        }
    }


    async function signWithApple(){


        try {
            
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,

                ]
            })

            if(credential){
                const name = credential.fullName!.familyName!
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.familyName!,
                    photo
                }


                setUser(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }

        } catch (error) {
            console.log(error)
            throw new Error('Falha na autenticação')            
        }
    }

    async function signOut(){
        setUser({} as UserProps)
        await AsyncStorage.removeItem(userStorageKey)
    }

    return (
        <AuthContext.Provider value={{
            user,
            signWithGoogle,
            signWithApple,
            signOut,
            userStorageIsLoading
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