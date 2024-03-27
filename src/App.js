import { Routes, Route } from "react-router-dom";
import FullPageLoader from "./ComponentsV2/FullPageLoader";
import RequireAuth from "./utils/RequireAuth";
import AdminAccess from "./utils/AdminAccess";
import { Suspense, lazy, useContext } from "react";

import "./App.css";
import { NotificationContext } from "./context/NotificationContext";
const UserManagement = lazy(() => import("./Role/Admin/UserManagemnet"));
const ViewUserDetails = lazy(() =>
  import("./Role/Admin/UserManagemnet/ViewUsers")
);
const UserDashboard = lazy(() => import("./pages/dashboard"));
const Layout = lazy(() => import("./layout/Layout"));
const AuthPage = lazy(() => import("./pages/Authentication"));
const Map = lazy(() => import("./pages/Map/map"));
const LivestockDetails = lazy(() =>
  import("./pages/Livestocks/livestockDetail")
);
const Livestocks = lazy(() => import("./pages/Livestocks"));
const AlertsPage = lazy(() => import("./pages/Alerts"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const ViewCollarDetails = lazy(() =>
  import("./pages/Collars/viewCollarDetails")
);
const ViewPedometerDetails = lazy(() =>
  import("./pages/Padometer/viewPedometerDetails")
);
const NotFound = lazy(() => import("./pages/notFound"));
const Devices = lazy(() => import("./pages/Devices"));
const Notifications = lazy(() => import("./pages/Notifications"));
const LivestockHistoryPDF = lazy(() =>
  import("./pages/PDFPage/LivestockHistoryPDF")
);

function App() {
  const { logoutLoading } = useContext(NotificationContext);

  return (
    <Suspense fallback={<FullPageLoader />}>
      {
        logoutLoading &&<FullPageLoader/>
      }
      {/* <FullPageLoader/> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<AuthPage />} />
          <Route
            path="getLivestockHistory/:id"
            element={<LivestockHistoryPDF />}
          />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<UserDashboard />} />
            <Route element={<AdminAccess />}>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/users/:id" element={<ViewUserDetails />} />
            </Route>
            <Route path="map" element={<Map />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="devices/collar/:id" element={<ViewCollarDetails />} />
            <Route
              path="devices/pedometer/:id"
              element={<ViewPedometerDetails />}
            />
            <Route path="livestocks" element={<Livestocks />} />
            <Route path="livestocks/:id" element={<LivestockDetails />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
