import React from "react";
import { Box, Stack } from "@mui/material";
import { TypographySecondary } from "./themeComponents";

const StatusCard = ({ text, status, icon, statusColor, suffix, actions }) => {
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="space-between"
      sx={{
        border: "1px solid #DDDDDD",
        p: 1.8,
        borderRadius: 2,
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <TypographySecondary variant="h5">{text}</TypographySecondary>
      </Box>
      <TypographySecondary variant="h5" sx={{ color: statusColor}}>
        {status?.toString()?.toUpperCase() === "N/A" ? `${status}` : `${status}${suffix}`}
      </TypographySecondary>
      {actions?.length && (
        <Stack direction="row" gap={1}>
          {actions?.map((ele) => ele)}
        </Stack>
      )}
    </Stack>
  );
};

export default StatusCard;
