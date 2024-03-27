import React from "react";
import { Skeleton } from "@mui/material";

export default function SkeletonLoader({ width, height, sx }) {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      width={width}
      height={height}
      sx={sx}
    />
  );
}
