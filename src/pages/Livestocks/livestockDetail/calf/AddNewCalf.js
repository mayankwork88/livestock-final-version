import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { TypographyWithBg } from "../../../../ComponentsV2/themeComponents";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomInput,
  CustomTimePicker,
  DatePicker,
  Spinner,
} from "../../../../ComponentsV2";
import { CloseIcon } from "../../../../icons";
import { calfSchema } from "../../../../utils/validationSchema";
import useAddCalf from "./hooks/useAddCalf";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";
import dayjs from "dayjs";

const calf = {
  name: "",
  uID: "",
  dob: new Date(),
  birthTime: new Date(),
  gender: "",
  birthWeight: "",
  sireNo: "",
  genoType: "",
  color: "",
  calvingType: "",
};

const AddNewCalf = ({ onClose }) => {
  const { id } = useParams();
  const { formattedDate, paginationDateFormat } = useDateFormat();
  const [newCalf, setNewCalf] = useState(calf);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(calfSchema) });

  const { isAdding, addNewCalf } = useAddCalf(id);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewCalf({ ...newCalf, [name]: value });
  };

  const handleFormSubmit = () => {
    const data = {
      ...newCalf,
      dob: paginationDateFormat(newCalf?.dob),
      birthTime: newCalf?.birthTime,
    };
    addNewCalf(data, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          onClose();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: "100%" }}>
      <Stack>
        <TypographyWithBg
          variant="h6"
          component="h2"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Add Calf
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: "2rem", color: "#fff" }} />
          </IconButton>
        </TypographyWithBg>
        <Stack direction={"column"} p={3} gap={2}>
          <Box display={"flex"} gap={2}>
            <CustomTextField
              label={"Name"}
              value={newCalf.name}
              name="name"
              onInputChange={handleChange}
              register={register}
              errors={errors}
            />
            <CustomTextField
              label={"UID"}
              value={newCalf?.uID}
              name="uID"
              onInputChange={handleChange}
              register={register}
              errors={errors}
            />
          </Box>
          <Box display={"flex"} gap={2}>
            <Box sx={{ width: "50%", display: "flex", alignItems: "flex-end" }}>
              <DatePicker
                activeFull={true}
                label="DOB"
                adornment="endAdornment"
                InputProps={{ sx: { background: "#fff" } }}
                top="55px"
                left="350px"
                selectedDate={newCalf?.dob}
                allowFutureDate={true}
                setSelectedDate={(date) =>
                  handleChange({ target: { value: date, name: "dob" } })
                }
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <CustomTimePicker
                label={"Time of birth"}
                value={dayjs(newCalf?.birthTime)}
                sx={{ background: "#fff" }}
                onChange={(time) =>
                  handleChange({ target: { value: time, name: "birthTime" } })
                }
              />
            </Box>
          </Box>
          <Box display={"flex"} gap={2}>
            <Box sx={{ width: "50%", display: "flex", alignItems: "flex-end" }}>
              <CustomInput
                removePadding={true}
                sx={{ m: 0 }}
                name="gender"
                label={"Gender"}
                select={true}
                selectData={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                value={newCalf?.gender}
                onChange={handleChange}
                register={register}
                errors={errors}
              />
            </Box>
            <Box sx={{ width: "50%", display: "flex", alignItems: "flex-end" }}>
              <CustomTextField
                label={"Birth weight(kg)"}
                value={newCalf?.birthWeight}
                name="birthWeight"
                onInputChange={handleChange}
                register={register}
                errors={errors}
              />
            </Box>
          </Box>
          <Box display={"flex"} gap={2}>
            <CustomTextField
              label={"Sire No."}
              value={newCalf?.sireNo}
              name="sireNo"
              onInputChange={handleChange}
              register={register}
              errors={errors}
            />
            <CustomTextField
              label={"genotype"}
              value={newCalf?.genoType}
              name="genoType"
              onInputChange={handleChange}
              register={register}
              errors={errors}
            />
          </Box>
          <Box display={"flex"} gap={2}>
            <CustomTextField
              label={"color"}
              value={newCalf?.color}
              name="color"
              onInputChange={handleChange}
              register={register}
              errors={errors}
            />
            <CustomTextField
              label={"Calving Type"}
              value={newCalf?.calvingType}
              name="calvingType"
              onInputChange={handleChange}
              register={register}
              errors={errors}
            />
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            gap={2}
            pt={1}
            px={0}
          >
            <Button
              variant="outlined"
              sx={{ fontSize: "16px", minWidth: "130px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isAdding}
              startIcon={
                isAdding ? (
                  <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
                ) : null
              }
              variant="contained"
              sx={{ fontSize: "16px", minWidth: "130px" }}
              type="submit"
            >
              submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddNewCalf;
