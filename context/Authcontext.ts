/// first step to make AuthContext "globally", then i need to continew in the main _layout

import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated: (isAuthenticated: boolean) => {},
});

export default AuthContext;