import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminLayout = () => {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== "admin") {
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
