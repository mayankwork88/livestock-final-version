import * as React from "react";
import Alert from "@mui/material/Alert";

export default function CustomLabel({ text, type, width, marginAuto, sx }) {
  return (
    <Alert
      icon={false}
      severity={type}
      sx={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        width: width,
        display: "flex",
        justifyContent:'center',
        padding:'0 10px',
        textTransform:'capitalize',
        margin:`${marginAuto?'0 auto':''}`,
        ...sx
      }}
    >
      {text}
    </Alert>
  );
}
