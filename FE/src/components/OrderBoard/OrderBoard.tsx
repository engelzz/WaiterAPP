import { useState } from "react";
import { toast } from "react-toastify";
import { Order } from "../../types/Order.ts";
import { api } from "../../utils/api.ts";
import { OrderModal } from "../OrderModal/OrderModal.tsx";
import { Board, OrdersContainer } from "./styles.ts";

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrderBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrderBoardProps) {
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order : Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCLoseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING'
    ? 'IN_PRODUCTION'
    : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado`);

    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);

    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        order={selectedOrder}
        visible={isModalVisible}
        onClose={handleCLoseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{orders.length}</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong> Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  )
}
