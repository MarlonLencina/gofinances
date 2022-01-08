import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { Container, Title, ImageContainer } from "./styles";

interface SignSocialButtonProps extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>
}

export const SignSocialButton = ({
    title,
    svg: Svg,
    ...rest
}: SignSocialButtonProps) => {

    return (
        <Container {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Title>{title}</Title>
        </Container>
    )
}