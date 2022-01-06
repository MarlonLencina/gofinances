import React from "react";
import {
    useTheme
} from 'styled-components'

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import { Dashboard } from "../screens/dashboard";
import { Register } from "../screens/register";
import { Platform } from "react-native";

import {MaterialIcons} from '@expo/vector-icons'

const {
    Navigator, Screen
} = createBottomTabNavigator()

export const AppRoutes = () => {

    const theme = useTheme()

    return (
        <Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.secundary,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
                height: 88,
                paddingVertical: Platform.OS === 'ios' ? 20 : 0
            }
        }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                        tabBarIcon: (({color, size}) => <MaterialIcons color={color} size={size} name="format-list-bulleted"/> )
                }}
            />
             <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({color, size}) => <MaterialIcons color={color} size={size} name="attach-money"/> )
            }}
            />
             <Screen
                name="Resumo"
                component={Register}
                options={{
                    tabBarIcon: (({color, size}) => <MaterialIcons color={color} size={size} name="pie-chart"/> )
            }}
            />
        </Navigator>
    )
}