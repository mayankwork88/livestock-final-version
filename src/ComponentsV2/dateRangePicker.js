import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";
import format from "date-fns/format";
import { CalendarMonthIcon } from "../icons";

export default function CustomDateRangePicker({
  selectedDate,
  setSelectedDate,
}) {
  const [showInput, setShowInput] = useState(false);
  const [stateSelectionRange, setStateSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 3),
    key: "compare",
  });

  const calenderRef = useRef(null);

  useEffect(() => {
    document?.addEventListener("click", handleClickOutsideTheCalender, true);
  }, []);

  const handleClickOutsideTheCalender = (e) => {
    if (calenderRef.current && !calenderRef.current.contains(e.target)) {
      setShowInput(false);
    }
  };

  return (
    <Stack sx={{ position: "relative" }}>
      <Stack direction="row" gap={1}>
        {selectedDate ? (
          <TextField
            size="small"
            sx={{ minWidth : 250 }}
            value={`${format(
              selectedDate[0]?.startDate,
              "MM/dd/yyyy"
            )} - ${format(selectedDate[0]?.endDate, "MM/dd/yyyy")}`}
            placeholder="MM/DD/YYYY"
            onClick={() => setShowInput(!showInput)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon />
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
          top: "45px",
          left: "235px",
          zIndex: "1000000",
        }}
      >
        {showInput ? (
          <DateRange
            className="calendarElement"
            onChange={(item) => setSelectedDate([item.selection])}
            showSelectionPreview={false}
            showPreview={false}
            moveRangeOnFirstSelection={true}
            months={1}
            maxDate={addDays(new Date(), 0)}
            direction="horizontal"
            scroll={{ enabled: true }}
            ranges={selectedDate}
          />
        ) : null}
      </Stack>
    </Stack>
  );
}
