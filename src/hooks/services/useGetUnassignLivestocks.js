import { request } from "../../apis/axios-utils";
import { useQuery } from "react-query";

const unassignLivestockApi = (device = "collar", searchTerm = "", page = 1) =>
  request({
    url: `/liveStock/getAll?status=false&deviceType=${device}&searchTerm=${searchTerm}&page=${page}&limit=${10}`,
  });

const useGetUnassignLivestock = (device, query, page) => {
  const { isLoading, error, data, refetch, isSuccess } = useQuery(
    ["getAllUnassignLivestock", device, query, page],
    () => unassignLivestockApi(device, query, page),
    {
      enabled: true,
    }
  );

  return {
    isLoading,
    error,
    allUnassignLivestock: data?.data?.data,
    refetch,
    isSuccess,
  };
};

export default useGetUnassignLivestock;
