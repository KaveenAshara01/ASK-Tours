import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import StaffManagement from "./pages/StaffManagement";
import TourManagement from "./pages/TourManagement";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/staff" />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="tours" element={<TourManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
