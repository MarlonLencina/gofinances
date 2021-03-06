import React from "react";
import {
    createStackNavigator
} from '@react-navigation/stack'


import { SignIn } from "../screens/signin";


const {
    Navigator,
    Screen
} = createStackNavigator()

export const AuthRoutes = () => {
    
        return (
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                name="SignIn"
                component={SignIn}
                />
            </Navigator>
        )
}