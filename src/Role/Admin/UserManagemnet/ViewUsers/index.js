import { Container, Typography } from "@mui/material";
import { CustomTabs } from "../../../../ComponentsV2";
import AdminUIContainer from "../../../../layout/AdminUIContainer";
import UserDetailsAdmin from "./UserDetailsAdmin";
import useGetProfile from "../../../../hooks/Profile/useGetProfile";
import { useParams } from "react-router-dom";
import UserGeofenceAdmin from "./UserGeofenceAdmin";
import UserCollarsAdmin from "./UserCollarsAdmin";
import UserPedometerAdmin from "./UserPedometerAdmin";
import UserLivestockAdmin from "./UserLivestockAdmin";
import UserAlertsAdmin from "./UserAlertsAdmin";

const breadcrumb = (profile, id) => [
  {
    label: "User Management",
    link: "users",
  },
  {
    label: `${profile?.fullName || "N/A"}`,
    link: `${id}`,
  },
];
const tabData = [
  {
    label: "User Info",
    child: <UserDetailsAdmin />,
  },
  {
    label: "Geofence",
    child: <UserGeofenceAdmin />,
  },
  {
    label: "Collars",
    child: <UserCollarsAdmin />,
  },
  {
    label: "Pedometers",
    child: <UserPedometerAdmin />,
  },
  {
    label: "Livestock",
    child: <UserLivestockAdmin />,
  },
  {
    label: "Alerts",
    child: <UserAlertsAdmin />,
  },
];

const ViewUserDetails = () => {
  const { id } = useParams();
  const { isLoading, error, profile } = useGetProfile(id);
  return (
    <AdminUIContainer BreadcrumbData={breadcrumb(profile, id)}>
      <Container maxWidth="xl" sx={{ marginTop: 5, pb: 0 }}>
        <Typography
          variant="h2"
          sx={{ fontSize: "2rem", fontWeight: 600, mb: 2 }}
        >
          {profile?.fullName}
        </Typography>
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default ViewUserDetails;
