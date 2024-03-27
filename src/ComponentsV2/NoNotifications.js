import { Typography, Grid } from "@mui/material";
import { NotificationImg } from "../assets";

const NoNotifications = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "40vh" }}
      direction="column"
    >
      <Grid container justifyContent="center">
        <img
          src={NotificationImg}
          alt="notification"
          width={150}
          height={150}
        />
      </Grid>
      <Typography className="fs20px">No notifications to show yet</Typography>
      <Typography
        align="center"
        className=" fs16px"
        sx={{ color: "#6D787D", width: "90%" }}
      >
        You’ll see useful information here soon. Stay tuned!
      </Typography>
    </Grid>
  );
};

export default NoNotifications;
