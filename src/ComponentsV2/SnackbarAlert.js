import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({ open, closeAlert, message, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeAlert();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%",fontSize:"18px" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarAlert;
