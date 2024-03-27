import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";
import useDateFormat from "../../../../../hooks/useDateFormat";

const milkOverviewDataApi = (livestockId, pagination, month) => {
  return request({
    url: `/milkEntry/getMilkRecords?livestockId=${livestockId}&page=${pagination}&limit=32&startDate=${month}`,
  });
};

const useGetMilkOverviewData = (livestockId, pagination, month) => {
  const { paginationDateFormat } = useDateFormat();
  const date = paginationDateFormat(month?.['$d']);
  const { isLoading, error, data } = useQuery(
    ["getLivestockMilkOverviewData", livestockId, pagination, month],
    () => milkOverviewDataApi(livestockId, pagination, date)
  );

  return { isLoading, error, data: data?.data?.data };
};

export default useGetMilkOverviewData;
