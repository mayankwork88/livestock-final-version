import {
  Stack,
  TextField,
  Box,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showProfileSchema } from "../../utils/validationSchema";
import useProfileContext from "../../hooks/useProfileContext";
import { useEffect } from "react";
import ProfileSkeleton from "./ProfileSkeleton";

const common = {
  fontSize: "1.5rem",
  letterSpacing: 0.5,
  textTransform: "capitalize",
  fontWeight: 600,
  margin: "10px 0",
  padding: "10px 20px",
  borderRadius: "10px",
};

const ButtonPrimary = styled(Button)({
  ...common,
  background: "#B58B5D",
  "&:hover": {
    background: "#C6A580",
    color: "#fff",
  },
});

const ButtonOutlined = styled(Button)({
  ...common,
  color: "#B58B5D",
  marginRight: "10px",
  borderColor: "#B58B5D",
  "&:hover": {
    background: "#fff",
    borderColor: "#C6A580",
  },
});
const ShowProfile = ({ userId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(showProfileSchema) });

  const {
    editProfile,
    setEditProfile,
    pinCodeLoading,
    openBackdropLoader,
    showProfileData,
    handleProfileChange,
    handleProfileEdit,
    inputError,
    handleAccountDelete,
    setCancelProfileChanges,
  } = useProfileContext(userId);

  const getTextFiled = (
    label,
    name,
    value,
    type,
    disable,
    inputError,
    inputLoading
  ) => {
    return (
      <TextField
        fullWidth
        select={type === "select" ? true : false}
        id={name}
        label={label}
        type={type}
        disabled={disable}
        variant="outlined"
        size="large"
        sx={{ mr: 1 }}
        value={value ? value : ""}
        name={name}
        InputProps={{
          endAdornment: inputLoading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
        {...register(name, { required: true })}
        onChange={handleProfileChange}
        error={errors?.[name] || inputError?.error}
        helperText={errors?.[name]?.message || inputError?.errorMessage}
        placeholder={`Please Enter your ${label}`}
        multiline={type === "textArea" ? true : false}
        rows={type === "textArea" ? 5 : 2}
        maxRows={type === "textArea" ? 11 : 2}
      />
    );
  };

  useEffect(() => {
    setValue("pincode", showProfileData?.pincode);
    setValue("address", showProfileData?.address);
    setValue("email", showProfileData?.email);
    setValue("phoneNumber", showProfileData?.phoneNumber);
    setValue("fullName", showProfileData?.fullName);
  }, [showProfileData, pinCodeLoading]);

  const handleCancelChanges = () => {
    setEditProfile(true);
    setCancelProfileChanges((prev) => !prev);
  };

  const currentRole = Number(
    JSON.parse(window?.localStorage?.getItem("userData"))?.role
  );

  return (
    <Stack width="100%">
      <TypographyPrimary sx={{ fontSize: "2rem" }}>Profile</TypographyPrimary>
      {openBackdropLoader ? (
        <ProfileSkeleton />
      ) : (
        <form onSubmit={handleSubmit(handleProfileEdit)}>
          <Stack>
            <Stack
              gap={3}
              p="20px 15px"
              borderRadius={"10px"}
              border="1px solid #dddddd"
            >
              <Box display="flex" gap={3}>
                {getTextFiled(
                  "Full Name",
                  "fullName",
                  showProfileData.fullName,
                  "textField",
                  editProfile
                )}
                {getTextFiled(
                  "Email",
                  "email",
                  showProfileData?.email,
                  "email",
                  true
                )}
              </Box>
              <Box display="flex" justifyContent={'space-between'} gap={3}>
                <Box width="48.7%">
                {getTextFiled(
                  "Phone Number",
                  "phoneNumber",
                  showProfileData?.phoneNumber,
                  "number",
                  true
                )}
                </Box>
                <Box width="49.1%" display={'flex'} gap={3}>
                {getTextFiled(
                  "Pincode",
                  "pincode",
                  showProfileData?.pincode,
                  "number",
                  editProfile,
                  inputError,
                  pinCodeLoading
                )}
                {getTextFiled(
                  "City",
                  "city",
                  showProfileData?.city,
                  "text",
                  true,
                )}
                </Box>
              </Box>
              <Box display="flex" gap={3}>
                <Box width="100%" display="flex" flexWrap="wrap">
                  {getTextFiled(
                    "Full Address",
                    "address",
                    showProfileData?.address,
                    "textArea",
                    editProfile
                  )}
                </Box>
                <Box width="100%" display="flex" flexWrap="wrap" gap={3}>
                  {getTextFiled(
                    "State",
                    "state",
                    showProfileData?.state,
                    "textField",
                    true
                  )}
                  {getTextFiled(
                    "Country",
                    "country",
                    showProfileData?.country,
                    "textField",
                    true
                  )}
                </Box>
              </Box>
            </Stack>
            <Box display="flex" justifyContent="flex-end" mt={5}>
              {editProfile ? (
                <>
                  {currentRole != 1 && (
                    <ButtonOutlined
                      variant="outlined"
                      sx={{ minWidth: "100px" }}
                      onClick={handleAccountDelete}
                    >
                      Delete Profile
                    </ButtonOutlined>
                  )}

                  <ButtonPrimary
                    variant="contained"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditProfile(false);
                    }}
                  >
                    Edit Profile
                  </ButtonPrimary>
                </>
              ) : (
                <>
                  <ButtonOutlined
                    variant="outlined"
                    sx={{ minWidth: "100px" }}
                    onClick={handleCancelChanges}
                  >
                    Cancel Changes
                  </ButtonOutlined>
                  <ButtonPrimary variant="contained" type="submit">
                    Save Changes
                  </ButtonPrimary>
                </>
              )}
            </Box>
          </Stack>
        </form>
      )}
    </Stack>
  );
};

export default ShowProfile;
