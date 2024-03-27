import {
  Stack,
  TextField,
  Box,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import { styled } from "@mui/system";
import ProfileSkeleton from "../../../../pages/Profile/ProfileSkeleton";
import useGetProfile from "../../../../hooks/Profile/useGetProfile";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useDeleteUser from "../hooks/useDeleteUser";

const common = {
  fontSize: "1.5rem",
  letterSpacing: 0.5,
  textTransform: "capitalize",
  fontWeight: 600,
  margin: "10px 0",
  padding: "10px 20px",
  borderRadius: "10px",
};

const ButtonOutlined = styled(Button)({
  ...common,
  color: "#B58B5D",
  marginRight: "10px",
  borderColor: "#B58B5D",
  "&:hover": {
    background: "#fff",
    borderColor: "red",
    color: "red",
  },
});

const UserDetailsAdmin = () => {
  const { id } = useParams();
  const { isLoading, isFetching, error, profile } = useGetProfile(id);
  const { isDeleting, deleteUser } = useDeleteUser();

  if (error) {
    toast.error(error?.message);
  }

  const getTextFiled = (label, name, value, type, disable, inputLoading) => {
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
        value={value}
        name={name}
        InputProps={{
          endAdornment: inputLoading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
        placeholder={`Please Enter your ${label}`}
        multiline={type === "textArea" ? true : false}
        rows={type === "textArea" ? 5 : 2}
        maxRows={type === "textArea" ? 11 : 2}
      />
    );
  };

  const handleAccountDelete = () => {
    deleteUser(id);
  };

  return (
    <Stack width="100%">
      <TypographyPrimary sx={{ fontSize: "2rem" }}>Profile</TypographyPrimary>
      {isLoading || isFetching ? (
        <ProfileSkeleton />
      ) : (
        <form>
          <Stack>
            <Stack
              gap={3}
              p="30px 20px"
              borderRadius={"10px"}
              border="1px solid #dddddd"
            >
              <Box display="flex" gap={5}>
                {getTextFiled(
                  "Full Name",
                  "fullName",
                  profile.fullName,
                  "textField",
                  true
                )}
                {getTextFiled("Email", "email", profile?.email, "email", true)}
              </Box>
              <Box display="flex" gap={5}>
                {getTextFiled(
                  "Phone Number",
                  "phoneNumber",
                  profile?.phoneNumber,
                  "number",
                  true
                )}
                {getTextFiled(
                  "Pincode",
                  "pincode",
                  profile?.pincode,
                  "number",
                  true
                )}
              </Box>
              <Box display="flex" gap={5}>
                <Box width="100%" display="flex" flexWrap="wrap">
                  {getTextFiled(
                    "Full Address",
                    "address",
                    profile?.address,
                    "textArea",
                    true
                  )}
                </Box>
                <Box width="100%" display="flex" flexWrap="wrap" gap={3}>
                  {getTextFiled(
                    "State",
                    "state",
                    profile?.state,
                    "textField",
                    true
                  )}
                  {getTextFiled(
                    "Country",
                    "country",
                    profile?.country,
                    "textField",
                    true
                  )}
                </Box>
              </Box>
            </Stack>
            <Box display="flex" justifyContent="flex-end" mt={5}>
              <ButtonOutlined
                variant="outlined"
                disabled={isDeleting}
                color="error"
                sx={{ minWidth: "100px" }}
                onClick={handleAccountDelete}
              >
                Delete Profile
              </ButtonOutlined>
            </Box>
          </Stack>
        </form>
      )}
    </Stack>
  );
};

export default UserDetailsAdmin;
