import React from "react"
import { Text } from "react-native"

import { Container, Header, Title, Icon, Footer, Amount, LastTransaction } from "./styles"

interface HighlightCardProps {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'up' | 'down' | 'total'
}

export const HighlightCard = ({
    title,
    amount,
    lastTransaction,
    type
}: HighlightCardProps) => {

    const transactionsType = {
        up: 'arrow-up-circle',
        down: 'arrow-down-circle',
        total: 'dollar-sign'
    }

    return (

        <Container type={type}>
            <Header>
                <Title type={type} >{title}</Title>
                <Icon type={type} name={transactionsType[type]}></Icon>
            </Header>
            <Footer>
                <Amount type={type}>
                {amount}
                </Amount>
                <LastTransaction type={type}>
                {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>

    )
}
