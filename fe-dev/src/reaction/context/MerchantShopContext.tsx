import React, { createContext } from "react";
import PropTypes from "prop-types";

export const MerchantShopContext = createContext({} as any);

export const MerchantShopProvider = ({ shop, children }) => (
  <MerchantShopContext.Provider value={shop}>
    {children}
  </MerchantShopContext.Provider>
);

MerchantShopProvider.propTypes = {
  children: PropTypes.node,
  shop: PropTypes.object
};
