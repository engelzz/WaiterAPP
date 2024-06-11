import { Container } from "./styles.ts";
import {OrderBoard} from "../OrderBoard/OrderBoard.tsx";

export default function Orders() {
  return (
    <Container>
     <OrderBoard
       icon="🕒"
       title="Fila de espera"
       orders={[]}
     />
     <OrderBoard
       icon="👨‍🍳"
       title="Em preparação"
       orders={[]}
     />
     <OrderBoard
       icon="✅"
       title="Pronto"
       orders={[]}
     />
    </Container>
  )
}
