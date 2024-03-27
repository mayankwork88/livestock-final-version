import React from "react";
import Logo from "./Logo";
import toast from "react-hot-toast";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import OtpInput from "./OTPInput";
import ResendOTP from "./Resend";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuthContext from "../../hooks/useAuth";
import useVerifyOTP from "./hooks/useVerifyOTP";
import useSignup from "./hooks/useSignup";

const OTPVerification = () => {
  const {
    handleOTPVerificationGoBack,
    emailOTP,
    setEmailOTP,
    onUserSignUp,
    onSignUpComplete,
    handleResendOTP,
  } = useAuthContext();
  const theme = useTheme();

  const { isVerifying, verifyOTP } = useVerifyOTP();
  const { isSigning, signUp } = useSignup();

  const onOTPSubmit = () => {
    const body = {
      email: onUserSignUp?.email,
      otp: Number(emailOTP),
    };
    if (emailOTP?.length === 6) {
      verifyOTP(body, {
        onSuccess: (data) => {
          if (data?.status === 200) {
            onSignUpComplete(data);
          }
        },
      });
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  const onResend = () => {
    const body = {
      name: onUserSignUp?.fullName,
      email: onUserSignUp?.email,
      countryCode: "91",
      phone: onUserSignUp?.phone,
      password: onUserSignUp?.password,
    };

    signUp(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleResendOTP();
        }
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onOTPSubmit();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Paper
        elevation={4}
        sx={{
          minWidth: 600,
          maxWidth: 700,
          minHeight: 460,
          p: theme.spacing(4, 5),
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
            Please enter the OTP to verify your account
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              mt: "0",
              textAlign: "center",
            }}
          >
            we have sent you one time password on your Email
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "90%" }}>
          <OtpInput value={emailOTP} onChange={setEmailOTP} />
        </Box>
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
        <ResendOTP onClick={onResend} isLoading={isSigning} />
      </Paper>
    </form>
  );
};

export default OTPVerification;
