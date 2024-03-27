import { request } from "../../../apis/axios-utils";
import { useQuery } from "react-query";

const api = (status) =>
  request({ url: `/liveStock/safeUnsafeLiveStock?locationStatus=${status}`});

const useGetLivestockByStatus = (status) => {
  const { isLoading, error, data } = useQuery(
    ["getLivestockByStatus", status],
    () => api(status)
  );

  return {
    isLoading,
    error,
    livestockData: data?.data?.data?.livestock_info,
    dataLength: data?.data?.data?.dataLength || 0,
  };
};

export default useGetLivestockByStatus;
