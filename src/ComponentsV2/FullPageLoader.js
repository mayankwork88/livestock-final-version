import { Stack } from "@mui/material";
import React from "react";

const FullPageLoader = () => {
  return (
    <Stack
      sx={{
        background: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100vh",
        position: "fixed",
        zIndex: 1000000,
      }}
      direction={'row'} justifyContent={'center'} alignItems={'center'}
    >
       <div className="wrapper">
        <div className="cir cir--1"></div>
        <div className="cir cir--2"></div>
        <div className="cir cir--3"></div>
        <div className="cir cir--1-follower-1"></div>
        <div className="cir cir--1-follower-2"></div>
        <div className="cir cir--2-follower-1"></div>
        <div className="cir cir--2-follower-2"></div>
        <div className="cir cir--3-follower-1"></div>
        <div className="cir cir--3-follower-2"></div>
      </div>
      
    </Stack>
  );
};

export default FullPageLoader;
