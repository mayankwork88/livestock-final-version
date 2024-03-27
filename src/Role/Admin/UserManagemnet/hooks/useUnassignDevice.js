import { unassignDeviceToUserApi } from "../apis/services";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

const useUnassignDevice = (deviceType) => {
  const queryClient = useQueryClient();

  const { isLoading: isUnassign, mutate: unassignDevice } = useMutation(
    unassignDeviceToUserApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`${deviceType} Successfully unassigned`);
          queryClient.invalidateQueries("getAllDevices");
          queryClient.invalidateQueries("getUnassignedDevices");
        } else {
          toast.error("Failed to unassigned : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to unassigned" + err.message);
      },
    }
  );
  return { isUnassign, unassignDevice };
};

export default useUnassignDevice;
