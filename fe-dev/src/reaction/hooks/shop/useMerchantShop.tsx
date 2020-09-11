import { useContext } from "react";
import { MerchantShopContext } from "context/MerchantShopContext";

/**
 * Get the shop React context
 *
 * @returns {Object} the shop React context
 */
export default function useShop() {
  const merchantShopContext = useContext(MerchantShopContext);
  return merchantShopContext;
}
