import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./Seller/Login/Login";
import MainPageStore from "./Store/MainPage/pages/MainPageStore";
import SellerDashboard from "./Seller/Dashboard/SellerDashboard";

import SellerNewProduct from "./Seller/Dashboard/SellerNewProduct";
import ForgetPassword from "./Seller/Login/ForgetPassword";

import SellerSignUpUser from "./Seller/SignUp/SellerSignUpUser";
import SellerSignUpStore from "./Seller/SignUp/SellerSignUpStore";
import SellerProducts from "./Seller/Dashboard/SellerProducts";
import SellerEditProduct from "./Seller/Dashboard/SellerEditProduct";

export const Paths = {
  Login: "/",
  ForgotPassword: "/forgotpassword",
  SignupUser: "/signupUser",
  SignupStore: "/signupStore",

  MainPageStore: (storeName) => `/${storeName}`,

  SellerDashboard: (storeName) => `/${storeName}/adm/dashboard`,
  SellerProducts: (storeName) => `/${storeName}/adm/products`,
  SellerAddNewProduct: (storeName) => `/${storeName}/adm/products/new`,
  SellerEditProduct: (storeName, pid) => `/${storeName}/adm/products/${pid}`,
};

const baseEndPointURL = "https://lojauniversal.herokuapp.com";
export const EndPoint = {
  storeCount: `${baseEndPointURL}/api/seller/stores/count`,
  stores: `${baseEndPointURL}/api/seller/stores/`,
  storeWithId: (productId) =>
    `${baseEndPointURL}/api/seller/stores/${productId}`,
};

// Routes
export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path={Paths.Login} exact component={Login} />

        <Route path={Paths.ForgotPassword} exact component={ForgetPassword} />
        <Route path={Paths.SignupUser} exact component={SellerSignUpUser} />
        <Route path={Paths.SignupStore} exact component={SellerSignUpStore} />

        <Route
          path={Paths.MainPageStore(":storeName")}
          exact
          component={MainPageStore}
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
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export const getStoreName = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const setStoreName = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    return undefined;
  }
};
