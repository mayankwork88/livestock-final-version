import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { assignCollarToUserApi } from "../apis/services";

const useAssignCollar = (deviceType) => {
  const queryClient = useQueryClient();

  const { isLoading: isAssigning, mutate: assignCollar } = useMutation(
    assignCollarToUserApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success(`${deviceType} Successfully assigned`);
          queryClient.invalidateQueries("getAllDevices");
          queryClient.invalidateQueries("getUnassignedDevices");
        } else {
          toast.error("Failed to assigned : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to assigned" + err.message);
      },
    }
  );
  return { isAssigning, assignCollar };
};

export default useAssignCollar;
