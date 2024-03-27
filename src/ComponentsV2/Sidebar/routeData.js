import {
  NotificationsNoneOutlinedIcon,
  AccountBoxOutlinedIcon,
  DashboardOutlinedIcon,
  LocationOnOutlinedIcon,
  PetsOutlinedIcon,
  GroupWorkOutlinedIcon,
  GroupIcon,
} from "../../icons";

export const routes = [
  {
    icon: DashboardOutlinedIcon,
    title: "dashboard",
    link: "/",
    role: [1, 2],
  },
  {
    icon: GroupIcon,
    title: "Users",
    link: "/users",
    role: [1],
  },
  {
    icon: LocationOnOutlinedIcon,
    title: "geofence",
    link: "/map",
    role: [1, 2],
  },
  {
    icon: GroupWorkOutlinedIcon,
    title: "devices",
    link: "/devices",
    role: [1, 2],
  },
  {
    icon: PetsOutlinedIcon,
    title: "livestocks",
    link: "/livestocks",
    role: [1, 2],
  },
  {
    icon: NotificationsNoneOutlinedIcon,
    title: "alerts",
    link: "/alerts",
    role: [1, 2],
  },
  {
    icon: AccountBoxOutlinedIcon,
    title: "profile",
    link: "/profile",
    role: [1, 2],
  },
];
