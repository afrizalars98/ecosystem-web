import { useContext } from "react";
import { AuthContext, AuthContextValue } from "./AuthProvider";

export const useAuth = (): AuthContextValue => {
  return useContext(AuthContext);
};
