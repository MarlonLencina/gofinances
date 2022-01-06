
import React, {
    useState
} from "react";
import {
    Modal
} from "react-native"

import { Input } from "../../components/forms/input";

import { Container, Header, SectionTitle, Form, Fields, TransactionsWrapper } from "./styles";

import { Button } from "../../components/forms/button";
import { TransactionTypeButton } from "../../components/forms/transactionTypeButton";
import { CategorySelectButton } from "../../components/forms/categorySelectButton";

import { CategorySelect } from "../categorySelect";


export const Register = () => {

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

    return (
        <Container>
            <Header>
                <SectionTitle>Cadastro</SectionTitle>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"/>
                <Input 
                        placeholder="Preço"/>

                <TransactionsWrapper>
                        <TransactionTypeButton isActive={transactionType === 'up'} onPress={() => handleTransactionTypeSelect('up')} title="Income" type="up"/>
                        <TransactionTypeButton isActive={transactionType === 'down'} onPress={() => handleTransactionTypeSelect('down')} title="Outcome" type="down"/>
                </TransactionsWrapper>

                <CategorySelectButton 
                onPress={HandleOpenSelectCategory}
                title={category.name} />

                </Fields>

                <Button
                title="Enviar"/>

            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory={HandleCloseSelectCategory}
                />
            </Modal>

        </Container>
    )
}