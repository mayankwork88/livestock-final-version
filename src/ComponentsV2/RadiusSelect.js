import * as React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMapContext from "../hooks/useMapContext";

export default function CustomSelect({ disable }) {
  const {
    saveLocationData,
    geofenceCoordinates,
    setGeofenceCoordinates,
    customError,
  } = useMapContext();

  const handleChange = (event) => {
    const { value } = event.target;
    setGeofenceCoordinates({ ...geofenceCoordinates, radius: value });
  };

  const radiusData = ["50m", "100m", "200m", "300m", "400m", "500m"];

  const labelFontSize = "1.7rem";
  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: labelFontSize,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: labelFontSize,
          },
        },
      },
    },
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <ThemeProvider theme={theme}>
        <TextField
          sx={{ background: "#fff" }}
          fullWidth
          disabled={disable}
          id="demo-simple-select"
          select
          variant="outlined"
          size="large"
          name="radius"
          value={geofenceCoordinates.radius}
          label="Radius"
          onChange={handleChange}
          InputLabelProps={{ style: { fontSize: 18, fontWeight: "bold" } }}
          error={customError?.error}
          helperText={customError?.message}
        >
          {radiusData?.map((ele) => (
            <MenuItem value={Number(ele.slice(0, -1))}>{ele}</MenuItem>
          ))}
        </TextField>
      </ThemeProvider>
    </Box>
  );
}
