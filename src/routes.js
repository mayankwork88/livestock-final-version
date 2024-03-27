import AdminDashboard from "./pages/dashboard";
import Map from "./pages/Map/map";
import Collars from "./pages/Collars/Collars";
import ViewLivsestock from "./pages/Collars/viewCollarDetails";
import Livestocks from "./pages/Livestocks";
import LivestockDetails from "./pages/Livestocks/livestockDetail";
import AlertsPage from "./pages/Alerts";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Authentication";
import Notifications from "./pages/Notifications";

export default function () {
  const routes = [
    {
      name: "admin",
      key: "/login",
      route: "/login",
      component: <AuthPage />,
    },
    {
      name: "admin",
      key: "/admin/dashboard",
      route: "/admin/dashboard",
      component: <AdminDashboard />,
    },
    {
      name: "admin",
      key: "/admin/map",
      route: "/admin/map",
      component: <Map />,
    },
    {
      name: "admin",
      key: "/admin/collars",
      route: "/admin/collars",
      component: <Collars />,
    },
    {
      name: "admin",
      key: "/admin/collars/:id",
      route: "/admin/collars/:id",
      component: <ViewLivsestock />,
    },
    {
      name: "admin",
      key: "/admin/livestocks",
      route: "/admin/livestocks",
      component: <Livestocks />,
    },
    {
      name: "admin",
      key: "/admin/livestocks/:id",
      route: "/admin/livestocks/:id",
      component: <LivestockDetails />,
    },
    {
      name: "admin",
      key: "/admin/alerts/",
      route: "/admin/alerts/",
      component: <AlertsPage />,
    },
    {
      name: "admin",
      key: "/admin/profile/",
      route: "/admin/profile/",
      component: <ProfilePage />,
    },
    {
      name: "admin",
      key: "/admin/notifications/",
      route: "/admin/notifications/",
      component: <Notifications />,
    }
  ];

  return routes;
}
