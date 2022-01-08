import React from "react";
import { Container, Header, TitleWrapper, SignInTitle, Title, Footer, FooterWrapper } from "./styles";

import Apple from '../../assets/apple.svg'
import Google from '../../assets/google.svg'
import Logo from '../../assets/logo.svg'

import { RFValue } from "react-native-responsive-fontsize";
import { SignSocialButton } from "../../components/signInSocialButton";

import { useAuth } from "../../hooks/authContext";
import { Alert } from "react-native";

export const SignIn = () => {

    const {
        signWithGoogle
    } = useAuth()

    const handleSignWithGoogle = async () => {

        try {
            
            await signWithGoogle()

        } catch (error) {
            console.log(error)
            Alert.alert('Occorreu um erro na atenticação.')
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
                <FooterWrapper>
                    <SignSocialButton title="entrar com Google" onPress={handleSignWithGoogle} svg={Google}/>
                    <SignSocialButton title="entrar com Apple" svg={Apple}/>
                </FooterWrapper>
            </Footer>
        </Container>
    )
}