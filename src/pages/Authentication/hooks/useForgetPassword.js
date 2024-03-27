import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { request } from "../../../apis/axios-utils";

const forgetPasswordApi = (body) =>
  request({ url: "/auth/forgotOtp", method: "POST", data: body });

const useForgetPassword = () => {
  const { isLoading: isForgetting, mutate: forgetPassword } = useMutation(
    forgetPasswordApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success("OTP Successfully sent");
        } else {
          toast.error("Error : " + err);
        }
      },
      onError: (err) => {
        toast.error("Error : " + err.message);
      },
    }
  );
  return { isForgetting, forgetPassword };
};

export default useForgetPassword;
