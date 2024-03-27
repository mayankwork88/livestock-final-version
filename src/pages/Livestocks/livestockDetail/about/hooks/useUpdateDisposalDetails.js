import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const updateDisposalDetailsAPI = (id, body) =>
  request({
    url: `/liveStock/updateLivestockDisposalDetails?livestockId=${id}`,
    method: "PATCH",
    data: body,
  });

const useUpdateDisposalDetails = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateDisposalDetails } = useMutation(
    (data) => updateDisposalDetailsAPI(id, data),
    {
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
    }
  );
  return { isUpdating, updateDisposalDetails };
};

export default useUpdateDisposalDetails;
