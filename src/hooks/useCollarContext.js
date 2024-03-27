import { useContext } from "react";
import {CollarContext} from "../context/CollarContext";

const useCollarContext = () => {
  return useContext(CollarContext)
}

export default useCollarContext;
