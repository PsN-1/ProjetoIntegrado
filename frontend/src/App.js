import "./App.css";
import Routes from "./Util/Routes";
import { AuthContext, UserCartContext, useAuth, useCart } from "LojaUniversal";

export default function App() {
  const { token, login, logout, storeName } = useAuth();
  const {
    products,
    total,
    addProduct,
    removeProduct,
    increaseAmount,
    decreaseAmount,
  } = useCart();

  return (
    <AuthContext.Provider
      value={{
        isloggedIn: !!token,
        token: token,
        storeName: storeName,
        login: login,
        logout: logout,
      }}
    >
      <UserCartContext.Provider
        value={{
          products: products,
          total: total,
          addProduct: addProduct,
          removeProduct: removeProduct,
          increaseAmount: increaseAmount,
          decreaseAmount: decreaseAmount,
        }}
      >
        <Routes token={token} storeName={storeName} />;
      </UserCartContext.Provider>
    </AuthContext.Provider>
  );
}
