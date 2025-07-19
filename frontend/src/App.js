import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Dashboard
import Dashboard from "./components/Dashboard";

// Members
import AddMember from "./Features/Members/AddMember";
import ViewMembers from "./Features/Members/ViewMembers";

// Plans
import AddPlan from "./Features/MembershipPlan/AddPlan";
import ViewPlans from "./Features/MembershipPlan/ViewPlans";

// Notifications
import UnpaidMembers from "./Features/Notifications/UnpaidMembers";
import ExpiredMembers from "./Features/Notifications/ExpiredMembers";
import PaidMembers from "./Features/Notifications/PaidMembers";

// Owner Profile
import OwnerProfile from "./Features/OwnerProfile/Profile";

// Support
import CancellationRefund from "./Features/Support/CancellationRefund";
import TermsAndConditions from "./Features/Support/TermsAndConditions";
import ContactUs from "./Features/Support/ContactUs";
import PrivacyPolicy from "./Features/Support/PrivacyPolicy";
import ShippingPolicy from "./Features/Support/ShippingPolicy";
import About from "./Features/Support/About";

// Attendance
import ScanAttendance from "./Features/Attendance/ScanAttendance";
import QRCodeDisplay from "./Features/Attendance/QRCodeDisplay";
import AttendanceList from "./Features/Attendance/AttendanceList";

// Auth Pages
import LoginPage from "./Features/Login/LoginPage";
import SignupPage from "./Features/Login/SignupPage";
import ResetPassword from "./Features/Login/ResetPassword";

// Auth check
const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : children;
};

const Layout = ({ children, value, setValue, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const hideLayoutOn = ["/login", "/signup", "/forgot-password"];
  const isMinimal = hideLayoutOn.includes(location.pathname);

  return (
    <>
      {!isMinimal && (
        <>
          <Navbar setValue={setValue} setSidebarOpen={setSidebarOpen} />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setValue={setValue} />
        </>
      )}
      <div style={{ paddingTop: isMinimal ? 0 : "5rem", paddingBottom: isMinimal ? 0 : "4rem" }}>
        {children}
      </div>
      {!isMinimal && <Footer value={value} setValue={setValue} />}
    </>
  );
};

const App = () => {
  const [value, setValue] = useState(0);
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("❌ Error fetching plans:", err);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (err) {
      console.error("❌ Error fetching members:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchMembers();
  }, []);

  return (
    <Router>
      <Layout
        value={value}
        setValue={setValue}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

          {/* Main */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-member" element={<ProtectedRoute><AddMember setMembers={setMembers} /></ProtectedRoute>} />
          <Route path="/view-members" element={<ProtectedRoute><ViewMembers members={members} setMembers={setMembers} /></ProtectedRoute>} />
          <Route path="/add-plan" element={<ProtectedRoute><AddPlan setPlans={setPlans} /></ProtectedRoute>} />
          <Route path="/view-plans" element={<ProtectedRoute><ViewPlans plans={plans} fetchPlans={fetchPlans} /></ProtectedRoute>} />

          {/* Notifications & Others */}
          <Route path="/unpaid-members" element={<ProtectedRoute><UnpaidMembers /></ProtectedRoute>} />
          <Route path="/expired-members" element={<ProtectedRoute><ExpiredMembers /></ProtectedRoute>} />
          <Route path="/paid-members" element={<ProtectedRoute><PaidMembers /></ProtectedRoute>} />

          {/* Owner */}
          <Route path="/profile" element={<ProtectedRoute><OwnerProfile /></ProtectedRoute>} />

          {/* Support */}
          <Route path="/cancellation-refund" element={<ProtectedRoute><CancellationRefund /></ProtectedRoute>} />
          <Route path="/terms" element={<ProtectedRoute><TermsAndConditions /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/privacy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/shipping" element={<ProtectedRoute><ShippingPolicy /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

          {/* Attendance */}
          <Route path="/scan-attendance" element={<ProtectedRoute><ScanAttendance /></ProtectedRoute>} />
          <Route path="/qr-code" element={<ProtectedRoute><QRCodeDisplay /></ProtectedRoute>} />
          <Route path="/attendance-list" element={<ProtectedRoute><AttendanceList /></ProtectedRoute>} />

          {/* Reset password */}
          <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
