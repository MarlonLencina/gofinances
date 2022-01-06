import React from "react";
import { Text, TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
    title: string
}

export const Button = ({ title, ...rest }: ButtonProps) => {

    return (
        <Container
        activeOpacity={0.8}
        {...rest}
        >
              <Title>
                  {
                      title
                  }
              </Title>
        </Container>
    )
}