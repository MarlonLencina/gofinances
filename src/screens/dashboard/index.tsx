import React from "react";
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
    } from "./styles";

import { HighlightCard } from "../../components/HighlightCard";

export const Dashboard = () => {
  

    return (
        <Container>
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
                    <Icon name='power'/>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada 12 de fevereiro"/>
                <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída 15 de fevereiro"/>
                <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransaction="01 a 16 de fevereiro"/>
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
            </Transactions>
        </Container>
    )
}