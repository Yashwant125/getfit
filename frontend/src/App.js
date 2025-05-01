import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import AddMember from "./Features/Members/AddMember";
import ViewMembers from "./Features/Members/ViewMembers";
import AddPlan from "./Features/MembershipPlan/AddPlan";
import ViewPlans from "./Features/MembershipPlan/ViewPlans";
import UnpaidMembers from "./Features/Notifications/UnpaidMembers";
import ExpiredMembers from "./Features/Notifications/ExpiredMembers";
import ActiveMembers from "./Features/Notifications/ActiveMembers";
import Sidebar from "./components/Sidebar";
import FeedbackSection from "./Features/FeedbackSection/Feedback";
import NotifyAll from "./Features/Notify/NotifyAll";
import OwnerProfile from "./Features/OwnerProfile/Profile";

// ✅ Support Pages
import CancellationRefund from "./Features/Support/CancellationRefund";
import TermsAndConditions from "./Features/Support/TermsAndConditions";
import ContactUs from "./Features/Support/ContactUs";
import PrivacyPolicy from "./Features/Support/PrivacyPolicy";
import ShippingPolicy from "./Features/Support/ShippingPolicy";

import axios from "axios";

const App = () => {
  const [value, setValue] = useState(0);
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("https://getfit-v9g1.onrender.com/api/plans");
        setPlans(res.data);
      } catch (err) {
        console.error("❌ Error fetching plans:", err);
      }
    };

    const fetchMembers = async () => {
      try {
        const res = await axios.get("https://getfit-v9g1.onrender.com/api/members");
        setMembers(res.data);
      } catch (err) {
        console.error("❌ Error fetching members:", err);
      }
    };

    fetchPlans();
    fetchMembers();
  }, []);

  const renderComponent = () => {
    switch (value) {
      case 0:
        return <Dashboard />;
      case 1:
        return <AddMember setMembers={setMembers} />;
      case 2:
        return <ViewMembers members={members} setMembers={setMembers} />;
      case 3:
        return <AddPlan setPlans={setPlans} />;
      case 4:
        return <ViewPlans plans={plans} />;
      case 5:
        return <UnpaidMembers />;
      case 6:
        return <ExpiredMembers />;
      case 7:
        return <ActiveMembers />;
      case 8:
        return <FeedbackSection />;
      case 9:
        return <OwnerProfile />;
      case 12:
        return <NotifyAll />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Navbar setValue={setValue} setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path="/" element={renderComponent()} />

        {/* ✅ Support Pages Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<CancellationRefund />} />
      </Routes>
      <Footer value={value} setValue={setValue} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setValue={setValue} />
    </Router>
  );
};

export default App;
