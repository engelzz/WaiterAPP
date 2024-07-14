import socketIo from 'socket.io-client';

import { useEffect, useState } from "react";
import { Order } from "../../types/Order.ts";
import { api } from "../../utils/api.ts";
import { OrderBoard } from "../OrderBoard/OrderBoard.tsx";
import { Container } from "./styles.ts";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect (() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order))
    })
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data)
      })
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const done = orders.filter((order) => order.status === 'DONE');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId))
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
      ? { ...order, status }
      : order
    )))
  }

  return (
    <Container>
     <OrderBoard
       icon="🕒"
       title="Fila de espera"
       orders={waiting}
       onCancelOrder={handleCancelOrder}
       onChangeOrderStatus={handleOrderStatusChange}
     />
     <OrderBoard
       icon="👨‍🍳"
       title="Em preparação"
       orders={inProduction}
       onCancelOrder={handleCancelOrder}
       onChangeOrderStatus={handleOrderStatusChange}
     />
     <OrderBoard
       icon="✅"
       title="Pronto"
       orders={done}
       onCancelOrder={handleCancelOrder}
       onChangeOrderStatus={handleOrderStatusChange}
     />
    </Container>
  )
}
