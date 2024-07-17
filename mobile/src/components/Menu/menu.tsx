import { FlatList } from "react-native";
import { Text } from "../Text";

import { useState } from "react";
import { Product } from "../../types/Product";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal/productModal";
import { AddToCartButton, ProductContainer, ProductDetails, ProductImage, Separator } from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      product={selectedProduct}
      onAddToCart={onAddToCart}
      />

      <FlatList
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      data={products}
      ItemSeparatorComponent={Separator}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => (
        <ProductContainer onPress={() => handleOpenModal(product)}>
          <ProductImage
            source={{
              uri: `http://localhost:3001/uploads/${product.imagePath}`
            }}
          />

          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {product.description}
              </Text>
            <Text sixe={14} weight="600">{FormatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCartButton onPress={() => onAddToCart(product)}>
            <PlusCircle />
          </AddToCartButton>
        </ProductContainer>
    )}
    />
    </>
  );
}
