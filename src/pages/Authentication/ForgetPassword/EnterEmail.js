import React, { useEffect } from "react";
import { Paper, Stack, Typography, Box, CircularProgress } from "@mui/material";
import { ButtonPrimary } from "../../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "../../../utils/validationSchema";
import "../index.css";
import Logo from "../Logo";
import useAuthContext from "../../../hooks/useAuth";
import CustomTextField from "../ui/CustomTextField";
import useForgetPassword from "../hooks/useForgetPassword";

const EnterEmail = ({}) => {
  const theme = useTheme();

  const { setForgetPassword, resendTimer, forgetEmail, setForgetEmail } =
    useAuthContext();
  const { isForgetting, forgetPassword } = useForgetPassword();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgetPasswordSchema) });

  useEffect(() => {
    setValue("email", forgetEmail);
  }, [forgetEmail]);

  const onSubmit = () => {
    const body = {
      email: forgetEmail,
    };
    forgetPassword(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          resendTimer();
          setForgetPassword(2);
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
          backdropFilter:'blur(5px)',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%)`,
        }}
      >
        <Logo />
        <Stack width={"100%"} gap={theme.spacing(1)}>
          <CustomTextField
           variant="filled"
            placeholder={"Enter Email"}
            name={"email"}
            label={"Email"}
            value={forgetEmail}
            onInputChange={(e) => setForgetEmail(e.target.value)}
            register={register}
            errors={errors}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              cursor: "pointer",
              marginLeft: "auto",
              color:'#fff'
            }}
            onClick={() => {
              setForgetPassword(0);
              setForgetEmail("");
            }}
          >
            Back to login
          </Typography>
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <ButtonPrimary
            disabled={isForgetting}
            startIcon={
              isForgetting ? (
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
            Get OTP
          </ButtonPrimary>
        </Box>
      </Paper>
    </form>
  );
};

export default EnterEmail;
