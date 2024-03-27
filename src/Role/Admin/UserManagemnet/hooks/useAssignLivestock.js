import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { assignLivestockToUserApi } from "../apis/services";

const useAssignLivestock = () => {
  const queryClient = useQueryClient();

  const { isLoading: isAssigning, mutate: assignLivestock } = useMutation(
    assignLivestockToUserApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Livestock Successfully assigned`);
          queryClient.invalidateQueries("getAllLivestock");
          queryClient.invalidateQueries("getUnassignedLivestock");
        } else {
          toast.error("Failed to assigned : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to assigned" + err.message);
      },
    }
  );
  return { isAssigning, assignLivestock };
};

export default useAssignLivestock;
