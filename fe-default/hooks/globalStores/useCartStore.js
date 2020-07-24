import { useContext } from "react";
import { CartContext } from "reaction-contexts/CartContext";

/**
 * Gets the cart store contxet
 *
 * @returns {Object} the React reaction-contexts for the cart store
 */
export default function useCartStore() {
  const cartContext = useContext(CartContext);
  return cartContext;
}
