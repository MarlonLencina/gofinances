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

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 24,
        flex: 1
    }    
})``

export const ChartContainer = styled.View`

width: 100%;
align-items: center;

`