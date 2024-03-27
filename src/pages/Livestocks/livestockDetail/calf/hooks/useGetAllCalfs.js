import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const getAIAttempts = (livestockId, pagination, searchTerm) => {
  return request({
    url: `/calf/getCalfs?livestockId=${livestockId}&page=${pagination}&limit=10&searchTerm=${searchTerm}`,
  });
};

const useGetAllCalfs = (livestockId, pagination, searchTerm) => {
  const { isLoading, error, data } = useQuery(
    ["getAllLivestockCalfs", livestockId, pagination, searchTerm],
    () => getAIAttempts(livestockId, pagination, searchTerm)
  );

  return { isLoading, error, data: data?.data?.data };
};

export default useGetAllCalfs;
