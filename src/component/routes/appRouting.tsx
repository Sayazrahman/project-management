import { Routes, Route } from "react-router-dom";
import LoginComponent from "../login/login";
import ProtectedLayout from "../protected-route/protected-route";
import Dashboard from "../dashboard/dashboard";

function AppRouting() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginComponent />} />
      <Route path="/login" element={<LoginComponent />} />

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouting;
