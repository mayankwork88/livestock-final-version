import React, { useState } from "react";
import { Grid, Box, Stack } from "@mui/material";
import { NotificationsNoneIcon } from "../../icons";
import "../../assets/css/header.css";
import "../../assets/css/style.css";
import { SidebarSmall, Breadcrumb, ProfileMenu } from "../";
import { useNavigate } from "react-router-dom";
import AlertsDropdown from "../AlertsDropdown";

const HeaderAdmin = ({ BreadcrumbData }) => {
  const [anchorE2, setAnchorE2] = useState(null);

  const handleNotify = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const navigate = useNavigate();

  return (
    <Grid
    container
    justifyContent="space-between"
    width="100%"
    sx={{ padding: "10px", paddingRight: 6, width: "100%"}}
  >
    <Box sx={{ display: { lg: "none", md: "inline" } }}>
      <SidebarSmall />
    </Box>
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
      sx={{ pl: 4 }}
    >
      <Breadcrumb data={BreadcrumbData} />
      <Grid item sx={{ columnGap: "1rem" }} className="flex">
        <Grid item className="flex center">
        <AlertsDropdown/>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProfileMenu />
        </Grid>
      </Grid>
    </Stack>
  </Grid>
  );
};

export default HeaderAdmin;
