import { unassignLivestockToUserApi } from "../apis/services";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-hot-toast";

const useUnassignLivestock = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUnassign, mutate: unassignLivestock } = useMutation(
    unassignLivestockToUserApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Livestock Successfully unassigned`);
          queryClient.invalidateQueries("getAllLivestock");
          queryClient.invalidateQueries("getUnassignedLivestock");
        } else {
          toast.error("Failed to unassigned : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to unassigned" + err.message);
      },
    }
  );
  return { isUnassign, unassignLivestock };
};

export default useUnassignLivestock;
