import { useContext } from "react";
import { ShopContext } from "reaction-contexts/ShopContext";

/**
 * Get the shop React reaction-contexts
 *
 * @returns {Object} the shop React reaction-contexts
 */
export default function useShop() {
  const shopContext = useContext(ShopContext);
  return shopContext;
}
