import Radio from "@mui/material/Radio";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

export default function RadioGroupComp({ selectedValue, options, onSelect }) {
  const ParaV2 = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: "15px 0",
  });
  return (
    <Box sx={{ display: "flex" }}>
      {options?.map((ele) => (
        <Box sx={{ display: "flex" }}>
          <Radio
            checked={ele?.value?.toLowerCase() === selectedValue?.toLowerCase()}
            size="large"
            sx={{ fontSize: "20px" }}
            onChange={() => onSelect?.(ele.value)}
          />
          <ParaV2 variant="h5">{ele?.label}</ParaV2>
        </Box>
      ))}
    </Box>
  );
}
