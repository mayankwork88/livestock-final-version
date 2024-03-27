import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";
import useDateFormat from "../hooks/useDateFormat";
import { CalendarMonthIcon, EditIcon } from "../icons";

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  activeFull,
  top,
  left,
  disabled = false,
  InputProps,
  adornment,
  label,
  maxDate,
  minDate,
  allowFutureDate = false,
}) => {
  const [open, setOpen] = useState(false);
  const calenderRef = useRef(null);
  const { paginationDateFormat } = useDateFormat();

  useEffect(() => {
    setSelectedDate(new Date(), "date");
  }, []);

  useEffect(() => {
    document?.addEventListener("click", handleClickOutsideTheCalender, true);
  }, []);

  const handleClickOutsideTheCalender = (e) => {
    if (calenderRef.current && !calenderRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setOpen(false);
  };
  return (
    <Stack sx={{ position: "relative", width: activeFull && "100%" }}>
      <Stack direction="row" gap={1}>
        {selectedDate ? (
          <TextField
            disabled={disabled}
            label={label}
            value={paginationDateFormat(selectedDate, "date")}
            placeholder="MM/DD/YYYY"
            size={activeFull ? "large" : "small"}
            sx={{ width: activeFull ? "100%" : 145 }}
            onClick={() => setOpen(!open)}
            InputProps={{
              ...InputProps,
              [adornment || "startAdornment"]: (
                <InputAdornment
                  position={adornment === "endAdornment" ? "end" : "start"}
                  style={{ cursor: disabled && "default" }}
                >
                  <CalendarMonthIcon
                    style={{
                      cursor: disabled && "default",
                      color: disabled && "rgba(0,0,0,0.2)",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        ) : null}
      </Stack>
      <Stack
        ref={calenderRef}
        sx={{
          position: "absolute",
          top: `${top || "55px"}`,
          left: `${left || "150px"}`,
          zIndex: "1000000",
        }}
      >
        {open && !disabled && (
          <Calendar
            onChange={handleSelect}
            date={selectedDate}
            className="calendarElement"
            minDate={minDate && addDays(new Date(), 0)}
            maxDate={
              allowFutureDate
                ? addDays(new Date(), 365 * 3)
                : !maxDate && addDays(new Date(), 0)
            }
          />
        )}
      </Stack>
    </Stack>
  );
};

export default DatePicker;
