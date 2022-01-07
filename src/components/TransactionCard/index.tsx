import React from "react";

import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from "./styles";

import {categories} from '../../utils/categorias'


export interface TransactionCardProps {
        type: 'positive' | 'negative';
        name: string;
        amount: string;
        date: string;
        category: string; 
    }


interface Data {
    data: TransactionCardProps
}

export const TransactionCard = (
    {
        data
    }: Data) => {

        const category = categories.filter(item => {
            return item.key === data.category
        })[0]

    return (
        <Container>
            <Title>
                {data.name}
            </Title>
            <Amount type={data.type}>
                {
                    data.type === "negative" ? `-${data.amount}` : data.amount
                }
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}
