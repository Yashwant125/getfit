import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
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
      p: 2,
      display: "flex",
      alignItems: "center",
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: color.light,
    }}
  >
    <Avatar sx={{ bgcolor: color.main, mr: 2 }}>{icon}</Avatar>
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

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const DataSection = ({ title, data, emptyText, icon, buttonLink, buttonLabel }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mt: 4, p: 2, boxShadow: 2, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon} {title}
        </Typography>
        {buttonLink && (
          <Button variant="outlined" size="small" onClick={() => navigate(buttonLink)}>
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
                  primary={`${item.name} (${item.phone})`}
                  secondary={
                    <>
                      Valid From: {formatDate(item.startDate)} — Valid To: {formatDate(item.endDate)}
                    </>
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
          axios.get("/api/members"),
          axios.get("/api/members/active"),
          axios.get("/api/members/unpaid"),
          axios.get("/api/members/expired"),
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

        setRecent([...all].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));

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
    total: { main: theme.palette.primary.main, light: theme.palette.primary.light },
    active: { main: theme.palette.success.main, light: theme.palette.success.light },
    unpaid: { main: theme.palette.warning.main, light: theme.palette.warning.light },
    expired: { main: theme.palette.error.main, light: theme.palette.error.light },
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          Gym Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Members" value={stats.total} icon={<PersonIcon />} color={colors.total} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Members" value={stats.active} icon={<CheckCircleIcon />} color={colors.active} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Unpaid Members" value={stats.unpaid} icon={<WarningIcon />} color={colors.unpaid} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Expired Members" value={stats.expired} icon={<EventBusyIcon />} color={colors.expired} />
        </Grid>
      </Grid>

      <DataSection
        title="Recent Member Registrations"
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
        title="Unpaid / Partially Paid Members"
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
