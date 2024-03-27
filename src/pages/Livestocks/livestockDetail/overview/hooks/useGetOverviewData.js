import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const overviewDataApi = (livestockId) => {
  return request({
    url: `/liveStock/getLivestockInfoData?livestockId=${livestockId}`,
  });
};

const deviceFormattedData = (data) => {
  return data
};

const useGetOverviewData = (livestockId) => {
  const { isLoading, error, data } = useQuery(
    ["getLivestockOverviewData", livestockId],
    () => overviewDataApi(livestockId)
  );

  return { isLoading, error, data: deviceFormattedData(data?.data?.data) };
};

export default useGetOverviewData;
