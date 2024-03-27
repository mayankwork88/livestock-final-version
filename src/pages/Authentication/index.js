import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import "./index.css";
import useAuthContext from "../../hooks/useAuth";
import { LoginBG } from "../../assets";
import { SnackbarAlert } from "../../ComponentsV2";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OTPVerification from "./OTPVerification";
import EnterEmail from "./ForgetPassword/EnterEmail";
import EnterOTP from "./ForgetPassword/EnterOTP";
import EnterNewPassword from "./ForgetPassword/EnterNewPassword";

const AuthPage = () => {
  const {
    handleUserLoginSubmit,
    handleUserSignUpSubmit,
    onUserSignUp,
    handleUserCredentialChange,
    onUserLogin,
    handleUserSignUpCredentialChange,
    snackbarAlert,
    onSnackbarAlertClose,
    showAnim,
    setShowAnim,
    isLogin,
    setIsLogin,
    otpVerification,
    forgetPassword,
    loginLoading,
  } = useAuthContext();

  useEffect(() => {
    if (window.location.pathname === "/login") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const loginVariants = {
    show: { x: 0, display: "block", transition: { duration: 0.5 } },
    hide: { x: "-100vw", transition: { duration: 0.5 } },
  };

  const signupVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
      transition: { duration: 0.5 },
    },
    visible: {
      x: 0,
      opacity: 1,
      display: "block",
      transition: { duration: 0.5 },
    },
  };

  const login = isLogin == "log in";

  return (
    <>
      <SnackbarAlert
        open={snackbarAlert?.open}
        closeAlert={onSnackbarAlertClose}
        message={snackbarAlert?.message}
        type={snackbarAlert?.type}
      />
      <Stack
        width="100%"
        minHeight={"100vh"}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundImage: `url(${LoginBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          overflow: "hidden",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          variants={signupVariants}
          initial={"hidden"}
          animate={forgetPassword === 1 ? "visible" : "hidden"}
        >
          <EnterEmail />
        </motion.div>
        <motion.div
          variants={loginVariants}
          initial={"hide"}
          animate={forgetPassword === 2 ? "show" : "hide"}
        >
          <EnterOTP />
        </motion.div>
        <motion.div
          variants={signupVariants}
          initial={"hidden"}
          animate={forgetPassword === 3 ? "visible" : "hidden"}
        >
          <EnterNewPassword />
        </motion.div>
        <motion.div
          variants={loginVariants}
          initial={"show"}
          animate={login && forgetPassword === 0 ? "show" : "hide"}
        >
          <LoginForm
            showAnim={showAnim}
            setShowAnim={(ele) => {
              setIsLogin(ele);
              setShowAnim(!showAnim);
            }}
            isLogin={isLogin}
            loginLoading={loginLoading}
            setIsLogin={setIsLogin}
            onUserLogin={onUserLogin}
            handleUserCredentialChange={handleUserCredentialChange}
            handleUserLoginSubmit={handleUserLoginSubmit}
          />
        </motion.div>
        <motion.div
          variants={signupVariants}
          initial={"hidden"}
          animate={login || otpVerification ? "hidden" : "visible"}
        >
          <SignupForm
            showAnim={showAnim}
            setShowAnim={(ele) => {
              setIsLogin(ele);
              setShowAnim(!showAnim);
            }}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            onUserSignUp={onUserSignUp}
            handleUserSignUpCredentialChange={handleUserSignUpCredentialChange}
            handleUserSignUpSubmit={handleUserSignUpSubmit}
          />
        </motion.div>
        <motion.div
          variants={loginVariants}
          initial={"hide"}
          animate={otpVerification ? "show" : "hide"}
        >
          <OTPVerification />
        </motion.div>
      </Stack>
    </>
  );
};

export default AuthPage;
