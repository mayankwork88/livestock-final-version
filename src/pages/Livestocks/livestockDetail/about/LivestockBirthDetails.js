import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import {
  DatePicker,
  Spinner,
  TabPane,
  CustomTimePicker,
} from "../../../../ComponentsV2";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import { livestockBirthDetails } from "../../../../utils/validationSchema";
import useUpdateBirthDetails from "./hooks/useUpdateBirthDetails";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";

const initialState = {
  dob: new Date(),
  timeOfBirth: new Date(),
  birthWeight: "",
  sireNo: "",
  damNo: "",
  color: "",
  horns: "",
  identifiedMark: "",
};

const LivestockBirthDetails = ({ livestockInfo, infoLoading }) => {
  const { id } = useParams();
  const { formattedDate } = useDateFormat();
  const [isEdit, setIsEdit] = useState(false);
  const [birthDetails, setBirthDetails] = useState(initialState);
  const { isUpdating, updateLivestockBirthDetails } = useUpdateBirthDetails(id);

  useEffect(() => {
    if (livestockInfo) {
      setValue("dob", livestockInfo?.dob);

      setBirthDetails({
        dob:
          livestockInfo?.dob?.toString()?.toLowerCase() === "n/a"
            ? new Date()
            : livestockInfo?.dob,
        timeOfBirth:
          livestockInfo?.timeOfBirth?.toLowerCase() === "n/a"
            ? new Date()
            : livestockInfo?.timeOfBirth,
        birthWeight: livestockInfo?.birthWeight,
        sireNo: livestockInfo?.sireNo,
        damNo: livestockInfo?.damNo,
        color: livestockInfo?.color,
        horns: livestockInfo?.horns,
        identifiedMark: livestockInfo?.identifiedMark,
      });
    }
  }, [infoLoading]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(livestockBirthDetails) });

  const handleChange = (e, name, value) => {
    if (e === "date") {
      setBirthDetails({ ...birthDetails, [name]: value });
    } else if (e === "time") {
      setBirthDetails({ ...birthDetails, [name]: value });
    } else {
      const { name, value } = e.target;
      setBirthDetails({ ...birthDetails, [name]: value });
    }
  };

  const handleFormSubmit = async () => {
    if (isEdit) {
      updateLivestockBirthDetails(
        { ...birthDetails, dobChange: true },
        {
          onSuccess: (data) => {
            if (data.status === 200) {
              setIsEdit((prev) => !prev);
            }
          },
        }
      );
    } else {
      setIsEdit((prev) => !prev);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: "100%" }}>
      <Stack
        width="100%"
        sx={{ background: "#F7F8FD", p: 2, borderRadius: "10px", gap: 1 }}
      >
        <TabPane
          text="Birth Details"
          loading={isUpdating}
          btnText={isEdit ? "Save" : "Edit"}
          btnIcon={
            isUpdating ? (
              <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
            ) : null
          }
          hover={true}
          type="submit"
        />
        <Stack direction={"column"} gap={2} height="100%">
          <DatePicker
            activeFull={true}
            disabled={!isEdit}
            label="Date of birth"
            adornment="endAdornment"
            InputProps={{ sx: { background: "#fff" } }}
            top="55px"
            left="350px"
            allowFutureDate={true}
            selectedDate={
              birthDetails?.dob?.toString()?.toLowerCase()?.includes("gmt")
                ? birthDetails?.dob
                : new Date(birthDetails?.dob)
            }
            setSelectedDate={(date) => handleChange("date", "dob", date)}
          />
          <CustomTimePicker
            disabled={!isEdit}
            label={"Time of birth"}
            value={dayjs(birthDetails?.timeOfBirth)}
            sx={{ background: "#fff" }}
            name="timeOfBirth"
            onChange={(time) => handleChange("time", "timeOfBirth", time)}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"Birth weight(kg)"}
            value={birthDetails?.birthWeight}
            name="birthWeight"
            onInputChange={handleChange}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"Sire No."}
            value={birthDetails?.sireNo}
            name="sireNo"
            onInputChange={handleChange}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"Dam No."}
            value={birthDetails?.damNo}
            name="damNo"
            onInputChange={handleChange}
          />
          <Box display={"flex"} gap={2}>
            <CustomTextField
              disabled={!isEdit}
              label={"Colour"}
              value={birthDetails?.color}
              name="color"
              onInputChange={handleChange}
            />
            <CustomTextField
              disabled={!isEdit}
              label={"Horns"}
              value={birthDetails?.horns}
              name="horns"
              onInputChange={handleChange}
            />
          </Box>
          <CustomTextField
            disabled={!isEdit}
            label={"Identification mark"}
            value={birthDetails?.identifiedMark}
            name="identifiedMark"
            onInputChange={handleChange}
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default LivestockBirthDetails;
