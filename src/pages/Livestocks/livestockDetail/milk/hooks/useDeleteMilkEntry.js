import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const deleteMilkApi = (milkEntryId) =>
  request({
    url: `/milkEntry/deleteMilkEntryData?milkEntryId=${milkEntryId}`,
    method: "DELETE",
  });

const useDeleteMilkEntry = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMilkEntry } = useMutation(
    deleteMilkApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Entry successfully deleted`);
          queryClient.invalidateQueries("getLivestockMilkOverviewData");
        } else {
          toast.error("Failed to delete : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to delete : " + err.message);
      },
    }
  );
  return { isDeleting, deleteMilkEntry };
};

export default useDeleteMilkEntry;
