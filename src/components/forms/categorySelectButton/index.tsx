import React from "react";
import { TouchableOpacityProps } from "react-native";
import { 
         Container,
         Icon,
         Category
} from "./styles";

interface Props extends TouchableOpacityProps {
    title: string;
}

export const CategorySelectButton = ({
    title,
    onPress
}: Props) => {


    return (
        <Container onPress={onPress}>

            <Category>{title}</Category>
            <Icon name='chevron-down' />

        </Container>
    )
}