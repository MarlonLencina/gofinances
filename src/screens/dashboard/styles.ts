import {
    getBottomSpace,
    getStatusBarHeight
} from 'react-native-iphone-x-helper'

import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import {
    RFPercentage, RFValue
} from 'react-native-responsive-fontsize'

import {Feather} from '@expo/vector-icons'

import { DataListProps } from './index';
import { FlatList } from 'react-native';

export const Container = styled.View`
    flex: 1;
 `

export const Header = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.primary};
    height: ${RFPercentage(42)}px;
`

export const UserWrapper = styled.View`
width: 100%;
padding: 0 24px;
margin-top: ${getStatusBarHeight() + RFValue(28)}px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const UserInfo = styled.View`
flex-direction: row;
align-items: center;
`

export const Avatar = styled.Image`
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;
border-radius: 10px;
`

export const User = styled.View`
margin-left: 17px;`

export const UserGreeting = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-size: ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.regular};
`

export const UserName = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.bold};
font-size: ${RFValue(18)}px;
`

export const Icon = styled(Feather)`

color: ${({theme}) => theme.colors.secundary};
font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 24}
})`
width: 100%;
position: absolute;
margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled(FlatList).attrs({
    showsVerticalScrollIndicator:  false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})`
flex: 1;
margin-top: ${RFPercentage(12)}px;
padding: 0 24px;
` as React.ComponentType as new <DataListProps>() => FlatList<DataListProps>

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.regular};
`

