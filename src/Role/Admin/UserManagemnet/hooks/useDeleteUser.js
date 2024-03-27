import { deleteUser as deleteUserApi } from "../apis/services";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation(
    deleteUserApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success("User Successfully deleted");
          queryClient.invalidateQueries(["adminAllUsers"]);
          navigate("/users");
        } else {
          toast.error("Failed to delete : " + err);
        }
      },
      onError: (err) => {
        toast.error("Failed to delete" + err.message);
      },
    }
  );
  return { isDeleting, deleteUser };
};

export default useDeleteUser;
