import ShowCollars from "./ShowCollars";
// SHOW COLLAR DETAIL DATA
import Overview from "./viewCollarDetails/overview";
import AssignLivestock from "./viewCollarDetails/assignLivestock";
import CollarLogs from "./viewCollarDetails/CollarLogs";
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
    child: <ShowCollars show={false} />,
  },
];

export const showCollarTableHeadData = [
  "collar UID",
  "collar name",
  "power",
  "current status",
  "added on",
  "action",
];

// SHOW COLLAR DETAIL DATA
export const viewCollarDetailTabData = (data, isLoading) => [
  {
    label: "overview",
    child: <Overview data={data} deviceLoading={isLoading}/>,
  },
  {
    label: "assigned",
    child: (
      <AssignLivestock data={data} deviceLoading={isLoading} />
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
    link: `devices/collar/${data?.collarId}`,
  },
];

export const statusCardData = [
  {
    text: "status",
    status: "online",
    key:'deviceActiveStatus',
    icon: <InfoOutlinedIcon fontSize="large" sx={{ mr: 1 }} />,
    statusColor: "#347D00",
    suffix: "",
  },
  {
    text: "pedometer battery",
    key:'batteryPercent',
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
    key:'batteryPercent',
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
