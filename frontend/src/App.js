import React, { useState, useEffect } from "react";
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
import OwnerProfile from "./Features/OwnerProfile/Profile"; // ✅ NEW

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
      case 9: // ✅ Owner Profile page
        return <OwnerProfile />;
      case 12:
        return <NotifyAll />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar setValue={setValue} setSidebarOpen={setSidebarOpen} />
      {renderComponent()}
      <Footer value={value} setValue={setValue} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setValue={setValue} />
    </div>
  );
};

export default App;
