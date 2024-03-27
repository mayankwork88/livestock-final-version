import React, { useEffect } from "react";
import { Paper, Stack, Box, CircularProgress } from "@mui/material";
import { ButtonPrimary } from "../../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "../../../utils/validationSchema";
import "../index.css";
import { useState } from "react";
import Logo from "../Logo";
import useAuthContext from "../../../hooks/useAuth";
import CustomTextField from "../ui/CustomTextField";
import useChangePassword from "../hooks/useChangePassword";

const EnterNewPassword = () => {
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const theme = useTheme();
  const { setForgetPassword, forgetEmail } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isChanging, changePassword } = useChangePassword();

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPassword) });

  const onSubmit = () => {
    const body = {
      newPassword: newPassword?.newPassword,
      confmPassword: newPassword?.confirmPassword,
      email: forgetEmail,
    };
    changePassword(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          localStorage.removeItem("forgetEmailAuth");
          setForgetPassword(0);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Logo />
        <Stack width={"100%"} gap={theme.spacing(2)}>
          <CustomTextField
            variant="filled"
            placeholder={"New Password"}
            name={"newPassword"}
            label={"New Password"}
            value={newPassword?.newPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onInputChange={onChange}
            register={register}
            errors={errors}
          />
          <CustomTextField
            variant="filled"
            placeholder={"Confirm Password"}
            name={"confirmPassword"}
            label={"confirm password"}
            value={newPassword.confirmPassword}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            onInputChange={onChange}
            register={register}
            errors={errors}
          />
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <ButtonPrimary
            disabled={isChanging}
            startIcon={
              isChanging ? (
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
            submit
          </ButtonPrimary>
        </Box>
      </Paper>
    </form>
  );
};

export default EnterNewPassword;
