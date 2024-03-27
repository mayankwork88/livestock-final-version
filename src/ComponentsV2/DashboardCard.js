import React from "react";
import { Grid, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const DashboardCard = ({ title, total, img }) => {
  
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      borderRadius="10px"
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
      p="20px"
      sx={{
        boxShadow:
          "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
        background: "#fff",
        borderLeft: `4px solid transparent`,
        transition: "all 0.4s linear",
        "&:hover": {
          borderLeft: `4px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <Grid container item xs={8} sm={8} md={8} lg={8} className="txtDiv">
        <Grid item className="flexDir">
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#696969",
            }}
          >
            {title}
          </Typography>
          <Typography
            className="CardText b1c_color fs24px fontWeight700"
            sx={{
              color:
                title?.toLowerCase() === "alerts" && Number(total) !== 0
                  ? "red !important"
                  : "",
            }}
          >
            {total}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={img} style={{ width: "70px", height: "70px" }} alt="error" />
      </Grid>
    </Stack>
  );
};

export default DashboardCard;
