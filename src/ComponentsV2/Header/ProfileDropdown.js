import * as React from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { CustomAvatar } from "../../ComponentsV2/themeComponents";
import { NotificationContext } from "../../context/NotificationContext";
import FullPageLoader from "../FullPageLoader";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { handleSocketLogout, setLogoutLoading } = React.useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    if (type === "profile") {
      navigate("/profile");
    } else if (type === "logout") {
      setLogoutLoading(true)
      handleSocketLogout();
      localStorage.removeItem("userData");
      localStorage.removeItem("geofence");
      localStorage.removeItem("prevGeofence");
      localStorage.removeItem("currentTab");
      localStorage.removeItem('forgetEmailAuth')

      localStorage.removeItem("farmLocation");
            window.location.reload();
    }
    setAnchorEl(null);
  };

  const userName = JSON.parse(localStorage.getItem("userData"))
    ?.userName?.charAt(0)
    .toUpperCase();


  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <CustomAvatar>{userName || "U"}</CustomAvatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "150px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{fontSize:'1.5rem'}} onClick={() => handleClose("profile")}>
          <CustomAvatar sx={{ marginRight: 1 }}>{userName || "U"}</CustomAvatar>{" "}
          Profile
        </MenuItem>
        <Divider />
        <MenuItem sx={{fontSize:'1.5rem'}} onClick={() => handleClose("logout")}>
          <ListItemIcon>
            <Logout fontSize="large" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
