import { useQuery } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const getAIAttempts = (livestockId, pagination) => {
  return request({
    url: `AiAttempt/getAllAiAttempt?livestockId=${livestockId}`,
  });
};

const useGetAIAttempts = (livestockId,pagination) => {
  const { isLoading, error, data } = useQuery(
    ["getLivestockAiAttemptData", livestockId, pagination],
    () => getAIAttempts(livestockId, pagination)
  );

  return { isLoading, error, data: data?.data?.data };
};

export default useGetAIAttempts;
