import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { addNewUser } from "../apis/services";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createNewUser } = useMutation(
    addNewUser,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success("User Successfully added");
          queryClient.invalidateQueries(["adminAllUsers"]);
        } else {
          toast.error("Failed to add : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to add" + err.message);
      },
    }
  );
  return { isCreating, createNewUser };
};

export default useCreateUser;
