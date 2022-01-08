import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/historyCard";

import {
    addMonths,
    subMonths,
    format
} from 'date-fns'

import { ActivityIndicator } from "react-native";

import { Container, Content, Header, SectionTitle, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadContainer  } from "./styles";

import AsyncStorage from '@react-native-async-storage/async-storage'

import {categories} from '../../utils/categorias'
import { ScrollView } from "react-native-gesture-handler";

import { useTheme } from "styled-components";

import {
    VictoryPie
} from 'victory-native'
import { Category } from "../categorySelect/styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import {
    ptBR
} from 'date-fns/locale'

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

    const [isLoading, setIsLoading] = useState(true)

    const [selecteDate, setSelectedDate] = useState(new Date())

    const handleChangeDate = (action: 'next' | 'prev') => {

        if(action === 'next'){
            const newDate = addMonths(selecteDate, 1)
            setSelectedDate(newDate)
        } else {
            const newDate = subMonths(selecteDate, 1)
            setSelectedDate(newDate)
        }
    }

    const theme = useTheme()

    const dataKey = '@gofinances:transactions'
    const [totalByCategories, setTotalByCategories] = useState<categoryData[]>([])

    const loadData = async () => {

        setIsLoading(true)

        const response = await AsyncStorage.getItem(dataKey);
        const dataFormatted = response ? JSON.parse(response) : []

        const expansives: TransactionProps[] = dataFormatted.filter((transaction: TransactionProps) => {
            return transaction.type === 'negative'
            && new Date(transaction.date).getMonth() === selecteDate.getMonth()
            && new Date(transaction.date).getUTCFullYear() === selecteDate.getUTCFullYear()
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


        setIsLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [selecteDate])

    return (
        <Container>
                            <Header>
                    <SectionTitle>Resumo por categoria</SectionTitle>
                </Header>

            {

                isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} size={'large'}/></LoadContainer> :
                <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    {
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight()
                    }
                }
                >

                    <MonthSelect>
                            <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                                <MonthSelectIcon name='chevron-left'/>
                            </MonthSelectButton>
                            <Month>{format(selecteDate, 'MMMM, yyyy', {
                                locale: ptBR
                            })}</Month>
                            <MonthSelectButton onPress={() => handleChangeDate('next')} >
                                <MonthSelectIcon name='chevron-right'/>
                            </MonthSelectButton>
                    </MonthSelect>

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
            }
        </Container>
    )
}