import React, { useEffect } from "react";
import { Paper, Stack, Typography, Box, CircularProgress } from "@mui/material";
import { BtnGroup } from "../../ComponentsV2";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import { btnData } from "./Data";
import "./index.css";
import { useState } from "react";
import Logo from "./Logo";
import useAuthContext from "../../hooks/useAuth";
import CustomTextField from "./ui/CustomTextField";

const LoginForm = ({
  setShowAnim,
  isLogin,
  handleUserCredentialChange,
  handleUserLoginSubmit,
  onUserLogin,
  loginLoading,
}) => {
  const theme = useTheme();
  const { setForgetPassword } = useAuthContext();
  const schema = loginSchema;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = handleUserLoginSubmit;
  const change = handleUserCredentialChange;

  useEffect(() => {
    setValue("email", onUserLogin?.email);
    setValue("password", onUserLogin?.password);
  }, [onUserLogin]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Paper
        elevation={4}
        sx={{
          minWidth: 352,
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
        {/* <BtnGroup
          btnData={btnData}
          activeBtn={isLogin}
          onChange={setShowAnim}
        /> */}
        <Logo />
        <Stack width={"100%"} gap={theme.spacing(2)}>
          <CustomTextField
           variant="filled"
            placeholder={"Enter Email"}
            name={"email"}
            label={"Email"}
            value={onUserLogin?.email}
            onInputChange={change}
            register={register}
            errors={errors}
          />
          <CustomTextField
            placeholder={"Enter Password"}
            variant="filled"
            name={"password"}
            label={"password"}
            value={onUserLogin?.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onInputChange={change}
            register={register}
            errors={errors}
          />
          {/* <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              cursor: "pointer",
              marginLeft: "auto",
              color: "#fff",
            }}
            onClick={() => setForgetPassword(1)}
          >
            Forget password?
          </Typography> */}
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <ButtonPrimary
            disabled={loginLoading}
            startIcon={
              loginLoading ? (
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
            log in
          </ButtonPrimary>
          {/* <Box
            display={"flex"}
            justifyContent={"center"}
            gap={theme.spacing(0.5)}
          >
            <Typography variant="h6" component="h2" sx={{ color: "#fff" }}>
              Don't have an account?
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
                setShowAnim("sign up");
              }}
            >
              Sign up
            </Typography>
          </Box> */}
        </Box>
      </Paper>
    </form>
  );
};

export default LoginForm;
