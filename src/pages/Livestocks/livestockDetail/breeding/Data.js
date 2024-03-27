import { Box } from "@mui/material";
import {
  AiAttemptImg,
  ParityImg,
  SuccessRateImg,
  CalenderImg,
} from "../../../../assets";

export const overallStats = {
  heading: "overall stats",
  data: [
    {
      label: "parity",
      value: "02",
    },
    {
      label: "Service period",
      value: "60 days",
    },
    {
      label: "Gestation Day",
      value: "280 Days",
    },
    {
      label: "Drying Date",
      value: "November 25, 2024",
    },
    {
      label: "Last calving date",
      value: "January 10, 2024",
    },
    {
      label: "Expected calving date",
      value: "November 25, 2024",
    },
    {
      label: "Inter Calving Period",
      value: "300 Days",
    },
  ],
};

export const aiStats = {
  heading: "AI stats",
  data: [
    {
      label: "Total AI attempt",
      value: "02",
    },
    {
      label: "Last AI date",
      value: "February 5, 2024",
    },
    {
      label: "Success Rate",
      value: "100%",
    },
  ],
};

export const breedingAICardData = [
  {
    label: "AI Attempts",
    value: "04",
    key: "totalAiAttempts",
    icon: <Box sx={{ width: "7rem" }} component="img" src={AiAttemptImg} />,
    valueColor: "color-success--dark",
    suffix: "",
    colors: {
      main: "transparent",
      bg:  "transparent",
    },
  },
  {
    label: "parity",
    value: "04",
    key: "parity",
    icon: <Box sx={{ width: "7rem" }} component="img" src={ParityImg} />,
    valueColor: "color-success--dark",
    suffix: "",
    colors: {
      main: "transparent",
      bg:  "transparent",
    },
  },
  {
    label: "Success Rate",
    value: "04",
    key: "aiSuccessRate",
    icon: <Box sx={{ width: "7rem" }} component="img" src={SuccessRateImg} />,
    valueColor: "color-success--dark",
    suffix: "",
    colors: {
      main: "transparent",
      bg:  "transparent",
    },
  },
  {
    label: "Last AI Attempt",
    value: "04",
    key: "lastAiDate",
    icon: <Box sx={{ width: "7rem" }} component="img" src={CalenderImg} />,
    valueColor: "color-success--dark",
    suffix: "",
    colors: {
      main: "transparent",
      bg:  "transparent",
    },
  },
];

export const breedingAITableData = [
  "Artificial Insemination",
  "Sire No",
  "Date",
  "Result",
  "action",
];
