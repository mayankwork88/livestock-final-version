import { useQuery } from "react-query";
import { getUnassignLivestock } from "../apis/services";

const useGetUnassignLivestock = (pagination, query) => {
  const { isLoading, error, data } = useQuery(
    ["getUnassignedLivestock", pagination, query],
    () => getUnassignLivestock(pagination, query)
  );
  return {
    unassignLivestockLoading: isLoading,
    unassignLivestockError: error,
    unassignLivestockData: data?.data?.data?.liveStockData || [],
    unassignLivestockDataLength: data?.data?.data?.dataLength || 0,
  };
};

export default useGetUnassignLivestock;
