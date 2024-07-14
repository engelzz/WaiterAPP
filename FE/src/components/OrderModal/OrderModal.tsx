import { Actions, ModalBody, OrderDetails, Overlay } from "./styles.ts";

import { useEffect } from "react";
import closeIcon from "../../styles/assets/images/close-icon.svg";
import { Order } from "../../types/Order.ts";
import { FormatCurrency } from "../../utils/FormatCurrency.ts";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus
}: OrderModalProps) {

  useEffect(() => {
   function handleKeyDown(event : KeyboardEvent) {
     if (event.key === 'Escape') {
       onClose();
     }
   }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose])

  if (!visible || !order) {
    return null
  }

  const total = order.products.reduce((total, { quantity, product }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="close"/>
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>

          <div>
            <span>
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Items</strong>

          <div className="order-items">

            {order.products.map(({_id, quantity, product}) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt="Imagem do produto"
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>

                  <span>{FormatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span> Total </span>

            <strong>{FormatCurrency(total)}</strong>
          </div>

        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
              <button type="button" className="primary" disabled={isLoading} onClick={onChangeOrderStatus}>
                <span>
                  {order.status === 'WAITING' && '👨‍🍳'}
                  {order.status === 'IN_PRODUCTION' && '✅'}
                </span>
                <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
                </strong>
              </button>
          )}


          <button type="button" className="secondary" onClick={onCancelOrder} disabled={isLoading}>
           Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}
