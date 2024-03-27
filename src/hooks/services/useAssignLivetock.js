import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../apis/axios-utils";

const assignLivestockApi = (device, body) =>
  request({
    url: `/devices/assign-liveStock?assignType=${device}`,
    method: "POST",
    data: body,
  });

const useAssignLivestock = (type) => {
  const queryClient = useQueryClient();
  const val =
    type?.toLowerCase() === "collar" || type?.toLowerCase() === "pedometer"
      ? "Livestock"
      : type;
  const { isLoading: isAssigning, mutate: assignLivestock } = useMutation(
    (data) => assignLivestockApi(type, data),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`${val} successfully assigned`);
          queryClient.invalidateQueries("getDeviceById");
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
