import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const auth = JSON.parse(localStorage.getItem('userData'));
    const location = useLocation();

    return (
        auth?.userId?<Outlet />:<Navigate to="/login" state={{from:location}} replace />
    )
}

export default RequireAuth;