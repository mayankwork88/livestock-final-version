import { useContext } from "react";
import { AlertsContext } from "../context/AlertsContext";

const useAlertsContext = () => {
  return useContext(AlertsContext)
}

export default useAlertsContext;
