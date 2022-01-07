
import React, {
    useCallback,
    useEffect,
    useState
} from "react";
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native"

import * as Yup from "yup"


import uuid from 'react-native-uuid'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../components/forms/input";

import { Container, Header, SectionTitle, Form, Fields, TransactionsWrapper } from "./styles";

import {useNavigation} from '@react-navigation/native'

import { Button } from "../../components/forms/button";
import { TransactionTypeButton } from "../../components/forms/transactionTypeButton";
import { CategorySelectButton } from "../../components/forms/categorySelectButton";

import { CategorySelect } from "../categorySelect";

import { InputForm } from "../../components/forms/inputForm";

import {
    useForm
} from 'react-hook-form'
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface formData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatorio'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('o valor näo pode ser negativo').required('valor é obrigatorio'),
})

export const Register = () => {

    const navigation = useNavigation()

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const HandleCloseSelectCategory = () => {
        setCategoryModalOpen(false)
    }

    const HandleOpenSelectCategory = () => {
        setCategoryModalOpen(true)
    }
    
    const [
        transactionType,
        setTransactionType
    ] = useState('')

    const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
        setTransactionType(type)
    }

    const dataKey = '@gofinances:transactions'

    const handleRegister = async (form: formData) => {

        if(!transactionType)
            return Alert.alert('selecione o tipo da transação.')
        

        if(category.key === 'category')
            return Alert.alert('selecione a categoria da transação.')
        

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            category: category.key,
            type: transactionType,
            date: new Date()
        }

        try {

             const oldData = await AsyncStorage.getItem(dataKey)
             const currentData = oldData ? JSON.parse(oldData) : []

             const dataFormated = [...currentData, newTransaction] 

             await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))

             reset()
             setTransactionType('')
             setCategory({
                key: 'category',
                name: 'Categoria',
            })

            navigation.navigate('Listagem')

        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel salvar')
        }

    }


    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <SectionTitle>Cadastrar</SectionTitle>
            </Header>

            <Form>
                <Fields>
                    <InputForm
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        name="name"
                        control={control}
                        placeholder="Nome"
                        error={errors.name && errors.name.message}
                        />
                    <InputForm
                        keyboardType="numeric"
                        name="amount"
                        control={control}
                        placeholder="Preço"
                        error={errors.amount && errors.amount.message}
                        />

                    <TransactionsWrapper>
                            <TransactionTypeButton isActive={transactionType === 'positive'} onPress={() => handleTransactionTypeSelect('positive')} title="Income" type="up"/>
                            <TransactionTypeButton isActive={transactionType === 'negative'} onPress={() => handleTransactionTypeSelect('negative')} title="Outcome" type="down"/>
                    </TransactionsWrapper>

                <GestureHandlerRootView>
                    <CategorySelectButton 
                    onPress={HandleOpenSelectCategory}
                    title={category.name} />
                </GestureHandlerRootView>


                </Fields>

                <Button
                title="Enviar"
                onPress={handleSubmit(handleRegister)}
                />

            </Form>


            <Modal visible={categoryModalOpen}>
                <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory={HandleCloseSelectCategory}
                />
            </Modal>


        </Container>
    </TouchableWithoutFeedback>

    )
}