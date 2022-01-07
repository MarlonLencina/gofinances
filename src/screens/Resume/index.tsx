import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/historyCard";

import { Container, Content, Header, SectionTitle, ChartContainer } from "./styles";

import { useTheme } from "styled-components";

import AsyncStorage from '@react-native-async-storage/async-storage'

import {categories} from '../../utils/categorias'
import { ScrollView } from "react-native-gesture-handler";

import {
    VictoryPie
} from 'victory-native'
import { Category } from "../categorySelect/styles";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    date: string;
    category: string; 
}

interface categoryData {
    name: string,
    category: string,
    total: number,
    totalFormatted: string,
    color: string,
    percent: number,
    percentFormatted: string
}

export const Resume = () => {

    const theme = useTheme()

    const dataKey = '@gofinances:transactions'
    const [totalByCategories, setTotalByCategories] = useState<categoryData[]>([])

    const loadData = async () => {

        const response = await AsyncStorage.getItem(dataKey);
        const dataFormatted = response ? JSON.parse(response) : []

        const expansives: TransactionProps[] = dataFormatted.filter((transaction: TransactionProps) => {
            return transaction.type === 'negative'
        })

        const expensiveTotal = expansives.reduce((acc: number, cvalue: TransactionProps) => {
            return acc += Number(cvalue.amount)
        }, 0)

        const totalByCategory: categoryData[] = []

        categories.forEach((category) => {
            let categorySum = 0;

            expansives.forEach((expansive: TransactionProps) => {

                if(expansive.category === category.key){
                    categorySum += +expansive.amount
                }

            });

            if(categorySum > 0){

                const percent = categorySum / expensiveTotal * 100
                const percentFormatted = `${percent.toFixed()}%`
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                totalByCategory.push({
                    name: category.name,
                    category: category.name,
                    total: categorySum,
                    totalFormatted,
                    color: category.color,
                    percentFormatted,
                    percent
                })
    
            }

        })

    
        console.log(totalByCategory)
        setTotalByCategories(totalByCategory)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Container>
                <Header>
                    <SectionTitle>Resumo por categoria</SectionTitle>
                </Header>

                <Content>

                <ChartContainer>
                    <VictoryPie
                    data={totalByCategories}
                    colorScale={totalByCategories.map(category => category.color)}
                    style={{
                        labels: {
                            fontSize: RFValue(16),
                            fontWeight: 'bold',
                            fill: theme.colors.shape,
                            fontFamily: theme.fonts.regular
                        }
                    }}
                    labelRadius={50}
                    x='name'
                    y='total'
                    />
                </ChartContainer>
                {
                    totalByCategories.map(categories => {
                        return (
                            <HistoryCard key={categories.category} color={categories.color} title={categories.name} amount={categories.totalFormatted}/>
                        )
                    })
                }
                </Content>

        </Container>
    )
}