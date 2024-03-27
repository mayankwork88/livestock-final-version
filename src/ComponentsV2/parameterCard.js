import React from "react";
import { Stack, Typography, Box, Paper } from "@mui/material";
import { TypographySecondary } from "./themeComponents";

const ParameterCard = ({
  label,
  time,
  value,
  icon,
  colors,
  valueColor,
  suffix,
  createdAt
}) => {
  return (
    <Stack
      direction={'row'}
      sx={{ px: 2, py: 2, gap:{lg:2, md:2, sm:1}, flexGrow: 1, border:'1px solid #ddd', borderRadius:'8px'}}
    >
      <Box
          className="flex-row-center border-circle"
          sx={{
            width: "60px",
            height: "60px",
            background: `${colors?.bg}`,
            border: `1px solid ${colors?.main}`,
          }}
        >
          {icon}
        </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{display:'flex', gap:1, justifyContent:'space-between', width:'100%'}}>
          <TypographySecondary
            className="flex-row-center"
            sx={{ fontSize: "14px", color: "#696969" }}
          >
            {label}
          </TypographySecondary>
          <TypographySecondary
            sx={{ fontSize: "14px", color: "#696969", textAlign:'right' }}
          >
            {createdAt}
          </TypographySecondary>
          </Box>
          <TypographySecondary
            className="flex-row-center"
            sx={{ fontSize: "14px", color: "#696969", textAlign: "right" }}
          >
            {time}
          </TypographySecondary>
        </Stack>
        <Typography
          className={`${valueColor}`}
          sx={{ fontSize: "2rem" , fontWeight: "bolder" }}
        >
          {(value ? value: "0") + suffix}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ParameterCard;
