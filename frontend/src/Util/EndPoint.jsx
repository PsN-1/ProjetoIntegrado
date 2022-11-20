const baseEndPointURL = "https://loja-universal-mvp.herokuapp.com"; // "http://localhost:3030";

const EndPoint = {
  seller: {
    storeCount: (storeName) => `${baseEndPointURL}/api/seller/${storeName}/products/count`,
    stores: (storeName) => `${baseEndPointURL}/api/seller/${storeName}/products`,
    storeWithId: (storeName, productId) => `${baseEndPointURL}/api/seller/${storeName}/products/${productId}`,

    editStore: (storeName) => `${baseEndPointURL}/api/seller/${storeName}/store`,
    editSeller: (storeName) => `${baseEndPointURL}/api/seller/${storeName}/seller`,

    createSeller: `${baseEndPointURL}/api/seller/stores/newSeller`,
    createStore: `${baseEndPointURL}/api/seller/stores/newStore`,
    login: `${baseEndPointURL}/api/seller/login`,
  },

  user: {
    stores: (storeName) => `${baseEndPointURL}/api/user/${storeName}/`,
    storeWithId: (storeName, productId) => `${baseEndPointURL}/api/user/${storeName}/${productId}`,
    storeLogoImage: (storeName) => `${baseEndPointURL}/api/user/${storeName}/logo`,
  },
};

export default EndPoint;
