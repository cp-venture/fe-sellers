import { useContext } from "react";
import { TagsContext } from "reaction-contexts/TagsContext";

/**
 * Get the tags React reaction-contexts
 *
 * @returns {Object} the tags React reaction-contexts
 */
export default function useTags() {
  const tagsContext = useContext(TagsContext);
  return tagsContext;
}
