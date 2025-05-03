import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Dashboard from "./components/Dashboard";
import AddMember from "./Features/Members/AddMember";
import ViewMembers from "./Features/Members/ViewMembers";
import AddPlan from "./Features/MembershipPlan/AddPlan";
import ViewPlans from "./Features/MembershipPlan/ViewPlans";
import UnpaidMembers from "./Features/Notifications/UnpaidMembers";
import ExpiredMembers from "./Features/Notifications/ExpiredMembers";
import ActiveMembers from "./Features/Notifications/ActiveMembers";
import FeedbackSection from "./Features/FeedbackSection/Feedback";
import NotifyAll from "./Features/Notify/NotifyAll";
import OwnerProfile from "./Features/OwnerProfile/Profile";

// Support Pages
import CancellationRefund from "./Features/Support/CancellationRefund";
import TermsAndConditions from "./Features/Support/TermsAndConditions";
import ContactUs from "./Features/Support/ContactUs";
import PrivacyPolicy from "./Features/Support/PrivacyPolicy";
import ShippingPolicy from "./Features/Support/ShippingPolicy";

// New About Page
import About from "./Features/Support/About"; // Now correctly imported at the top

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

  return (
    <Router>
      <Navbar setValue={setValue} setSidebarOpen={setSidebarOpen} />

      <Routes>
        <Route path="/" element={<Dashboard />} />                         {/* 0 */}
        <Route path="/add-member" element={<AddMember setMembers={setMembers} />} />     {/* 1 */}
        <Route path="/view-members" element={<ViewMembers members={members} setMembers={setMembers} />} />  {/* 2 */}
        <Route path="/add-plan" element={<AddPlan setPlans={setPlans} />} />             {/* 3 */}
        <Route path="/view-plans" element={<ViewPlans plans={plans} />} />               {/* 4 */}
        <Route path="/unpaid-members" element={<UnpaidMembers />} />                     {/* 5 */}
        <Route path="/expired-members" element={<ExpiredMembers />} />                   {/* 6 */}
        <Route path="/active-members" element={<ActiveMembers />} />                     {/* 7 */}
        <Route path="/feedback" element={<FeedbackSection />} />                         {/* 8 */}
        <Route path="/profile" element={<OwnerProfile />} />                             {/* 9 */}
        <Route path="/notify-all" element={<NotifyAll />} />                             {/* 12 */}
        <Route path="/cancellation-refund" element={<CancellationRefund />} />           {/* 13 */}
        <Route path="/terms" element={<TermsAndConditions />} />                         {/* 14 */}
        <Route path="/contact" element={<ContactUs />} />                                {/* 15 */}
        <Route path="/privacy" element={<PrivacyPolicy />} />                            {/* 16 */}
        <Route path="/shipping" element={<ShippingPolicy />} />                          {/* 17 */}
        <Route path="/about" element={<About />} />                                     {/* 18 */}
      </Routes>

      <Footer value={value} setValue={setValue} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setValue={setValue} />
    </Router>
  );
};

export default App;
