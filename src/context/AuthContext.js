import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../apis/axios-utils";
import useErrorMessage from "../hooks/useErrorMessage";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { getErrorMessage } = useErrorMessage();
  const from = "/";
  const [userData, setUserData] = useState({ data: {}, error: "" });
  const [onUserLogin, setOnUserLogin] = useState({ email: "", password: "" });
  const [onUserSignUp, setOnUserSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [timer, setTimer] = useState(null);

  const [emailOTP, setEmailOTP] = useState("");
  // show anime
  const [showAnim, setShowAnim] = useState(true);
  const [seconds, setSeconds] = useState(59);
  const [loginLoading, setLoginLoading] = useState(false)

  const [isLogin, setIsLogin] = useState("log in");
  const [otpVerification, setOTPVerification] = useState(false);

  //FORGET PASSWORD
  const [forgetPassword, setForgetPassword] = useState(0);
  const [forgetEmail, setForgetEmail] = useState("");

  //Snackbar alert
  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  //Snackbar show alert
  const showSnackbarAlert = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  // HANDLE USER LOGIN
  const handleUserCredentialChange = (event) => {
    const { name, value } = event.target;
    setOnUserLogin({ ...onUserLogin, [name]: value });
  };

  const handleUserLoginSubmit = async () => {
    setLoginLoading(true)
    const body = {
      email: onUserLogin?.email,
      password: onUserLogin?.password,
    };
    try {
      const res = await request({
        url: "/auth/sign-in",
        method: "POST",
        data: body,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        const loginCredentials = {
          accessToken: data?.accessToken,
          userId: data?.user?._id,
          userName: data.user.name,
          role: data.user.role,
        };
        localStorage.setItem("userData", JSON.stringify(loginCredentials));
        // navigate(from);
        window.location.pathname = "/";
      } else if (res?.response?.data?.statusCode === 401) {
        toast.error(res?.response?.data?.message);
      } else {
        const message = getErrorMessage(res);
        throw new Error(message);
      }
    } catch (err) {
      toast.error(err?.message);
    }finally{
      setLoginLoading(false)
    }
  };

  //HANDLE USER SIGN UP
  const handleUserSignUpCredentialChange = (event) => {
    const { name, value } = event.target;
    setOnUserSignUp({ ...onUserSignUp, [name]: value });
  };

  const resendTimer = () => {
    clearInterval(timer);
    let newTimer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(newTimer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const onSignUpComplete = (res) => {
    // handle complete profile show modal only one time
    localStorage.setItem("showProfileCompleteModal", "true");
    const userCredentials = {
      accessToken: res.data.data.token,
      userId: res.data.data.userData._id,
      userName: res.data.data.userData.name,
      role: res.data.data.userData.role,
    };
    localStorage.setItem("userData", JSON.stringify(userCredentials));
    window.location.pathname = "/";
  };

  const handleOTPVerificationGoBack = () => {
    setOTPVerification(false);
    clearInterval(timer);
    setTimer(null);
    setSeconds(59);
    setEmailOTP("");
    setForgetPassword(1);
  };

  const handleResendOTP = () => {
    setSeconds(59);
    setEmailOTP("");
    resendTimer();
  };

  const handleOTPSubmit = () => {
    if (emailOTP?.length === 6) {
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleUserLoginSubmit,
        onUserSignUp,
        userData,
        handleUserSignUpCredentialChange,
        handleUserCredentialChange,
        onUserLogin,
        snackbarAlert,
        onSnackbarAlertClose,
        showAnim,
        setShowAnim,
        isLogin,
        setIsLogin,
        otpVerification,
        seconds,
        setOTPVerification,
        emailOTP,
        setEmailOTP,
        handleOTPSubmit,
        handleOTPVerificationGoBack,
        resendTimer,
        onSignUpComplete,
        onSignUpComplete,
        handleResendOTP,
        forgetPassword,
        setForgetPassword,
        forgetEmail,
        setForgetEmail,
        loginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
