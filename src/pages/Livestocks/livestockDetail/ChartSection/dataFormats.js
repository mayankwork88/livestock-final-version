import { Typography } from "@mui/material";
import moment from "moment/moment";

const formattedDate = (dataString, need) => {
  const date = moment(dataString).format("DD/MM/YYYY");
  const time = moment(dataString).format("LT");

  const result = (key) => {
    switch (key) {
      case "date":
        return date;
      case "time":
        return time;
      default:
        return `${time} ${date}`;
    }
  };

  return result(need);
};

export const logsTableHeadData = [
  "sensor name",
  "current value",
  "Date & Time",
];

export const logsTableHeaders = [
  "sensor name",
  "current value",
  "high threshold",
  "low threshold",
  "Date & Time",
];


export const getFormattedHealthLogsData = (data, label, unit, finalLabel) => {
  const value = (ele) => ele?.[label];
  const date = (ele) =>
    label?.toLowerCase() === "activetime" && "hour" in ele
      ? `${ele?.hour} - ${Number(ele.hour) + 1} hr`
      : formattedDate(ele?.createdAt);

  const text = label?.toLowerCase() === "activetime" ? "activity" : label;
  return data?.map((ele) => ({
    sensorName: finalLabel || text,
    currentValue: [
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          color: `${ele?.alertStatus ? "#FC5555" : ""}`,
        }}
      >
        {value(ele)}
        {unit}
      </Typography>,
    ],
    highThreshold: `${ele?.highThreshold + unit}`,
    lowThreshold: `${ele?.lowThreshold + unit}`,
    date: date(ele),
  }));
};

export const exportFormat = (data, label, key, unit) => {
  return data?.map((ele) => ({
    sensorName: label,
    currentValue: `${ele?.[key]} ${unit}`,
    date: formattedDate(ele?.createdAt),
  }));
};

export const exportFormatV2 = (data, label, key, unit) => {
  return data?.map((ele) => ({
    sensorName: label,
    currentValue: `${ele?.[key]} ${unit}`,
    highThreshold:`${ele?.['highThreshold']} ${unit}` ,
    lowThreshold:`${ele?.lowThreshold} ${unit}` ,
    date: formattedDate(ele?.createdAt),
  }));
};

const threshold = [
  { value: "Max Threshold", color: "red", type: "line" },
  { value: "Min Threshold", color: "red", type: "line" },
];
export const tempLegends = [
  { value: "temperature", color: "#E1A325", type: "circle" },
  ...threshold,
];

export const heartbeatLegends = [
  { value: "heartbeat", color: "#FD3730", type: "circle" },
  ...threshold,
];

export const stepsLegends = [
  { value: "Steps", color: "#FF9777", type: "circle" },
  ...threshold,
];
export const activityLegends = [
  { value: "activity", color: "#4f46e5", type: "circle" },
  ...threshold,
];
export const ruminationLegends = [
  { value: "rumination", color: "#61A9FF", type: "circle" },
  ...threshold,
];
