import * as React from "react";
import { Box, SwipeableDrawer, Button, List, Typography } from "@mui/material";
import { MenuIcon } from "../../icons";
import {
  CompanyLogoWithBG as Logo,
  LivestockSidebar,
  LivestockSidebarFade,
} from "../../assets";
import { routes } from "./routeData";
import { useNavigate } from "react-router-dom";

export default function SidebarSmall() {
  const navigate = useNavigate();
  const currentRole = Number(
    JSON.parse(window?.localStorage?.getItem("userData"))?.role
  );
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const isActivePath = (link) =>
    window?.location?.pathname?.split("/")[1] === link.slice(1);
  const buttonStyles = (ele) => ({
    background: `${isActivePath(ele.link) ? "#C6A580" : "none"}`,
    color: `${isActivePath(ele.link) ? "#fff" : "#696969"}`,
    fontSize: "1.5rem",
    width: "90%",
    padding: "15px 0 15px 45px",
    fontWeight: "bold",
    borderRadius: 0,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    margin: "5px 0",
    display: "flex",
    justifyContent: "left",
    "&:hover": {
      background: `${isActivePath(ele.link) ? "#C6A580" : "none"}`,
    },
  });

  const handleClick = (link) => {
    localStorage.setItem("currentTab", 0);
    navigate(link);
  };
  const handleIcons = (link) => {
    const isLivestock = link.title === "livestocks";
    return isLivestock ? (
      <img
        src={isActivePath(link.link) ? LivestockSidebar : LivestockSidebarFade}
      />
    ) : (
      <link.icon fontSize="large" />
    );
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routes
          ?.filter((ele) => ele?.role?.includes(currentRole))
          ?.map((ele, ind) => (
            <Button
              key={ind}
              onClick={() => handleClick(ele.link)}
              sx={buttonStyles(ele)}
              startIcon={handleIcons(ele)}
            >
              {ele.title}
            </Button>
          ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            startIcon={<MenuIcon fontSize="large" sx={{ color: "#222" }} />}
            onClick={toggleDrawer(anchor, true)}
          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Box
              p={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{ width: 130, my: 2 }}
                alt="logo"
                src={Logo}
              />
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "2rem",
                    textAlign: "center",
                    fontFamily: '"PT Sans", sans-serif',
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  ALBARN
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "1.4rem",
                    textAlign: "center",
                    fontFamily: '"PT Sans", sans-serif',
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    letterSpacing: "1px",

                    mt: 1,
                  }}
                >
                  Cattle Management System
                </Typography>
              </Box>
            </Box>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
