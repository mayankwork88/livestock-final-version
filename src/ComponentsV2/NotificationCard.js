import { Paper, Box, Typography } from "@mui/material";
import React from "react";

const NotificationCard = ({ rightData, leftData, customStyle, onClick}) => {
  const getTypography = (text) => {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {text}
      </Typography>
    );
  };
  
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        ...customStyle,
      }}
      onClick={onClick}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }} gap={1}>
        {rightData?.map((ele) => getTypography(ele))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }} gap={1}>
        {leftData?.map((ele) => getTypography(ele))}
      </Box>
    </Paper>
  );
};

export default NotificationCard;
