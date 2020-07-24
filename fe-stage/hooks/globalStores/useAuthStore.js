import { useContext } from "react";
import { AuthContext } from "reaction-contexts/AuthContext";

/**
 * Gets the auth store reaction-contexts
 *
 * @returns {Object} the React reaction-contexts fro the auth store
 */
export default function useAuthStore() {
  const authContext = useContext(AuthContext);
  return authContext;
}
