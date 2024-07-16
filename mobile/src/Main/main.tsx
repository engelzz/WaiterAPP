import { ActivityIndicator } from 'react-native';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

import { useEffect, useState } from 'react';
import { Button } from '../components/Button/button';
import { Cart } from '../components/Cart/cart';
import { Categories } from '../components/Categories/categories';
import { Header } from '../components/Header/header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu/menu';
import { TableModal } from '../components/TableModal/tableModal';
import { Text } from '../components/Text';
import { CartItem } from '../types/CartItems';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { api } from '../utils/api';

export function Main() {
  const [isTabelModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/products"),
    ]).then(([ categoriesResponse, productsReponse ]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsReponse.data);
        setIsLoading(false);
    })
  }, [])

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
    ? '/products'
    : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table : string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        })
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
    <Container>
      <Header
      selectedTable={selectedTable}
      onCancelOrder={handleResetOrder}
      />

      {isLoading && (
        <CenteredContainer>
          <ActivityIndicator size='large' color="#D73035"/>
        </CenteredContainer>
      )}

      {!isLoading && (
        <>
          <CategoriesContainer>
            <Categories
            categories={categories}
            onSelectCategory={handleSelectCategory}
            />
          </CategoriesContainer>

          {isLoadingProducts ? (
             <CenteredContainer>
              <Empty />

              <Text color="#666" style={{ marginTop: 24}}>Nenhum produto foi encontrado!</Text>
            </CenteredContainer>
          ): (
            <>
             {products.length > 0 ? (
              <MenuContainer>
                <Menu
                onAddToCart={handleAddToCart}
                products={products}
                />
              </MenuContainer>
              ) : (
                <CenteredContainer>
                  <Empty />

                  <Text color="#666" style={{ marginTop: 24}}>Nenhum produto foi encontrado!</Text>
                </CenteredContainer>
              )}
            </>
          )}
        </>
      )}
    </Container>

    <Footer>
      <FooterContainer>
        {!selectedTable && (
          <Button
          onPress={() => setIsTableModalVisible(true)}
          disabled={isLoading}
          >
          Novo Pedido
        </Button>
        )}

        {selectedTable && (
          <Cart
          cartItems={cartItems}
          onAdd={handleAddToCart}
          onDecrement={handleDecrementCartItem}
          onConfirmOrder={handleResetOrder}
          selectedTable={selectedTable}
          />
        )}
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
