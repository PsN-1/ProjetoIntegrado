import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./Seller/Login/Login";
import MainPageStore from "./Store/MainPage/pages/MainPageStore";
import ProductDetail from "./Store/MainPage/pages/ProductDetail";
import UserCart from "./Store/MainPage/pages/UserCart";
import SellerDashboard from "./Seller/Dashboard/SellerDashboard";

import SellerNewProduct from "./Seller/Dashboard/SellerNewProduct";
import ForgetPassword from "./Seller/Login/ForgetPassword";

import SellerSignUpUser from "./Seller/SignUp/SellerSignUpUser";
import SellerSignUpStore from "./Seller/SignUp/SellerSignUpStore";
import SellerProducts from "./Seller/Dashboard/SellerProducts";
import SellerEditProduct from "./Seller/Dashboard/SellerEditProduct";
import ErrorScreen from "./shared/Pages/ErrorScreen";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { UserCartContext } from "./shared/context/user-cart";
import { useCart } from "./shared/hooks/cart-hook";
import UserSettings from "./shared/Pages/Settings/UserSettings";
import StoreSettings from "./shared/Pages/Settings/StoreSettings";

export const Paths = {
  Login: "/",
  ForgotPassword: "/forgotpassword",
  SignupUser: "/signupUser",
  SignupStore: "/signupStore",
  ErrorModal: "/error",

  MainPageStore: (storeName) => `/store/${storeName}`,
  DetailProductStore: (storeName, pid) => `/store/products/${storeName}/${pid}`,
  UserCart: (storeName) => `/store/${storeName}/cart`,
  UserSettings: (storeName) => `/store/${storeName}/editUser`,
  StoreSettings: (storeName) => `/store/${storeName}/editStore`,

  SellerDashboard: (storeName) => `/store/${storeName}/adm/dashboard`,
  SellerProducts: (storeName) => `/store/${storeName}/adm/products`,
  SellerAddNewProduct: (storeName) => `/store/${storeName}/adm/products/new`,
  SellerEditProduct: (storeName, pid) => `/store/${storeName}/adm/products/${pid}`,
};

const baseEndPointURL = "http://localhost:3030";  // "https://loja-universal-mvp.herokuapp.com";
export const EndPoint = {
  seller: {
    storeCount: (storeName) =>
      `${baseEndPointURL}/api/seller/${storeName}/products/count`,
    stores: (storeName) =>
      `${baseEndPointURL}/api/seller/${storeName}/products`,
    storeWithId: (storeName, productId) =>
      `${baseEndPointURL}/api/seller/${storeName}/products/${productId}`,

    editStore: (storeName) =>
      `${baseEndPointURL}/api/seller/${storeName}/store`,
    editSeller: (storeName) =>
      `${baseEndPointURL}/api/seller/${storeName}/seller`,

    createSeller: `${baseEndPointURL}/api/seller/stores/newSeller`,
    createStore: `${baseEndPointURL}/api/seller/stores/newStore`,
    login: `${baseEndPointURL}/api/seller/login`,
  },

  user: {
    stores: (storeName) => `${baseEndPointURL}/api/user/${storeName}/`,
    storeWithId: (storeName, productId) =>
      `${baseEndPointURL}/api/user/${storeName}/${productId}`,
  },
};

export function Routes() {
  const { token, login, logout, storeName } = useAuth();
  const {
    products,
    total,
    addProduct,
    removeProduct,
    increaseAmount,
    decreaseAmount,
  } = useCart();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path={Paths.ErrorModal} exact component={ErrorScreen} />

        <Route
          path={Paths.MainPageStore(":storeName")}
          exact
          component={MainPageStore}
        />

        <Route path={Paths.UserCart(":storeName")} exact component={UserCart} />
        <Route
          path={Paths.UserSettings(":storeName")}
          exact
          component={UserSettings}
        />
        <Route
          path={Paths.StoreSettings(":storeName")}
          exact
          component={StoreSettings}
        />

        <Route
          path={Paths.DetailProductStore(":storeName", ":pid")}
          exact
          component={ProductDetail}
        />

        <Route
          path={Paths.SellerDashboard(":storeName")}
          exact
          component={SellerDashboard}
        />
        <Route
          path={Paths.SellerProducts(":storeName")}
          exact
          component={SellerProducts}
        />
        <Route
          path={Paths.SellerAddNewProduct(":storeName")}
          exact
          component={SellerNewProduct}
        />
        <Route
          path={Paths.SellerEditProduct(":storeName", ":pid")}
          exact
          component={SellerEditProduct}
        />

        <Redirect to={Paths.SellerDashboard(storeName)} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path={Paths.Login} exact component={Login} />
        <Route path={Paths.ErrorModal} exact component={ErrorScreen} />
        <Route path={Paths.ForgotPassword} exact component={ForgetPassword} />
        <Route path={Paths.SignupUser} exact component={SellerSignUpUser} />
        <Route path={Paths.SignupStore} exact component={SellerSignUpStore} />

        <Route
          path={Paths.MainPageStore(":storeName")}
          exact
          component={MainPageStore}
        />

        <Route path={Paths.UserCart(":storeName")} exact component={UserCart} />

        <Route
          path={Paths.DetailProductStore(":storeName", ":pid")}
          exact
          component={ProductDetail}
        />

        <Redirect to="/" />
      </Switch>
    );
  }

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
        <Router>
          <main>{routes}</main>
        </Router>
      </UserCartContext.Provider>
    </AuthContext.Provider>
  );
}
