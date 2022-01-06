
import React, {
    useState
} from "react";
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native"

import * as Yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../components/forms/input";

import { Container, Header, SectionTitle, Form, Fields, TransactionsWrapper } from "./styles";

import { Button } from "../../components/forms/button";
import { TransactionTypeButton } from "../../components/forms/transactionTypeButton";
import { CategorySelectButton } from "../../components/forms/categorySelectButton";

import { CategorySelect } from "../categorySelect";

import { InputForm } from "../../components/forms/inputForm";

import {
    useForm
} from 'react-hook-form'

interface formData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatorio'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('o valor näo pode ser negativo').required('valor é obrigatorio'),
})

export const Register = () => {

    const {
        control,
        handleSubmit,
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

    const handleTransactionTypeSelect = (type: 'up' | 'down') => {
        setTransactionType(type)
    }


    const handleRegister = (form: formData) => {

        if(!transactionType)
            return Alert.alert('selecione o tipo da transação.')
        

        if(category.key === 'category')
            return Alert.alert('selecione a categoria da transação.')
        

        const data = {
            name: form.name,
            amount: form.amount,
            category: category.key,
            type: transactionType
        }
        console.log(data)
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <SectionTitle>Cadastro</SectionTitle>
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
                            <TransactionTypeButton isActive={transactionType === 'up'} onPress={() => handleTransactionTypeSelect('up')} title="Income" type="up"/>
                            <TransactionTypeButton isActive={transactionType === 'down'} onPress={() => handleTransactionTypeSelect('down')} title="Outcome" type="down"/>
                    </TransactionsWrapper>

                <CategorySelectButton 
                onPress={HandleOpenSelectCategory}
                title={category.name} />

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