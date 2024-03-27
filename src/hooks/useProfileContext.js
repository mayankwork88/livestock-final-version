import { useContext } from 'react';
import { ProfileContext } from '../context/profileContext';

const useProfileContext = () => {
  return useContext(ProfileContext)
}

export default useProfileContext;
