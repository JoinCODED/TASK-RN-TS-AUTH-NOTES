import { createContext } from "react";

//structure of the context state
const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
});

export default AuthContext;
