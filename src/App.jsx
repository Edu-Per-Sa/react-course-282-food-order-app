import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";

import CartContextProvider from "./store/cart-context.jsx";
import ModalContextProvider from "./store/modal-context.jsx";

function App() {

  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout/>
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
