import { Button, Paper, Stack } from "@mui/material";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import { Spinner } from "../../../../ComponentsV2";

const DryingDateContent = ({ onClose, onSubmit, isUpdating, dryingDate }) => {
  const [selectedDate, setSelectedDate] = useState(() =>
    dryingDate ? new Date(dryingDate) : new Date()
  );
  return (
    <Stack
      sx={{
        background: "#fff",
        width: "100%",
        position: "relative",
        p: 2,
        pt: 0,
      }}
    >
      <TypographyPrimary sx={{ fontSize: "20px" }}>
        Select Drying Date
      </TypographyPrimary>
      <Stack
        sx={{
          height: "330px",
          position: "absolute",
          width: "335px",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Calendar
          date={selectedDate}
          onChange={setSelectedDate}
          className="calendarElement"
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        gap={2}
        p={3}
        px={2}
        pt={1}
        pb={1}
        marginTop={"330px"}
      >
        <Button
          variant="outlined"
          sx={{ fontSize: "16px", minWidth: "130px" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdating}
          startIcon={
            isUpdating ? (
              <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
            ) : null
          }
          variant="contained"
          sx={{ fontSize: "16px", minWidth: "130px" }}
          onClick={() => onSubmit(selectedDate)}
        >
          submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default DryingDateContent;
