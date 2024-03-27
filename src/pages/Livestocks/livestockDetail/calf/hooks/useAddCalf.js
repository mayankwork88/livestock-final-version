import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const addCalfApi = (livestockId, body) =>
  request({
    url: `/calf/createCalf?livestockId=${livestockId}`,
    method: "POST",
    data: body,
  });

const useAddCalf = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addNewCalf } = useMutation(
    (data) => addCalfApi(id, data),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Calf Successfully added`);
          queryClient.invalidateQueries("getAllLivestockCalfs");
        } else {
          toast.error("Failed to add : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to add" + err.message);
      },
    }
  );
  return { isAdding, addNewCalf };
};

export default useAddCalf;

