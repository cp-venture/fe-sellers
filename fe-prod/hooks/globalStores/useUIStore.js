import { useContext } from "react";
import { UIContext } from "reaction-contexts/UIContext";

/**
 * Gets the UI store React reaction-contexts
 *
 * @returns {Object} React reaction-contexts for UI store
 */
export default function useUIStore() {
  const uiContext = useContext(UIContext);
  return uiContext;
}
