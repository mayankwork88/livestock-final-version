import { Box, Stack } from "@mui/material";
import { CustomInput } from "../../../ComponentsV2";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonPrimaryRound,
  ButtonOutlinedRound,
  LoadingBtn,
  TypographyWithBg,
} from "../../../ComponentsV2/themeComponents";
import { useForm } from "react-hook-form";
import { useUserManagementContext } from "./context/UserManagementContext";
import { userSchema } from "./utils/SchemaValidations";
import useCreateUser from "./hooks/useCreateUser";

const AddUserContent = () => {
  const { addNewUser, handleAddNewUserChange, handleAddUserModalCancel, setAddUserModal } =
    useUserManagementContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const { isCreating, createNewUser } = useCreateUser();

  const onSubmit = () => {
    const data = {
      name: addNewUser?.username,
      email: addNewUser?.email,
      phone: addNewUser?.mobile,
      countryCode: "91",
    };
    createNewUser(data, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setAddUserModal(false)
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TypographyWithBg id="modal-modal-title" variant="h6" component="h2">
          Add User
        </TypographyWithBg>
        <Stack>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CustomInput
              label="Username"
              register={register}
              errors={errors}
              value={addNewUser?.username}
              name="username"
              isError={{ error: false, message: "" }}
              onChange={handleAddNewUserChange}
            />
            <CustomInput
              label="Email"
              register={register}
              errors={errors}
              value={addNewUser?.email}
              name="email"
              isError={{ error: false, message: "" }}
              onChange={handleAddNewUserChange}
            />
          </Box>
          <CustomInput
            label="Mobile"
            register={register}
            errors={errors}
            value={addNewUser?.mobile}
            name="mobile"
            isError={{ error: false, message: "" }}
            onChange={handleAddNewUserChange}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "right",
              p: 2,
            }}
          >
            <ButtonOutlinedRound
              variant="outlined"
              size="large"
              onClick={handleAddUserModalCancel}
            >
              Cancel
            </ButtonOutlinedRound>
            {isCreating ? (
              <LoadingBtn
                loading
                type="submit"
                variant="contained"
                size="large"
              >
                Save
              </LoadingBtn>
            ) : (
              <ButtonPrimaryRound
                variant="contained"
                size="large"
                type="submit"
              >
                Save
              </ButtonPrimaryRound>
            )}
          </Box>
        </Stack>
      </Box>
    </form>
  );
};

export default AddUserContent;
