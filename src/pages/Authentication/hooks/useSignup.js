import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { request } from "../../../apis/axios-utils";

const signUpApi = (body) => {
  return request({ url: "/auth/sign-up", method: "POST", data: body });
};

const useSignup = () => {
  const { isLoading: isSigning, mutate: signUp } = useMutation(signUpApi, {
    onSuccess: (data) => {
      const err = data?.response?.data?.message || data?.statusText;
      if (data?.status === 200) {
        toast.success("OTP Successfully sent");
      } else {
        toast.error("Sign-up failed : " + err);
      }
    },
    onError: (err) => {
      toast.error("Sign-up failed : " + err.message);
    },
  });
  return { isSigning, signUp };
};

export default useSignup;
