import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { SignIn } from './src/screens/signin';

import { Routes } from './src/routes';

import { useAuth } from './src/hooks/authContext';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { AppRoutes } from './src/routes/app.routes';

import { AuthProvider } from './src/hooks/authContext';

export default function App() {

  const {
    userStorageIsLoading
  } = useAuth()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded || userStorageIsLoading){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.primary}/>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
    </ThemeProvider>
  )
}