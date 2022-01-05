import styled, { css } from "styled-components/native";
import {
    Feather
} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
    type: 'up' | 'down' | 'total'
}

const transactionsType = {
    up: '#12a454',
    down: '#e83f5b',
    total: '#5636d3'
}

export const Container = styled.View<Props>`
background-color: ${({theme}) => theme.colors.shape};
width: ${RFValue(300)}px;
border-radius: 5px;
padding: 18px 23px;
padding-bottom: ${RFValue(42)}px;
margin-right: 16px


${props => props.type === 'total' && css`
background-color: ${({theme}) => theme.colors.secundary};
`}

`

export const Header = styled.View`
flex-direction: row;
justify-content: space-between;`

export const Title = styled.Text<Props>`
font-size: ${RFValue(14)}px;
font-family: ${({theme}) => theme.fonts.regular};
color: ${({theme}) => theme.colors.text_dark};

${props => props.type === 'total' && css`
color: ${({theme}) => theme.colors.shape};
`}
`

export const Icon = styled(Feather)<Props>`
 font-size: ${RFValue(40)}px;

 ${props => props.type === 'up' && css`
 color: ${({theme}) => theme.colors.success}
 `}
 ${props => props.type === 'down' && css`
 color: ${({theme}) => theme.colors.attetion}
 `}
 ${props => props.type === 'total' && css`
 color: ${({theme}) => theme.colors.shape}
 `}
`

export const Footer = styled.View``

export const Amount = styled.Text<Props>`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(32)}px;
color: ${({theme}) => theme.colors.text_dark};
margin-top: 38px;

${props => props.type === 'total' && css`
color: ${({theme}) => theme.colors.shape};
`}
`

export const LastTransaction = styled.Text<Props>`
font-size: ${RFValue(12)}px;
font-family: ${({theme}) => theme.fonts.regular};
color: ${({theme}) => theme.colors.text};

${props => props.type === 'total' && css`
color: ${({theme}) => theme.colors.shape};
`}

`


