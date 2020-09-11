import graphQLRequest from "staticUtils/graphQLRequest";
import merchantShopQuery from "./merchantShop";

/**
 * Fetch the primary shop's information
 *
 * @param {String} language - The shop's language
 * @returns {Object} The primary shop
 */
export default async function fetchMerchantShop(language) {
  const data = await graphQLRequest(merchantShopQuery, { language });

  return (data && data.merchantShop && { shop: data.merchantShop }) || { shop: null };
}
