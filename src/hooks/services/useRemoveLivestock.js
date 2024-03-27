import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../apis/axios-utils";

const removeLivestockApi = (device, body) =>
  request({
    url: `/devices/unassign-liveStock?unassignType=${device}`,
    method: "POST",
    data: body,
  });

const useRemoveLivestock = (type) => {
  const queryClient = useQueryClient();

  const val =
    type?.toLowerCase() === "collar" || type?.toLowerCase() === "pedometer"
      ? "Livestock"
      : type;

  const { isLoading: isRemoving, mutate: removeLivestock } = useMutation(
    (data) => removeLivestockApi(type, data),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`${val} successfully removed`);
          queryClient.invalidateQueries("getDeviceById");
          queryClient.invalidateQueries("getAllUnassignLivestock")
        } else {
          toast.error("Failed to removed : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to removed" + err.message);
      },
    }
  );
  return { isRemoving, removeLivestock };
};

export default useRemoveLivestock;
