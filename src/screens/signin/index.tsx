import React, { useState } from "react";
import {ActivityIndicator, Platform} from "react-native"
import { Container, Header, TitleWrapper, SignInTitle, Title, Footer, FooterWrapper } from "./styles";

import Apple from '../../assets/apple.svg'
import Google from '../../assets/google.svg'
import Logo from '../../assets/logo.svg'

import { RFValue } from "react-native-responsive-fontsize";
import { SignSocialButton } from "../../components/signInSocialButton";

import { useAuth } from "../../hooks/authContext";
import { Alert } from "react-native";

import {useTheme} from "styled-components"

export const SignIn = () => {

    const theme = useTheme()

    const [isLoading, setIsLoading] = useState(false)

    const {
        signWithGoogle,
        signWithApple
    } = useAuth()

    const handleSignWithGoogle = async () => {

        try {
            setIsLoading(true)
            return await signWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Occorreu um erro na atenticação.')
            setIsLoading(false)
        }
    }

    const handleSignWithApple = async () => {

        try {
            setIsLoading(true)
            return await signWithApple()
        } catch (error) {
            console.log(error)
            Alert.alert('Occorreu um erro na atenticação.')
            setIsLoading(false)

        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Logo
                    width={RFValue(120)}
                    height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {`\n`}
                        finanças de forma {`\n`}
                        muito simples {`\n`}
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
            
            {

            isLoading ? <ActivityIndicator color={theme.colors.shape} size='large' style={{marginTop: 18}} ></ActivityIndicator> :         
            <FooterWrapper>
                
                <SignSocialButton title="entrar com Google" onPress={handleSignWithGoogle} svg={Google}/>
                
                
                {
                    Platform.OS === 'ios' && <SignSocialButton title="entrar com Apple" onPress={handleSignWithApple} svg={Apple}/>
                }

                
            </FooterWrapper>

        }

            </Footer>
        </Container>
    )
}