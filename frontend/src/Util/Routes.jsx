import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import {
  Login,
  MainPageStore,
  ProductDetail,
  UserCart,
  SellerDashboard,
  SellerNewProduct,
  ForgetPassword,
  SellerSignUpUser,
  SellerSignUpStore,
  SellerProducts,
  SellerEditProduct,
  ErrorScreen,
  UserSettings,
  StoreSettings,
  Paths,
  SignUp,
} from "LojaUniversal";

export default function Routes(props) {
  let { token, storeName } = props;
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
          path={Paths.SignupBuyer(":storeName")}
          exact
          component={SignUp}
        />
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
    <Router>
      <main>{routes}</main>
    </Router>
  );
}
