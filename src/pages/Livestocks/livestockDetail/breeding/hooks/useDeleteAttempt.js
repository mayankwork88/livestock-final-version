import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const deleteAttemptApi = (livestockId, attemptId) =>
  request({
    url: `/AiAttempt/deleteAiAttempt?aiAttemptId=${attemptId}&livestockId=${livestockId}`,
    method: "DELETE",
  });

const useDeleteAttempt = (livestockId) => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAttempt } = useMutation(
    (attemptId) => deleteAttemptApi(livestockId, attemptId),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Attempt successfully deleted`);
          queryClient.invalidateQueries("getLivestockAiAttemptData");
        } else {
          toast.error("Failed to delete : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to delete : " + err.message);
      },
    }
  );
  return { isDeleting, deleteAttempt };
};

export default useDeleteAttempt;
