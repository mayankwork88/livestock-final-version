import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const config = {
  headers: { "content-type": "multipart/form-data" },
};

const livestockUpdateInfoAPI = (id, body) =>
  request({
    url: `/liveStock/updateLiveStockInformation?livestockId=${id}`,
    method: "PATCH",
    data: body,
    config,
  });

const useLivestockInfoUpdate = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateLivestockInfo } = useMutation(
    (data) => livestockUpdateInfoAPI(id, data),
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
  return { isUpdating, updateLivestockInfo };
};

export default useLivestockInfoUpdate;
