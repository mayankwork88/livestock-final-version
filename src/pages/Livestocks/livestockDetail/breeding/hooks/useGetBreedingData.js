import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const breedingDataApi = (livestockId) => {
  return request({
    url: `/liveStock/getBreedingData?livestockId=${livestockId}`,
  });
};

const useGetBreedingData = (livestockId) => {
  const { isLoading, error, data } = useQuery(
    ["getLivestockBreedingData"],
    () => breedingDataApi(livestockId)
  );

  return { isLoading, error, data: data?.data?.data };
};

export default useGetBreedingData;
