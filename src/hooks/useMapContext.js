import { useContext } from 'react';
import { MapContext } from '../context/MapPageContext';

const useMapContext = () => {
  return useContext(MapContext)
}

export default useMapContext;
