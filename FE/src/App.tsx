import { GlobalStyles } from "./styles/GlobalStyles.ts";
import { Header } from "./components/Header/Header.tsx";
import Orders from "./components/Orders/Orders.tsx";

export function App() {
    return (
      <>
        <GlobalStyles />
        <Header />
        <Orders />
      </>
    )
}
