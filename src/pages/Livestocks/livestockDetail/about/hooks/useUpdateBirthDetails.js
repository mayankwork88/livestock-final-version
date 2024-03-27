import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const updateBirthDetailsApi = (id, body) =>
  request({
    url: `/liveStock/updateLivestockBirthDetails?livestockId=${id}`,
    method: "PATCH",
    data: body,
  });

const useUpdateBirthDetails = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateLivestockBirthDetails } =
    useMutation((data) => updateBirthDetailsApi(id, data), {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Livestock Successfully updated`);
          queryClient.invalidateQueries("getLivestockOverviewData");
        } else {
          toast.error("Failed to update : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to update" + err.message);
      },
    });
  return { isUpdating, updateLivestockBirthDetails };
};

export default useUpdateBirthDetails;
