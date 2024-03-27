import { Box } from "@mui/material";
import {
  TotalMilkYield,
  CalenderImg,
  AvgMilkYield,
  PeakMilkYield,
} from "../../../../assets";

export const milkOverviewCardData = [
  {
    label: "Total Milk Yield",
    value: "500",
    key: "totalMilkQuantity",
    icon: <Box sx={{ width: "7rem" }} component="img" src={TotalMilkYield} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
  {
    label: "Monthly Milk Yield",
    value: "500",
    key: "monthlyMilkQuantity",
    icon: <Box sx={{ width: "7rem" }} component="img" src={CalenderImg} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
  {
    label: "Avg Daily Milk Yield",
    value: "500",
    key: "avgDailyMilkData",
    icon: <Box sx={{ width: "7rem" }} component="img" src={AvgMilkYield} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
  {
    label: "Peak Monthly Milk Yield",
    value: "500",
    key: "MonthMaxMilkData",
    icon: <Box sx={{ width: "7rem" }} component="img" src={PeakMilkYield} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
];

export const milkOverviewTableHeaders = [
  "milk entry",
  "date",
  "quantity",
  "actions",
];

export const milkAnalyticsCardData = [
  {
    label: "Total Milk Yield",
    value: "500",
    key: "totalLactationMilkQuantity",
    icon: <Box sx={{ width: "7rem" }} component="img" src={TotalMilkYield} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
  {
    label: "Peak Daily Milk Yield",
    value: "500",
    key: "lactationMaxMilk",
    icon: <Box sx={{ width: "7rem" }} component="img" src={PeakMilkYield} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
  {
    label: "Avg Daily Milk Yield",
    value: "500",
    key: "avgDailyMilkData",
    icon: <Box sx={{ width: "7rem" }} component="img" src={AvgMilkYield} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
  {
    label: "Lactation Period",
    value: "500",
    key: "lactationPeriod",
    icon: <Box sx={{ width: "7rem" }} component="img" src={CalenderImg} />,
    colors: {
      main: "transparent",
      bg: "transparent",
    },
  },
];
