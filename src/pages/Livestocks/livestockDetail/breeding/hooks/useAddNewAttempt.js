import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const addAIAttemptApi = (livestockId, body) =>
  request({
    url: `/AiAttempt/addAiAttempt?livestockId=${livestockId}`,
    method: "POST",
    data: body,
  });

const useAddNewAttempt = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addNewAiAttempt } = useMutation(
    (data) => addAIAttemptApi(id, data),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`AI Attempt Successfully added`);
          queryClient.invalidateQueries("getLivestockAiAttemptData");
        } else {
          toast.error("Failed to add : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to add" + err.message);
      },
    }
  );
  return { isAdding, addNewAiAttempt };
};

export default useAddNewAttempt;
