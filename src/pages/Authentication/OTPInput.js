import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Stack } from "@mui/material";

const OtpInput = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    onChange?.(newValue);
  };

  const validateChar = (value, index) => {
    const num = Number(value);
    return typeof num === "number" ? (num === 0 ? "0" : num) : "";
  };

  return (
    <Stack direction={"column"} alignItems={"flex-end"} gap={2}>
      <MuiOtpInput
        length={6}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "#fff",
          },
          "& .MuiInputBase-root.MuiInputBase-input.MuiOutlinedInput-input": {
            color: "#000",
            position: "relative",
            zIndex: 10,
          },
        }}
        value={value}
        onChange={handleChange}
        TextFieldsProps={{ size: "large", placeholder: "-" }}
        InputProps={{
          sx: {},
        }}
        inputProps={{
          style: { "& .MuiTextField-root": { backgroundColor: "#fff" } },
        }}
        validateChar={validateChar}
      />
    </Stack>
  );
};

export default OtpInput;
