import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const addMilkApi = (livestockId, body) =>
  request({
    url: `/milkEntry/addMilkEntry?livestockId=${livestockId}`,
    method: "POST",
    data: body,
  });

const useAddMilkEntry = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addMilkEntry } = useMutation(
    (data) => addMilkApi(id, data),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Entry Successfully added`);
          queryClient.invalidateQueries("getLivestockMilkOverviewData");
        } else {
          toast.error("Failed to add : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to add" + err.message);
      },
    }
  );
  return { isAdding, addMilkEntry };
};

export default useAddMilkEntry;
