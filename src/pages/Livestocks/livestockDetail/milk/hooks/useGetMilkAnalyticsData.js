import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const milkAnalyticsDataApi = (livestockId, lactationNo) => {
  return request({
    url: `/milkEntry/getMilkAnalyticsData?livestockId=${livestockId}&lactationNo=${lactationNo}`,
  });
};

const useGetMilkAnalyticsData = (livestockId, lactationNo) => {
  const { isLoading, error, data } = useQuery(
    ["getLivestockMilkAnalyticsData", livestockId, lactationNo],
    () => milkAnalyticsDataApi(livestockId, lactationNo)
  );

  return { isLoading, error, data: data?.data?.data };
};

export default useGetMilkAnalyticsData;
