import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { request } from "../../../../../apis/axios-utils";

const dryingDateApi = (livestockId, calvingId, body) =>
  request({
    url: `/liveStock/updateCalvingPeriod?livestockId=${livestockId}&calvingId=${calvingId}`,
    method: "PATCH",
    data: body,
  });

const useUpdateDryingDate = (id) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateDryingDate } = useMutation(
    (body) => dryingDateApi(id, body?.id, { dryingDate: body?.dryingDate }),
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`Drying date successfully updated`);
          queryClient.invalidateQueries("getLivestockBreedingData");
        } else {
          toast.error("Failed to update : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to update" + err.message);
      },
    }
  );
  return { isUpdating, updateDryingDate };
};

export default useUpdateDryingDate;
