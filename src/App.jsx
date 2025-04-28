import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header/>
      <Cart />
      <Meals />

    </CartContextProvider>
  );
}

export default App;
