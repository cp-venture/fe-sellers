import { useContext } from "react";
import { RoutingContext } from "reaction-contexts/RoutingContext";

/**
 * Gets the routing store reaction-contexts
 *
 * @returns {Object} the React reaction-contexts for routing store
 */
export default function useRoutingStore() {
  const routingContext = useContext(RoutingContext);
  return routingContext;
}
