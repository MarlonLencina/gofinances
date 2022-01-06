import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`

background-color: ${({theme}) => theme.colors.secundary};

align-items: center;
justify-content: center;

padding: 18px;
border-radius: 5px;

`


export const Title = styled.Text`

font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.shape};

`