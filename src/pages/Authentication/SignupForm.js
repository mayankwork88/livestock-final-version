import React, { useEffect } from "react";
import { Paper, Stack, Typography, Box, CircularProgress } from "@mui/material";
import Logo from "./Logo";
import { BtnGroup } from "../../ComponentsV2";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validationSchema";
import { btnData } from "./Data";
import "./index.css";
import { useState } from "react";
import useSignup from "./hooks/useSignup";
import useAuthContext from "../../hooks/useAuth";
import CustomTextField from "./ui/CustomTextField";

const SignupForm = ({
  setShowAnim,
  isLogin,
  handleUserSignUpCredentialChange,
  onUserSignUp,
}) => {
  const theme = useTheme();
  const schema = signUpSchema;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { setOTPVerification, resendTimer } = useAuthContext();

  const { isSigning, signUp } = useSignup();

  useEffect(() => {
    setValue("fullName", onUserSignUp?.fullName);
    setValue("email", onUserSignUp?.email);
    setValue("password", onUserSignUp?.password);
    setValue("phone", onUserSignUp?.phone);
  }, [onUserSignUp]);

  // const submit = handleUserSignUpSubmit;
  const change = handleUserSignUpCredentialChange;

  const onSubmit = () => {
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
          setOTPVerification(true);
          resendTimer();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={4}
        sx={{
          minWidth: 600,
          minHeight: 460,
          p: theme.spacing(4, 5),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
          backgroundColor: `rgba(0,0,0,0.2)`,
          backdropFilter: "blur(5px)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%)`,
        }}
      >
        <BtnGroup
          btnData={btnData}
          activeBtn={isLogin}
          onChange={setShowAnim}
        />
        <Logo />
        <Stack width={"100%"} gap={theme.spacing(2)}>
          <>
            <Stack direction="row" gap={2}>
              <CustomTextField
                variant="filled"
                placeholder={"Full Name"}
                name={"fullName"}
                label={"Full Name"}
                value={onUserSignUp?.fullName}
                onInputChange={change}
                register={register}
                errors={errors}
              />
              <CustomTextField
                variant="filled"
                placeholder={"Enter Email"}
                name={"email"}
                label={"Email"}
                value={onUserSignUp?.email}
                onInputChange={change}
                register={register}
                errors={errors}
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <CustomTextField
                variant="filled"
                placeholder={"Phone"}
                name={"phone"}
                label={"phone"}
                value={onUserSignUp?.phone}
                onInputChange={change}
                register={register}
                errors={errors}
              />
              <CustomTextField
                variant="filled"
                placeholder={"Enter Password"}
                name={"password"}
                label={"password"}
                value={onUserSignUp?.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onInputChange={change}
                register={register}
                errors={errors}
              />
            </Stack>
          </>
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <ButtonPrimary
            disabled={isSigning}
            startIcon={
              isSigning ? (
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
            get started
          </ButtonPrimary>
          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={theme.spacing(0.5)}
          >
            <Typography variant="h6" component="h2" sx={{ color: "#fff" }}>
              Already have an account?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
              }}
              component="span"
              onClick={() => {
                setShowAnim("log in");
              }}
            >
              Sign in
            </Typography>
          </Box>
        </Box>
      </Paper>
    </form>
  );
};

export default SignupForm;
