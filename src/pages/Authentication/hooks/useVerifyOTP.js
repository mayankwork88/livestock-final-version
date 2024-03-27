import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { request } from "../../../apis/axios-utils";

const verifyOTPApi = (body) =>
  request({ url: "/auth/verifyOtp", method: "POST", data: body });

const useVerifyOTP = () => {
  const { isLoading: isVerifying, mutate: verifyOTP } = useMutation(
    verifyOTPApi,
    {
      onSuccess: (data) => {
        const err = data?.response?.data?.message || data?.statusText;
        if (data?.status === 200) {
          toast.success("OTP Successfully verified");
        } else {
          toast.error("Error : " + err);
        }
      },
      onError: (err) => {
        toast.error("Error : " + err.message);
      },
    }
  );
  return { isVerifying, verifyOTP };
};

export default useVerifyOTP;
