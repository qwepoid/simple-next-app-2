import { createContext } from "react";
import { defaultValue } from "./constants";

const AuthContext = createContext({
  ...defaultValue,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
