import styled from "styled-components/native";

import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

interface TransactionProps {
    type: 'positive' | 'negative'
}

export const Container = styled.View`
background-color: ${({theme}) => theme.colors.shape};
border-radius: 5px;
padding: 17px 24px;
`

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`

export const Amount = styled.Text<TransactionProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(20)}px;
margin-top: 2px;


color: ${({theme, type}) => type === 'positive' ? theme.colors.success : theme.colors.attetion };

`

export const Footer = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 19px;
align-items: center;`

export const Category = styled.View`
flex-direction: row;
align-items: center;
font-size: ${RFValue(20)}px;`

export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px;
color: ${({theme}) => theme.colors.text};
margin-right: 17px;
`

export const CategoryName = styled.Text`
color: ${({theme}) => theme.colors.text_dark};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.text};
`

export const Date = styled.Text`
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.text};
font-family: ${({theme}) => theme.fonts.regular};
`
