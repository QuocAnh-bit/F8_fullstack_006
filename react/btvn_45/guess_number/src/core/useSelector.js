import { useContext } from "react";
import { ProviderContext } from "./Provider";

export const useSelector = () => {
  return useContext(ProviderContext);
};
