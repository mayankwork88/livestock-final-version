import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function CustomTimePicker({
  label,
  onChange,
  value,
  InputProps,
  disabled,
  sx,
}) {
  const [time, setTime] = React.useState(dayjs(value));
  const handleTimeChange = (e) => {
    setTime(e);
    onChange?.(e);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          disabled={disabled}
          sx={{ width: "100%", ...sx }}
          label={label}
          value={value}
          InputProps={InputProps}
          onChange={handleTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
