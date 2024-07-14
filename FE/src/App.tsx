import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

import { Header } from "./components/Header/Header.tsx";
import Orders from "./components/Orders/Orders.tsx";
import { GlobalStyles } from "./styles/GlobalStyles.ts";

export function App() {
    return (
      <>
        <GlobalStyles />
        <Header />
        <Orders />
        <ToastContainer position="bottom-center"/>
      </>
    )
}
