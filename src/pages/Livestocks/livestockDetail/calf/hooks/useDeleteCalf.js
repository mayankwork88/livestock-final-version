import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const deleteCalfApi = (livestockId) =>
  request({
    url: `/calf/deleteCalf?calfId=${livestockId}`,
    method: "DELETE",
  });

const useDeleteCalf = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCalf } = useMutation(
    (id) => deleteCalfApi(id),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Calf successfully deleted`);
          queryClient.invalidateQueries("getAllLivestockCalfs");
        } else {
          toast.error("Failed to delete : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to delete" + err.message);
      },
    }
  );
  return { isDeleting, deleteCalf };
};

export default useDeleteCalf;


