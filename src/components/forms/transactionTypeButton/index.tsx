import React from "react"
import { TouchableOpacityProps } from "react-native";

import { Container, Title, Icon } from "./styles"



interface Props extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down',
    isActive: boolean
}

export const TransactionTypeButton = ({
    title,
    type,
    isActive,
    ...rest
}: Props) => {

    const icons = {
        up: 'arrow-up-circle',
        down: 'arrow-down-circle'
    }

    return (
        <Container type={type} isActive={isActive} {...rest} >
            <Icon  type={type} name={icons[type]} />
            <Title>
                {title}
            </Title>
        </Container>
    )
}