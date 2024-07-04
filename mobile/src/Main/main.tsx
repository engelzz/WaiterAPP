import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

import { useState } from 'react';
import { Button } from '../components/Button/button';
import { Categories } from '../components/Categories/categories';
import { Header } from '../components/Header/header';
import { Menu } from '../components/Menu/menu';
import { TableModal } from '../components/TableModal/tableModal';

export function Main() {
  const [isTabelModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  function handleSaveTable(table : string) {
    setSelectedTable(table);
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  return (
    <>
    <Container>
      <Header
      selectedTable={selectedTable}
      onCancelOrder={handleCancelOrder}
      />

      <CategoriesContainer>
        <Categories />
      </CategoriesContainer>

      <MenuContainer>
        <Menu />
      </MenuContainer>
    </Container>

    <Footer>
      <FooterContainer>
        <Button onPress={() => setIsTableModalVisible(true)}>
          Novo Pedido
        </Button>
      </FooterContainer>
    </Footer>

    <TableModal
    visible={isTabelModalVisible}
    onClose={() => setIsTableModalVisible(false)}
    onSave={handleSaveTable}
    />
    </>
  );
}
