import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      height={"100vh"}
      gap={theme.spacing(2)}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
        <Typography
        variant="h2"
        sx={{ fontSize:theme.spacing(10),fontWeight: "bold", color: theme.palette.primary.main }}
      >
        404
      </Typography>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
      >
        Thank you for finding the page we haven't developed :/
      </Typography>
      <ButtonPrimary sx={{ fontSize: theme.spacing(3), p:theme.spacing(1, 3) }} onClick={() => navigate(-1)}>Go Back</ButtonPrimary>
    </Stack>
  );
};

export default NotFound;
