import ShowCollars from "./ShowCollars";
// SHOW COLLAR DETAIL DATA
import Overview from "./viewPedometerDetails/overview";
import AssignLivestock from "./viewPedometerDetails/assignLivestock";
import CollarLogs from "./viewPedometerDetails/CollarLogs";
import { InfoOutlinedIcon, Battery5BarOutlinedIcon } from "../../icons";

export const collarTabData = [
  {
    label: "all",
    child: <ShowCollars show="all" />,
  },
  {
    label: "assigned",
    child: <ShowCollars show={true} />,
  },
  {
    label: "not assigned",
    child: <ShowCollars show={false}/>,
  },
];

export const showCollarTableHeadData = [
  "Pedometer UID",
  "Pedometer name",
  "power",
  "current status",
  "added on",
  "action",
];

// SHOW COLLAR DETAIL DATA
export const viewCollarDetailTabData = (deviceData, isLoading) => [
  {
    label: "overview",
    child: <Overview data={deviceData} deviceLoading={isLoading} />,
  },
  {
    label: "assigned",
    child: (
      <AssignLivestock data={deviceData} isLoading={isLoading} />
    ),
  },
  {
    label: "logs",
    child: <CollarLogs />,
  },
];

export const viewCollarDetailsBreadcrumbData = (data) => [
  {
    label: "Device management",
    link: "devices",
  },
  {
    label: data?.collarUid ? data.collarUid : "Collar UID",
    link: `devices/pedometer/${data?.collarId}`,
  },
];

export const statusCardData = [
  {
    text: "status",
    status: "online",
    icon: <InfoOutlinedIcon fontSize="large" sx={{ mr: 1 }} />,
    statusColor: "#347D00",
    suffix: "",
  },
  {
    text: "pedometer battery",
    status: "56",
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
    status: "56",
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

export const pedometerStatusCardData = [
  {
    text: "status",
    status: "online",
    icon: <InfoOutlinedIcon fontSize="large" sx={{ mr: 1 }} />,
    statusColor: "#347D00",
    suffix: "",
  },
  {
    text: "pedometer battery",
    status: "56",
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
