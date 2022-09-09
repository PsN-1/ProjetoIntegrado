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

export let STORE_NAME = "";

function handleLogin(props) {
  STORE_NAME = props;
}

// Routes
export function Routes() {
  return (
    <Router>
      {/* <main> */}
      <Switch>
        <Route path={Paths.Login} exact>
          <Login onLogin={handleLogin} />
        </Route>
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
      {/* </main> */}
    </Router>
  );
}
