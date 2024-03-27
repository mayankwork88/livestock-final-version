import React from 'react';
import { useContext } from 'react';
import {LivestockContext} from "../context/LivestockContext";

const useLivestockContext = () => {
  return useContext(LivestockContext)
}

export default useLivestockContext;
