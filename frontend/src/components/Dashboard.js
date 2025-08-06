import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  useTheme,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const StatCard = ({ title, value, icon, color }) => (
  <Card
    sx={{
      p: 1.5,
      display: "flex",
      alignItems: "center",
      height: "100%",
      boxShadow: 2,
      borderRadius: 2,
      backgroundColor: color.light,
    }}
  >
    <Avatar sx={{ bgcolor: color.main, width: 36, height: 36, mr: 1.5 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  </Card>
);

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

const DataSection = ({ title, data, emptyText, icon, buttonLink, buttonLabel }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mt: 4, p: 2, boxShadow: 2, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {icon} {title}
        </Typography>
        {buttonLink && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(buttonLink)}
            sx={{
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 0.6 },
              minWidth: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {buttonLabel || "View All"}
          </Button>
        )}
      </Box>

      {data.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {emptyText}
        </Typography>
      ) : (
        <List disablePadding>
          {data.map((item, idx) => (
            <React.Fragment key={item._id || idx}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>{item.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.name}, ${item.phone}`}
                  secondary={
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 0.5 }}>
                      <Typography variant="body2" color="textSecondary">
                        Valid From: {formatDate(item.startDate)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        To: {formatDate(item.endDate)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {idx < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({ total: 0, active: 0, unpaid: 0, expired: 0 });
  const [recent, setRecent] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [unpaidList, setUnpaidList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [allRes, activeRes, unpaidRes, expiredRes] = await Promise.all([
          axios.get("https://getfit-v9g1.onrender.com/api/members"),
          axios.get("https://getfit-v9g1.onrender.com/api/members/active"),
          axios.get("https://getfit-v9g1.onrender.com/api/members/unpaid"),
          axios.get("https://getfit-v9g1.onrender.com/api/members/expired"),
        ]);

        const all = allRes.data;
        const active = activeRes.data;
        const unpaid = unpaidRes.data;
        const expired = expiredRes.data;

        setStats({
          total: all.length,
          active: active.length,
          unpaid: unpaid.filter((m) => m.status === "unpaid").length,
          expired: expired.length,
        });

        setRecent(
          [...all].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        );

        const today = new Date();
        const next7 = new Date(today);
        next7.setDate(today.getDate() + 7);
        setUpcoming(
          active.filter((m) => {
            const end = new Date(m.endDate);
            return end >= today && end <= next7;
          })
        );

        setUnpaidList(unpaid);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    })();
  }, []);

  const colors = {
    total: { main: "#4F6D7A", light: "#E3ECF1" },
    active: { main: "#4F6D7A", light: "#E3ECF1" },
    unpaid: { main: "#4F6D7A", light: "#E3ECF1" },
    expired: { main: "#4F6D7A", light: "#E3ECF1" },
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
          }}
        >
          Gym Dashboard
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        <StatCard title="Total" value={stats.total} icon={<PersonIcon />} color={colors.total} />
        <StatCard title="Active" value={stats.active} icon={<CheckCircleIcon />} color={colors.active} />
        <StatCard title="Unpaid" value={stats.unpaid} icon={<WarningIcon />} color={colors.unpaid} />
        <StatCard title="Expired" value={stats.expired} icon={<EventBusyIcon />} color={colors.expired} />
      </Box>

      <DataSection
        title="Recent Registrations"
        data={recent}
        emptyText="No recent registrations."
        icon={<PersonIcon />}
        buttonLink="/view-members"
        buttonLabel="View All"
      />

      <DataSection
        title="Upcoming Expirations (7 days)"
        data={upcoming}
        emptyText="No upcoming expirations."
        icon={<WarningIcon />}
      />

      <DataSection
        title="Unpaid Members"
        data={unpaidList}
        emptyText="No unpaid members."
        icon={<WarningIcon />}
        buttonLink="/unpaid-members"
        buttonLabel="View All"
      />
    </Box>
  );
};

export default Dashboard;

