import ShowLivestocks from "./showLivestocks";
import { Box } from "@mui/material";
import {
  Battery5BarOutlinedIcon,
  ThermostatIcon,
  MonitorHeartIcon,
  PetsIcon,
} from "../../icons";
import {
  Steps,
  Rumination,
  LiveStockActivity,
  LiveStockTemperature,
} from "../../assets";

export const livestockTabData = [
  {
    label: "All Livestocks",
    child: <ShowLivestocks show="" />,
  },
  {
    label: "Safe",
    child: <ShowLivestocks show="safe" />,
  },
  {
    label: "Unsafe",
    child: <ShowLivestocks show="unsafe" />,
  },
];

export const livestockBreadcrumbData = [
  {
    label: "livestocks",
    link: "livestocks",
  },
];

export const showLivestockTableHeadData = [
  "UID",
  "livestock name",
  "collar ID",
  "Pedometer ID",
  "Added on",
  "current status",
  "last update",
  "action",
];

//LIVESTOCK DETAIL

export const livestockDetailAlertTableHeadData = [
  "alert name",
  "threshold value",
  "alarm value",
  "time",
  "date",
  "action",
];

// LIVESTOCK DETAIL :- COLLAR INFO

export const deviceInfoData = [
  {
    label: "UID",
    value: "collar_1",
  },
  {
    label: "Name",
    value: "device name",
  },
  {
    label: "MAC ID",
    value: "#3537HDB83728",
  },
  {
    label: "Added on",
    value: "24/02/23, 04:23 PM",
  },
  {
    label: "Battery",
    value: "56",
  },
];

export const pedometerInfoData = [
  {
    label: "Pedometer UID",
    value: "Pedometer_1",
  },
  {
    label: "Pedometer Name",
    value: "device name",
  },
  {
    label: "Pedometer MAC ID",
    value: "#3537HDB83728",
  },
  {
    label: "Pedometer Added on",
    value: "24/02/23, 04:23 PM",
  },
  {
    label: "Pedometer Battery",
    value: "56",
  },
];

export const statusCardData = [
  {
    text: "pedometer battery",
    key: "pedometerBatteryPercent",
    status: "0",

    icon: (
      <Battery5BarOutlinedIcon
        fontSize="large"
        sx={{ mr: 1, color: "#347D00" }}
      />
    ),
    statusColor: "#F19B4F",
    suffix: "%",
  },
  {
    text: "collar battery",
    key: "collarBatteryPercent",
    status: "0",
    icon: (
      <Battery5BarOutlinedIcon
        fontSize="large"
        sx={{ mr: 1, color: "#347D00" }}
      />
    ),
    statusColor: "#F19B4F",
    suffix: "%",
  },
];

// LIVESTOCK DETAIL :- HEALTH

export const chartCardData = [
  {
    label: "temperature",
    key: "temperature",
    timeKey: "temperatureTime",
    alertKey:'temperatureAlertStatus',
    value: "101",
    icon: (
      <Box sx={{ width: "4rem" }} component="img" src={LiveStockTemperature} />
    ),
    valueColor: "color-success--dark",
    suffix: " °F",
    colors: {
      main: "rgba(96, 174, 218, 1)",
      bg: "rgba(96, 174, 218, 0.25)",
    },
    createdAt: "10:59 PM, 23/08/23",
  },
  {
    label: "heartbeat",
    key: "heartBeat",
    timeKey: "heartBeatTime",
      alertKey:'heartBeatAlertStatus',
    value: "76",
    icon: (
      <MonitorHeartIcon
        sx={{ fontSize: "3.5rem", color: "rgba(253, 55, 48,1)" }}
      />
    ),
    valueColor: "color-success--dark",
    suffix: " Bpm",
    colors: {
      main: "rgba(253, 55, 48, 1)",
      bg: "rgba(253, 55, 48, 0.25)",
    },
    createdAt: "10:59 PM, 23/08/23",
  },
  {
    label: "steps",
    key: "totalSteps",
    timeKey: "stepsTime",
      alertKey:'stepsAlertStatus',
    value: "1200",
    icon: <Box sx={{ width: "4rem" }} component="img" src={Steps} />,
    valueColor: "color-success--dark",
    suffix: "",
    colors: {
      main: "rgba(215, 127, 74, 1)",
      bg: "rgba(215, 127, 74, 0.25)",
    },
    createdAt: "10:59 PM, 23/08/23",
  },
  {
    label: "activity",
    key: "activityActiveTime",
    timeKey: "activityTime",
      alertKey:'activityAlertStatus',
    value: "52",
    icon: (
      <Box sx={{ width: "4rem" }} component="img" src={LiveStockActivity} />
    ),
    valueColor: "color-success--dark",
    suffix: "",
    colors: {
      main: "rgba(104, 202, 68, 1)",
      bg: "rgba(104, 202, 68, 0.25)",
    },
    createdAt: "10:59 PM, 23/08/23",
  },
  {
    label: "rumination",
    key: "ruminationActiveTime",
    timeKey: "ruminationTime",
      alertKey:'ruminationActiveTime',
    value: "2",
    icon: <Box sx={{ width: "4rem" }} component="img" src={Rumination} />,
    valueColor: "color-success--dark",
    suffix: " hr",
    colors: {
      main: "rgba(68, 75, 84, 1)",
      bg: "rgba(68, 75, 84, 0.25)",
    },
    createdAt: "10:59 PM, 23/08/23",
  },
];

// LIVESTOCK DETAIL :- LOCATION

export const locationTableHeadData = [
  "status",
  "location",
  "address",
  "updated",
];

export const locationBtnData = [
  {
    label: "location",
  },
  {
    label: "analytics",
  },
];

// LIVESTOCK DETAIL :- OVERVIEW

export const parameterCardData = [
  {
    label: "temperature",
    time: "10:59 PM, 23/08/23",
    value: "78° F",
    icon: <ThermostatIcon sx={{ fontSize: "3em", color: "#fff" }} />,
    iconBg: "#B58B5D",
    valueColor: "err-color",
    suffix: " °F",
  },
  {
    label: "heartbeat",
    time: "10:59 PM, 23/08/23",
    value: "78",
    icon: <MonitorHeartIcon sx={{ fontSize: "3em", color: "#fff" }} />,
    iconBg: "#47CD75",
    valueColor: "color-success--dark ",
    suffix: "/min",
  },
  {
    label: "steps",
    time: "10:59 PM, 23/08/23",
    value: "5000",
    icon: <PetsIcon sx={{ fontSize: "3em", color: "#B58B5D" }} />,
    iconBg: "#ECDEC6",
    valueColor: "color-success--dark ",
    suffix: "/day",
  },
  {
    label: "activity",
    value: "52",
    icon: <Box sx={{ width: "4rem" }} component="img" src={Steps} />,
    valueColor: "color-success--dark",
    suffix: " min",
    iconBg: "rgba(215, 127, 74, 0.25)",
    createdAt: "10:59 PM, 23/08/23",
  },
  {
    label: "rumination",
    value: "2",
    icon: <Box sx={{ width: "4rem" }} component="img" src={Rumination} />,
    valueColor: "color-success--dark",
    suffix: "/day",
    iconBg: "rgba(68, 75, 84, 0.25)",
    createdAt: "10:59 PM, 23/08/23",
  },
];
