import { getProfileDetails } from "../../apis/profile";
import { useQuery } from "react-query";

const getFormattedData = (data) => {
  const profile = data?.data?.data;
  return {
    fullName: profile?.name,
    email: profile?.email,
    phoneNumber: profile?.phone,
    address: profile?.address?.line,
    pincode: profile?.address?.pincode,
    state: profile?.address?.state,
    country: profile?.address?.country,
  };
};

const useGetProfile = (userId) => {
  const { isLoading, isFetching, error, data } = useQuery(
    ["getProfileDetails"],
    () => getProfileDetails(userId)
  );

  return {
    isLoading,
    isFetching,
    error,
    profile: getFormattedData(data),
  };
};

export default useGetProfile;
