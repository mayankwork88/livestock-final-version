import { useLocation, Navigate, Outlet } from "react-router-dom";

const AdminAccess = () => {
  const auth = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation();

  return auth?.role === 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/404" state={{ from: location }} replace />
  );
};

export default AdminAccess;
