import React, { useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Badge,
  Divider,
  IconButton,
  styled,
  createTheme,
  Stack,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiMenu from "@mui/material/Menu";
import { NotificationsNoneIcon } from "../icons";
import { NoNotifications } from "../ComponentsV2";
import { NotificationContext } from "../context/NotificationContext";
import useDateFormat from "../hooks/useDateFormat";

const theme = createTheme();
const Menu = styled(MuiMenu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4),
    [theme?.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
const styles = {
  maxHeight: 349,
  overflowY: "scroll",
  "& .MuiMenuItem-root:last-of-type": {
    border: 0,
  },
};
const Avatar = styled(MuiAvatar)`
  width: 2.375rem;
  height: 2.375rem;
  font-size: 1.125rem;
`;

const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));

const MenuItemSubtitle = styled(Typography)`
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
`;
const AlertsDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    setUnreadToReadNotification,
    getAllUnreadNotification,
    getAllReadNotification,
    allUnreadNotifications,
    unReadUtils,
  } = useContext(NotificationContext);
  const { formattedDate } = useDateFormat();

  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
    getAllUnreadNotification();
    getAllReadNotification();
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box
          sx={{
            ...styles,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            ...styles,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      );
    }
  };

  const handleViewAll = () => {
    navigate("/notifications");
    setAnchorEl(null);
  };

  const handleNotificationClick = (alert) => {
    navigate(`/livestocks/${alert?.liveStock}`);
    handleDropdownClose();
    localStorage.setItem("currentTab", 7);
    localStorage.setItem(
      "livestockBreadcrumb",
      JSON.stringify([
        { label: alert?.liveStockName, link: `livestocks/${alert?.liveStock}` },
      ])
    );
    setUnreadToReadNotification(alert?._id);
  };

  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge
          className="badge"
          max={99}
          badgeContent={unReadUtils?.dataLength}
          color="error"
        >
          <NotificationsNoneIcon sx={{ fontSize: "24px" }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack sx={{ position: "relative", zIndex: 1200000 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              my: 2,
            }}
          >
            <Typography
              align="center"
              sx={{ fontSize: "1.5rem", fontWeight: 600, width: "100%" }}
            >
              Notifications
            </Typography>
          </Box>
          <Divider />
          <ScrollWrapper>
            {allUnreadNotifications?.length > 0 ? (
              <>
                {allUnreadNotifications?.map((item) => {
                  return (
                    <>
                      <MenuItem
                        onClick={() => handleNotificationClick(item)}
                        key={item?._id}
                        sx={{
                          py: 1,
                          px: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              flex: "1 1",
                              display: "flex",
                              overflow: "hidden",
                              flexDirection: "column",
                            }}
                          >
                            <MenuItemTitle sx={{ fontSize: "12px" }}>
                              {item?.liveStockName}
                            </MenuItemTitle>
                            <MenuItemTitle sx={{ fontSize: "12px" }}>
                              {item?.assignedDevice?.uID}
                            </MenuItemTitle>
                            <MenuItemSubtitle sx={{ fontSize: "14px" }}>
                              {item?.message}
                            </MenuItemSubtitle>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.disabled",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {formattedDate(item?.createdAt, "time")}
                            <br />
                            {formattedDate(item?.createdAt, "date")}
                          </Typography>
                        </Box>
                      </MenuItem>
                    </>
                  );
                })}
              </>
            ) : (
              <NoNotifications />
            )}
          </ScrollWrapper>
          <MenuItem
            disableRipple
            sx={{
              padding: "16px 16px",
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              style={{
                fontSize: "1.2rem",
              }}
              onClick={handleViewAll}
            >
              View All Notifications
            </Button>
          </MenuItem>
        </Stack>
      </Menu>
    </Fragment>
  );
};
export default AlertsDropdown;
