import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { request } from "../../../apis/axios-utils";

const changePasswordAPI = (body) =>
  request({ url: "/auth/createNewPassword", method: "POST", data: body });

const useChangePassword = () => {
  const { isLoading: isChanging, mutate: changePassword } = useMutation(
    changePasswordAPI,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success("Password successfully changed");
        } else {
          toast.error("Error : " + err);
        }
      },
      onError: (err) => {
        toast.error("Error : " + err.message);
      },
    }
  );
  return { isChanging, changePassword };
};

export default useChangePassword;
