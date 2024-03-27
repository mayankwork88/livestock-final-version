import {
  InputLabel,
  Stack,
  TextField,
  Box,
  Alert,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TypographyWithBg } from "../../../../ComponentsV2/themeComponents";
import { motion } from "framer-motion";
import { DatePicker, Spinner } from "../../../../ComponentsV2";
import { CloseIcon } from "../../../../icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aiAttemptSchema } from "../../../../utils/validationSchema";
import useDateFormat from "../../../../hooks/useDateFormat";
import useAddNewAttempt from "./hooks/useAddNewAttempt";
import { useParams } from "react-router-dom";
import useUpdateAttempt from "./hooks/useUpdateAttempt";

const resultAnim = {
  start: {
    flexGrow: 1,
    width: "50%",
    cursor: "pointer",
    transition: { duration: 0.5 },
  },
  active: { width: "100%", transition: { duration: 0.5 } },
  inactiveFail: { width: "0%", x: "100vw", transition: { duration: 0.5 } },
  inactivePass: { width: "0%", x: "-100vw", transition: { duration: 0.5 } },
};

const AddAiAttempt = ({ onClose, type, selectedAttempt }) => {
  const { id } = useParams();
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newAttempt, setNewAttempt] = useState({
    aiAttemptNo: null,
    sireNo: null,
  });
  const { paginationDateFormat } = useDateFormat();
  const { isAdding, addNewAiAttempt } = useAddNewAttempt(id);
  const { isUpdating, updateAiAttempt } = useUpdateAttempt(
    selectedAttempt?._id,
    id
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(aiAttemptSchema) });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAttempt({ ...newAttempt, [name]: value });
  };

  const handleAddNewAttempt = () => {
    const body = {
      ...newAttempt,
      attemptDate: paginationDateFormat(selectedDate),
      result: selectedResult,
    };

    if (type === "add") {
      addNewAiAttempt(body, {
        onSuccess: (data) => {
          if (data?.status === 200) {
            onClose();
          }
        },
      });
    } else if (type === "update") {
      updateAiAttempt(body, {
        onSuccess: (data) => {
          if (data?.status === 200) {
            onClose();
          }
        },
      });
    }
  };

  const isNotAdd = type !== "add";
  const isView = type === "view";

  useEffect(() => {
    if (isNotAdd) {
      setValue("aiAttemptNo", selectedAttempt?.aiAttemptNo);
      setValue("sireNo", selectedAttempt?.sireNo);

      setNewAttempt({
        aiAttemptNo: selectedAttempt?.aiAttemptNo,
        sireNo: selectedAttempt?.sireNo,
      });
      setSelectedDate(selectedAttempt?.attemptDate);
      if (selectedAttempt?.result?.toLowerCase() !== "pending")
        setSelectedResult(selectedAttempt?.result?.toLowerCase());
    }
  }, [type]);

  return (
    <form onSubmit={handleSubmit(handleAddNewAttempt)}>
      <Stack>
        <TypographyWithBg
          variant="h6"
          component="h2"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Add New AI Attempt
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: "2rem", color: "#fff" }} />
          </IconButton>
        </TypographyWithBg>
        <Stack p={2}>
          <Stack direction={"row"} width={"100%"}>
            <Box p={1} sx={{ flexGrow: 1 }}>
              <InputLabel sx={{ mb: 1, color: "#222", fontWeight: "bold" }}>
                Name of Attempt
              </InputLabel>
              <TextField
                fullWidth
                disabled={isView}
                placeholder="Name of Attempt"
                name="aiAttemptNo"
                value={newAttempt.aiAttemptNo}
                {...register?.("aiAttemptNo", { required: true })}
                onChange={handleChange}
                error={errors?.["aiAttemptNo"] ? true : false}
                helperText={errors?.["aiAttemptNo"]?.message}
              />
            </Box>
            <Box p={1} sx={{ flexGrow: 1 }}>
              <InputLabel sx={{ mb: 1, color: "#222", fontWeight: "bold" }}>
                Sire Number
              </InputLabel>
              <TextField
                fullWidth
                disabled={isView}
                placeholder="Sire Number"
                name="sireNo"
                value={newAttempt?.sireNo}
                {...register?.("sireNo", { required: true })}
                onChange={handleChange}
                error={errors?.["sireNo"] ? true : false}
                helperText={errors?.["sireNo"]?.message}
              />
            </Box>
          </Stack>
          <Stack direction={"row"} width={"100%"}>
            <Box p={1} sx={{ flexGrow: 1, width: "50%" }}>
              <InputLabel sx={{ mb: 1, color: "#222", fontWeight: "bold" }}>
                Date of Attempt
              </InputLabel>
              <DatePicker
                activeFull={true}
                disabled={isView}
                top="55px"
                left="350px"
                allowFutureDate={true}
                selectedDate={
                  selectedDate?.toString()?.toLowerCase()?.includes("gmt")
                    ? selectedDate
                    : new Date(selectedDate)
                }
                setSelectedDate={setSelectedDate}
              />
            </Box>
            <Box p={1} sx={{ flexGrow: 1, width: "50%" }}>
              <InputLabel sx={{ mb: 1, color: "#222", fontWeight: "bold" }}>
                Result
              </InputLabel>
              <Box
                display={"flex"}
                gap={selectedResult ? 0 : 2}
                sx={{ height: "6vh" }}
              >
                <motion.div
                  variants={resultAnim}
                  initial={"start"}
                  animate={
                    selectedResult === "success"
                      ? "active"
                      : selectedResult === "fail"
                      ? "inactivePass"
                      : "start"
                  }
                >
                  <Alert
                    variant="filled"
                    severity="success"
                    onClick={() => setSelectedResult("success")}
                  >
                    <Typography sx={{ fontSize: "18px" }}>
                      {selectedResult === "success" ? "Passed" : "Pass"}
                    </Typography>
                  </Alert>
                </motion.div>
                <motion.div
                  variants={resultAnim}
                  initial={"start"}
                  animate={
                    selectedResult === "fail"
                      ? "active"
                      : selectedResult === "success"
                      ? "inactiveFail"
                      : "start"
                  }
                >
                  <Alert
                    variant="filled"
                    severity="error"
                    onClick={() => setSelectedResult("fail")}
                  >
                    <Typography sx={{ fontSize: "18px" }}>
                      {selectedResult === "fail" ? "Failed" : "Fail"}
                    </Typography>
                  </Alert>
                </motion.div>
              </Box>
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
              disabled={isAdding || isUpdating}
              startIcon={
                isAdding || isUpdating ? (
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

export default AddAiAttempt;
