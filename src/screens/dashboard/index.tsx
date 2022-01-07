import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container
     ,Header
     ,UserInfo
     ,Avatar
     ,User
     ,UserGreeting
     ,UserName
     ,UserWrapper
     ,Icon
     ,HighlightCards
     ,Transactions
     ,Title
     ,LogoutButton,
     LoadContainer
    } from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface IhighlightProps {
    amount: string;
    lastTransaction: string;
}

interface IHighlighData {
    entries: IhighlightProps,
    expensives: IhighlightProps,
    total: IhighlightProps
}

const getLastTransactionInDate = (collection: DataListProps[], type: 'positive' | 'negative') => {

    const lastTransaction = Math.max.apply(Math, collection.filter((transaction: DataListProps) => transaction.type === type)
        .map((transaction: DataListProps) => {
            return new Date(transaction.date).getTime()
        }))

        const lastTransactionFormatted = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: "2-digit",
        }).format(new Date(lastTransaction))

        return `${new Date(lastTransaction).getDate()} de ${new Date(lastTransaction).toLocaleDateString("pt-BR", {month: "long"})}`
}

export const Dashboard = () => {

    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(true)

    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<IHighlighData>({} as IHighlighData)
    const dataKey = '@gofinances:transactions'



    const loadTransactions = async () => {

        let entriesTotal = 0
        let expansive = 0

        const response = await AsyncStorage.getItem(dataKey)

        const transactions = response ? JSON.parse(response) : []

        const transactionsFormatted: DataListProps[] = transactions.map((transaction: DataListProps) => {

            if(transaction.type === 'positive'){
                entriesTotal += Number(transaction.amount)
            } else {
                expansive += Number(transaction.amount)
            }

            const amount = Number(transaction.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: "2-digit",
                year: '2-digit'
            }).format(new Date(transaction.date))


            return {
                id: transaction.id,
                amount,
                date,
                name: transaction.name,
                type: transaction.type,
                category: transaction.category
            }

        })

        const lastTransactionEntries = getLastTransactionInDate(transactions, 'positive')
        const lastTransactionExpansive = getLastTransactionInDate(transactions, 'negative')
        const totalInterval = `01 de ${lastTransactionExpansive}`

        console.log(lastTransactionEntries, lastTransactionExpansive)

         setTransactions(transactionsFormatted)
         setHighlightData({
             expensives: {
                lastTransaction: `Última entrada ${lastTransactionExpansive}`,
                 amount: expansive.toLocaleString('pt-BR', {
                     style: 'currency',
                     currency: 'BRL'
                 })
             },
             entries: {
                lastTransaction: `Última saída ${lastTransactionEntries}`,
                 amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
             },
             total: {
                lastTransaction: totalInterval,
                amount: (entriesTotal - expansive).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
             }
         })

         setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        
        loadTransactions()

    },  []))

    return (
        <Container>
            {
                isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} size={'large'}/></LoadContainer>: 
        <>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Avatar source={{uri: 'https://avatars.githubusercontent.com/u/92546209?v=4'}}>
                        </Avatar>
                        <User>
                            <UserGreeting>Óla,</UserGreeting>
                            <UserName>Marlon</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name='power'/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction}/>
                <HighlightCard type="down" title="Saídas" amount={highlightData.expensives.amount} lastTransaction={highlightData.expensives.lastTransaction}/>
                <HighlightCard type="total" title="Total" amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction}/>
            </HighlightCards>
            <Transactions
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <TransactionCard data={item} />}
            />
                </>
            }
        </Container>
    )
}

