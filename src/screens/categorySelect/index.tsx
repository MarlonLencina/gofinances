import React from "react";
import { FlatList } from "react-native";

import { Container, Header, Title, Category, Icon, Name, Separator, Footer, } from "./styles";
import { Button } from "../../components/forms/button";

import {categories} from '../../utils/categorias'
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface CategoryProps {
    key: string;
    name: string;
}

interface Props {
    category: CategoryProps;
    setCategory: (category: CategoryProps) => void;
    closeSelectCategory: () => void;
}

export const CategorySelect = ({
    category,
    closeSelectCategory,
    setCategory
}: Props) => {

    const handleCategorySelect = (categoryProp: CategoryProps) => {
        setCategory(categoryProp)
    }

    return (
        <Container>

            <Header>
                <Title>
                    Categoria
                </Title>
            </Header>

            <FlatList
              data={categories}
              style={{flex: 1, width: '100%'}}
              keyExtractor={(item) => item.key}
              renderItem={({item}) =>
              <>
                <Category
                onPress={() => handleCategorySelect(item)}
                isActive={category.key === item.key}
                >
                    <Icon name={item.icon} />
                    <Name>{item.name}</Name>
                </Category>
                                <Separator/>
              </>

              }
            >
            </FlatList>
                         
            <Footer>
                    <Button onPress={closeSelectCategory} title='Selecionar'/>
            </Footer>

        </Container>
    )

}