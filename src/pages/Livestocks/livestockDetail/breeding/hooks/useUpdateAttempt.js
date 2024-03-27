import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const updateAIAttemptApi = (attemptId, livestockId, body) =>
  request({
    url: `/AiAttempt/updateAiAttempt?aiAttemptId=${attemptId}&livestockId=${livestockId}`,
    method: "PATCH",
    data: body,
  });

const useUpdateAttempt = (attemptId, id ) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateAiAttempt } = useMutation(
    (data) => updateAIAttemptApi(attemptId, id, data),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`AI Attempt Successfully updated`);
          queryClient.invalidateQueries("getLivestockAiAttemptData");
        } else {
          toast.error("Failed to update : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to update" + err.message);
      },
    }
  );
  return { isUpdating, updateAiAttempt };
};

export default useUpdateAttempt;

