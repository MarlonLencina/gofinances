import React from "react";
import {} from "react-native"

import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from "./styles";

interface CategoryProps {
    name: string;
    icon: string;
}

export interface TransactionCardProps {
        type: 'positive' | 'negative';
        title: string;
        amount: string;
        date: string;
        category: CategoryProps; 
    }


interface Data {
    data: TransactionCardProps
}

export const TransactionCard = (
    {
        data
    }: Data) => {

    return (
        <Container>
            <Title>
                {data.title}
            </Title>
            <Amount type={data.type}>
                {
                    data.type === "negative" ? `-${data.amount}` : data.amount
                }
            </Amount>
            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}
