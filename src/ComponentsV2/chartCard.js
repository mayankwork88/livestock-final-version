import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { TypographySecondary } from "./themeComponents";
import { useTheme } from "@emotion/react";

const ChartCard = ({
  label,
  value,
  icon,
  colors,
  valueColor,
  suffix,
  createdAt,
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      flexGrow={1}
      gap={{ xl: 0, lg: 0, md: 0 }}
      alignItems="center"
      border={"1px solid #dddddd"}
      borderRadius="10px"
      justifyContent="space-evenly"
      position="relative"
      py="16px"
      px="4px"
    >
      <Stack width="100%" px={1} direction="row" alignItems="center" gap={1}>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: "3px",
            }}
          >
            <TypographySecondary
              className="flex-row-center"
              sx={{
                fontSize: "14px",
                color: "#696969",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {label}
            </TypographySecondary>
            <Typography
              className={`${valueColor}`}
              sx={{
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              {value ? value + suffix : "0" + suffix}
            </Typography>
            <TypographySecondary
              className="flex-row-center"
              sx={{
                fontSize: "12px",
                color: "#696969",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {createdAt}
            </TypographySecondary>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ChartCard;
