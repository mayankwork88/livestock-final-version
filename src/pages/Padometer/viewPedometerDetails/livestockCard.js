import React from "react";
import { Box, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";

const LivestockCard = ({
  name,
  id,
  value,
  handleChange,
  selectedValue,
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        background: "#F7F8FD",
        minWidth: 150,
        borderRadius: "10px",
        m: 2,
        p: 2,
        pl: 0.5,
      }}
    >
      <Radio
        sx={{ width: 40 }}
        checked={selectedValue}
        onChange={handleChange}
        value={value}
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      />
      <Box>
        <TypographyPrimary sx={{ m: 0 }}>{name}</TypographyPrimary>
        <TypographyPrimary sx={{ m: 0 }}>{id}</TypographyPrimary>
      </Box>
    </Stack>
  );
};

export default LivestockCard;
