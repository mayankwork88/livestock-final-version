import React from "react";
import Logo from "../Logo";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { ButtonPrimary } from "../../../ComponentsV2/themeComponents";
import OtpInput from "../OTPInput";
import ResendOTP from "../Resend";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuthContext from "../../../hooks/useAuth";
import useVerifyOTP from "../hooks/useVerifyOTP";
import useForgetPassword from "../hooks/useForgetPassword";
import toast from "react-hot-toast";

const EnterOTP = () => {
  const {
    emailOTP,
    setEmailOTP,
    handleResendOTP,
    setForgetPassword,
    handleOTPVerificationGoBack,
    forgetEmail,
    resendTimer,
  } = useAuthContext();

  const theme = useTheme();
  const { isVerifying, verifyOTP } = useVerifyOTP();
  const { isForgetting, forgetPassword } = useForgetPassword();

  const onResend = () => {
    const body = {
      email: forgetEmail,
    };
    forgetPassword(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          resendTimer();
          handleResendOTP();
        }
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: forgetEmail,
      otp: emailOTP,
    };
    if (emailOTP?.length === 6) {
      verifyOTP(body, {
        onSuccess: (data) => {
          if (data.status === 200) {
            localStorage.setItem('forgetEmailAuth', data?.data?.data?.token)
            setForgetPassword(3);
          }
        },
      });
    } else {
      toast.error("Please Enter a valid OTP");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Paper
        elevation={4}
        sx={{
          minWidth: 452,
          minHeight: 460,
          p: theme.spacing(4),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
          backgroundColor: `rgba(0,0,0,0.2)`,
          backdropFilter:'blur(5px)',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%)`,
        }}
      >
        <IconButton
          sx={{ alignSelf: "flex-start", mt: -3, ml: -4 }}
          onClick={handleOTPVerificationGoBack}
        >
          <ArrowBackIcon sx={{ color: "#fff", fontSize: "28px" }} />
        </IconButton>
        <Logo />
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
              mb: 1,
            }}
          >
            Please enter the OTP
          </Typography>
        </Box>
        <OtpInput value={emailOTP} onChange={setEmailOTP} />
        <ButtonPrimary
          disabled={isVerifying}
          startIcon={
            isVerifying ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : null
          }
          sx={{
            width: "100%",
            fontSize: "2rem",
            textTransform: "uppercase",
            letterSpacing: "3px",
            display: "flex",
            justifyContent: "center",
            p: theme.spacing(1, 0),
          }}
          type="submit"
        >
          validate
        </ButtonPrimary>
        <ResendOTP onClick={onResend} isLoading={isForgetting} />
      </Paper>
    </form>
  );
};

export default EnterOTP;
