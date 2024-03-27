import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TypographyWithBg } from "../../../../ComponentsV2/themeComponents";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import { DatePicker, Spinner } from "../../../../ComponentsV2";
import { CloseIcon } from "../../../../icons";
import useAddMilkEntry from "./hooks/useAddMilkEntry";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { milkEntrySchema } from "../../../../utils/validationSchema";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";

const initialState = {
  entryQuantity: null,
  entryDate: "",
  snf: "",
  density: "",
  addedWater: "",
  lactose: "",
  protein: "",
};

const AddNewMilkEntry = ({ onClose, isView, data }) => {
  const { id } = useParams();
  const {paginationDateFormat} = useDateFormat();
  const [newEntry, setNewEntry] = useState(initialState);
  const { isAdding, addMilkEntry } = useAddMilkEntry(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(milkEntrySchema) });

  useEffect(() => {
    if (isView) {
      const entry = {
        entryQuantity: data?.entryQuantity,
        entryDate: data?.entryDate,
        snf: data?.snf,
        density: data?.density,
        addedWater: data?.addedWater,
        lactose: data?.lactose,
        protein: data?.protein,
      };
      setNewEntry(entry);
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddNewEntry = () => {
    addMilkEntry({...newEntry, entryDate:paginationDateFormat(newEntry?.entryDate)}, {
      onSuccess: (data) => {
        if (data.status === 200) {
          onClose();
        }
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(handleAddNewEntry)}>
      <Stack>
        <TypographyWithBg
          variant="h6"
          component="h2"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          New Milk Entry
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: "2rem", color: "#fff" }} />
          </IconButton>
        </TypographyWithBg>
        <Stack direction={"row"} p={2} gap={4}>
          <Stack width={"50%"} direction={"column"} gap={2}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Enter new milk Entry
            </Typography>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <CustomTextField
                disabled={isView}
                label={"Enter Quantity(Ltr)"}
                value={newEntry?.entryQuantity}
                name="entryQuantity"
                type="number"
                onInputChange={handleChange}
                register={register}
                errors={errors}
              />
              <DatePicker
                activeFull={true}
                disabled={isView}
                label="Select Date"
                InputProps={{ sx: { background: "#fff" } }}
                top="55px"
                left="350px"
                allowFutureDate={true}
                selectedDate={newEntry?.entryDate}
                setSelectedDate={(date) =>
                  handleChange({ target: { value: date, name: "entryDate" } })
                }
              />
            </Box>
          </Stack>
          <Stack width={"50%"} direction={"column"} gap={2}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Enter milk properties
            </Typography>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <CustomTextField
                disabled={isView}
                label={"SNF(%)"}
                value={newEntry?.snf}
                name="snf"
                onInputChange={handleChange}
              />
              <CustomTextField
                disabled={isView}
                label={"Density(g/cm3)"}
                value={newEntry?.density}
                name="density"
                onInputChange={handleChange}
              />
              <CustomTextField
                disabled={isView}
                label={"Added water(%)"}
                value={newEntry?.addedWater}
                name="addedWater"
                onInputChange={handleChange}
              />
              <CustomTextField
                disabled={isView}
                label={"Lactose(%)"}
                value={newEntry?.lactose}
                name="lactose"
                onInputChange={handleChange}
              />
              <CustomTextField
                disabled={isView}
                label={"Protein(%)"}
                value={newEntry?.protein}
                name="protein"
                onInputChange={handleChange}
              />
            </Box>
          </Stack>
        </Stack>
        {!isView && (
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            gap={2}
            p={3}
            px={2}
            pt={1}
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
        )}
      </Stack>
    </form>
  );
};

export default AddNewMilkEntry;
