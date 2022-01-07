import React from "react";
import { Text, TouchableOpacityProps } from "react-native";
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export const Button = ({ title, ...rest }: ButtonProps) => {

    return (
        <Container
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