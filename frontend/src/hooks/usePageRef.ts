import { useOutletContext } from "react-router-dom";

type ContextType = { pageRef: (node?: Element | null | undefined) => void };

export function usePageRef() {
  return useOutletContext<ContextType>();
}
