import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
flex: 1;
background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
width: 100%;
background-color: ${({theme}) => theme.colors.primary};
height: ${RFValue(113)}px;
align-items: center;
justify-content: flex-end;
padding-bottom: 19px;
`

export const SectionTitle = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(18)}px;
`

export const Form = styled.View`

justify-content: space-between;
flex: 1;
width: 100%;
padding: 24px;


`


export const Fields = styled.View`



`

export const TransactionsWrapper = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 8px;
margin-bottom: 16px;
`