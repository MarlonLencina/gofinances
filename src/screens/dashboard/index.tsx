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
     ,LogoutButton,
     LoadContainer
    } from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useAuth } from "../../hooks/authContext";

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

        const transactions = collection.filter((transaction: DataListProps) => transaction.type === type)
        .map((transaction: DataListProps) => {
            return new Date(transaction.date).getTime()
        })

        if(!transactions[0]){
            return 'Ainda não existem transaçoes.'
        }

        const transaction = Math.max(...transactions)

        const typeTransaction = type === "positive" ? "entrada" : "saída"
        // const lastTransactionFormatted = Intl.DateTimeFormat('pt-BR', {
        //     day: '2-digit',
        //     month: "2-digit",
        // }).format(new Date(lastTransaction))

        return `última ${typeTransaction} ${new Date(transaction).getDate()} de ${new Date(transaction).toLocaleDateString("pt-BR", {month: "long"})}`
}

export const Dashboard = () => {

    const {
        user,
        signOut
    } = useAuth()



    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(true)

    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<IHighlighData>({} as IHighlighData)
    const dataKey = `@gofinances:transactions_user:${user.id}`



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
        const lastTransactionExpansives = getLastTransactionInDate(transactions, 'negative')

        // const lastTransactionExpansive
        // lastTransactionExpansive = transactions.lenght > 0 ?
        // `Última saída ${getLastTransactionInDate(transactions, 'negative')}`
        // : 'Ainda não existem transações.'


        // const totalInterval
        const totalInterval = transactions.length > 0 ? `Ultima movimentação: ${getLastTransactionInDate(transactions, 'negative')}` : 'Ainda não existem transações durante o periodo.'


         setTransactions(transactionsFormatted)
         setHighlightData({
             expensives: {
                lastTransaction: lastTransactionExpansives,
                 amount: expansive.toLocaleString('pt-BR', {
                     style: 'currency',
                     currency: 'BRL'
                 })
             },
             entries: {
                lastTransaction: lastTransactionEntries,
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
                        <Avatar source={{uri: user.photo}}>
                        </Avatar>
                        <User>
                            <UserGreeting>Óla,</UserGreeting>
                            <UserName>{user.name}</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={signOut}>
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

