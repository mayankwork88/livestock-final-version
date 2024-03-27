import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const lactationPeriodApi = (livestockId) => {
  return request({
    url: `/milkEntry/getLactationPeriod?livestockId=${livestockId}`,
  });
};

const useGetLactationPeriod = (livestockId) => {
  const { isLoading, error, data } = useQuery(
    ["getLivestockLactationPeriod", livestockId],
    () => lactationPeriodApi(livestockId)
  );

  return { isLoading, error, data: data?.data?.data };
};

export default useGetLactationPeriod;
