import { createContext } from "react";

export default createContext({
    isloggedIn: false,
    login: () => {},
    logout: () => {}
})