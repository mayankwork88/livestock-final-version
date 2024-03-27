import { Box, Stack, Typography } from "@mui/material";
import { CustomInput, DatePicker, ImageUpload } from "../../ComponentsV2";
import useLivestockContext from "../../hooks/useLivestockContext";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonPrimaryRound,
  ButtonOutlinedRound,
  LoadingBtn,
  TypographyWithBg,
  TypographyPrimary,
} from "../../ComponentsV2/themeComponents";
import { useForm } from "react-hook-form";
import { request } from "../../apis/axios-utils";
import { useState } from "react";
import { useEffect } from "react";
import { addLivestockValidationSchema } from "../../utils/validationSchema";
import { genderData } from "../Data";

const AddLivestockModalContent = () => {
  const {
    handleAddLivestockModalClose,
    addNewLivestock,
    handleAddLivestockChange,
    addNewLivestockLoading,
    handleAddLivestock,
    setLiveStockImage,
    isError,
  } = useLivestockContext();

  const [unassignCollars, setUnassignCollars] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addLivestockValidationSchema) });

  const getUnassignCollars = async () => {
    try {
      const res = await request({
        url: `/devices/getAll?status=false`,
      });
      if (res?.data?.statusCode === 200 && res?.data?.data) {
        const formattedData = res.data.data.map((ele) => ({
          id: ele?._id,
          label: ele?.uID,
          value: ele?._id,
          deviceType: ele?.deviceType,
        }));
        setUnassignCollars(formattedData);
      }
    } catch (error) {
      // alert(error.message)
    }
  };

  useEffect(() => {
    getUnassignCollars();
  }, []);

  const getDeviceFilteredData = (data, filter) => {
    return data?.filter(
      (ele) => ele?.deviceType?.toLowerCase() === filter?.toLowerCase()
    );
  };

  const getOneIsSelectedError = (error) => {
    const err = Object.values(error)?.find(
      (ele) => ele?.type === "one-is-selected"
    );
    if (err?.message) {
      return { error: true, message: err?.message };
    } else return { error: false, message: "" };
  };
  return (
    <form onSubmit={handleSubmit(handleAddLivestock)}>
      <Box>
        <TypographyWithBg id="modal-modal-title" variant="h6" component="h2">
          Add Livestock
        </TypographyWithBg>
        <Stack direction={'column'} justifyContent={'flex-start'}>
          <Box p={2} pb={0} mb={1}>
            <TypographyPrimary sx={{my:0,mb:1, fontSize:'16px'}}>Add Image</TypographyPrimary>
            <ImageUpload onUpload={setLiveStockImage} onCancel={() => setLiveStockImage(null)}/>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              m:0
            }}
          >
            <Box width={"50%"} display={"flex"} alignItems={"center"}>
              <CustomInput
                label="Gender"
                select
                selectData={genderData}
                register={register}
                errors={errors}
                value={addNewLivestock?.livestockGender}
                name="livestockGender"
                isError={{ error: false, message: "" }}
                onChange={handleAddLivestockChange}
              />
            </Box>
            <Box width={"50%"}  display={"flex"} alignItems={"center"} p={1.5}>
              <DatePicker
                activeFull={true}
                label="Date of birth"
                adornment="endAdornment"
                InputProps={{ sx: { background: "#fff" } }}
                top="55px"
                left="350px"
                allowFutureDate={true}
                selectedDate={addNewLivestock?.livestockDOB}
                setSelectedDate={(date) => ({target:{name:"livestockDOB", value:date}})}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: 0,
            }}
          >
            <CustomInput
              label="Collar"
              select
              selectData={getDeviceFilteredData(unassignCollars, "collar")}
              register={register}
              errors={errors}
              value={addNewLivestock?.collarUID}
              selectNoDataMsg="Please create/unassign a collar first"
              name="collarUID"
              isError={getOneIsSelectedError(errors)}
              onChange={handleAddLivestockChange}
            />
            <CustomInput
              label="Pedometer"
              select
              selectData={getDeviceFilteredData(unassignCollars, "pedometer")}
              register={register}
              errors={errors}
              value={addNewLivestock?.pedometerUID}
              name="pedometerUID"
              isError={getOneIsSelectedError(errors)}
              onChange={handleAddLivestockChange}
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
              label="Livestock UID"
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockUID}
              name="livestockUID"
              isError={isError}
              onChange={handleAddLivestockChange}
            />
            <CustomInput
              label="Livestock Name"
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockName}
              name="livestockName"
              isError={{ error: false, message: "" }}
              onChange={handleAddLivestockChange}
            />
          </Box>
          
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "right",
              p: 2,
              pt:1
            }}
          >
            <ButtonOutlinedRound
              variant="outlined"
              size="large"
              onClick={handleAddLivestockModalClose}
            >
              Cancel
            </ButtonOutlinedRound>
            {addNewLivestockLoading ? (
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

export default AddLivestockModalContent;
