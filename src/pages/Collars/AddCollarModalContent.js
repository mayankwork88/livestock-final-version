import { Box, Stack } from "@mui/material";
import { CustomInput, InfoPane } from "../../ComponentsV2";
import {
  ButtonPrimaryRound,
  ButtonOutlinedRound,
  LoadingBtn,
  TypographyWithBg,
} from "../../ComponentsV2/themeComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCollarValidationSchema } from "../../utils/validationSchema";
import useCollarContext from "../../hooks/useCollarContext";

const AddCollarModalContent = () => {
  const {
    handleAddCollarChange,
    handleAddCollar,
    newCollar,
    isError,
    handleAddCollarModalClose,
    isLoading,
  } = useCollarContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCollarValidationSchema)});

  const onSubmit = () => handleAddCollar("collar")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TypographyWithBg id="modal-modal-title" variant="h6" component="h2">
          Add Collar
        </TypographyWithBg>
        <Stack>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <CustomInput
              label="collar UID"
              register={register}
              errors={errors}
              value={newCollar?.collarUID}
              name="collarUID"
              isError={
                isError.message.toLowerCase().includes("uid")
                  ? isError
                  : { error: false, message: "" }
              }
              onChange={handleAddCollarChange}
            />
            <CustomInput
              label="collar name"
              register={register}
              errors={errors}
              value={newCollar?.collarName}
              name="collarName"
              isError={{ error: false, message: "" }}
              onChange={handleAddCollarChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CustomInput
              label="collar MAC ID"
              register={register}
              errors={errors}
              value={newCollar?.collarMacId}
              name="collarMacId"
              type="number"
              isError={
                isError.message.toLowerCase().includes("macid")
                  ? isError
                  : { error: false, message: "" }
              }
              onChange={handleAddCollarChange}
            />
          </Box>
          <InfoPane message="Scan QR code on collar to get mac id" />
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
              onClick={handleAddCollarModalClose}
            >
              Cancel
            </ButtonOutlinedRound>
            {isLoading ? (
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
                type="submit"
                loading={true}
                variant="contained"
                size="large"
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

export default AddCollarModalContent;
