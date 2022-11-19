const Paths = {
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
  SellerEditProduct: (storeName, pid) =>
    `/store/${storeName}/adm/products/${pid}`,
};

export default Paths;
