import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'up' | 'down'
}

interface ButtonProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ButtonProps>`

flex-direction: row;
align-items: center;
justify-content: center;
border: 1.5px solid ${({theme}) => theme.colors.text};
border-radius: 5px;
padding: 16px;
width: 48%;

    ${({isActive, type}) => isActive === true && type === 'down' ? css`

    background-color: ${({theme}) => theme.colors.attetion_light};
    border: none;

    ` : css`` }

    ${({isActive, type}) => isActive === true && type === 'up' ? css`

    background-color: ${({theme}) => theme.colors.success_light};
    border: none;

    ` : css`` }

`

export const Icon = styled(Feather)<IconProps>`

font-size: ${RFValue(24)}px;
margin-right: 12px;

color: ${({type}) => type === 'up' ? ({theme}) => theme.colors.success : ({theme}) => theme.colors.attetion };

`

export const Title = styled.Text`

font-size: ${RFValue(14)}px;
font-family: ${({theme}) => theme.fonts.regular};


`
