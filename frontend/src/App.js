import "./App.css";
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

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/forgotpassword" exact>
            <ForgetPassword />
          </Route>
          <Route path="/signup" exact>
            <SellerSignUpUser />
          </Route>
          <Route path="/signup2" exact>
            <SellerSignUpStore />
          </Route>

          <Route path="/:storeName" exact>
            <MainPageStore />
          </Route>
          <Route path="/:storeName/dashboard">
            <SellerDashboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
