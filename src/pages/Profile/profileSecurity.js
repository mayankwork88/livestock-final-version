import { Stack, Box, TextField, Button } from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { securityProfileSchema } from "../../utils/validationSchema";
import useProfileContext from "../../hooks/useProfileContext";
import CustomTextField from "../Authentication/ui/CustomTextField";
import { useState } from "react";
import { Spinner } from "../../ComponentsV2";

const common = {
  fontSize: "1.5rem",
  letterSpacing: 0.5,
  textTransform: "capitalize",
  fontWeight: 600,
  margin: "10px 0",
  padding: "10px 20px",
  borderRadius: "10px",
  "&:hover": {
    background: "#C6A580",
    color: "#fff",
  },
};

const ButtonPrimary = styled(Button)({
  ...common,
  background: "#B58B5D",
});

const ProfileSecurity = () => {
  const {
    changePassword,
    handlePasswordChange,
    handlePasswordEdit,
    openBackdropLoader,
  } = useProfileContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(securityProfileSchema) });

  return (
    <Stack width="100%">
      <TypographyPrimary sx={{ fontSize: "2rem" }}>
        Change Password
      </TypographyPrimary>
      <form onSubmit={handleSubmit(handlePasswordEdit)}>
        <Stack gap={2} p="20px 0">
          <Box display="flex" gap={2}>
            <CustomTextField
              placeholder={"Current Password"}
              name={"currentPassword"}
              label={"Current Password"}
              value={changePassword?.currentPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onInputChange={handlePasswordChange}
              register={register}
              errors={errors}
            />
            <CustomTextField
              placeholder={"New Password"}
              name={"newPassword"}
              label={"New Password"}
              value={changePassword?.newPassword}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              onInputChange={handlePasswordChange}
              register={register}
              errors={errors}
            />

            <CustomTextField
              placeholder={"Confirm Password"}
              name={"confirmPassword"}
              label={"Confirm Password"}
              value={changePassword?.confirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              onInputChange={handlePasswordChange}
              register={register}
              errors={errors}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonPrimary
              variant="contained"
              type="submit"
              disabled={openBackdropLoader}
              startIcon={
                openBackdropLoader ? (
                  <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
                ) : null
              }
            >
              Change Password
            </ButtonPrimary>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default ProfileSecurity;
