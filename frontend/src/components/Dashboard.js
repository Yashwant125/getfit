import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import GroupIcon from "@mui/icons-material/Group";
import LinkIcon from "@mui/icons-material/Link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const Dashboard = () => {
  return (
    <Box p={2}>
      {/* Dashboard Cards */}
      <Grid container spacing={2}>
        {[ 
          {
            icon: <CurrencyRupeeIcon color="secondary" />,
            value: "₹ 16410.00",
            label: "Earnings"
          },
          {
            icon: <GroupIcon color="secondary" />,
            value: "7",
            label: "Members"
          },
          {
            icon: <LinkIcon color="secondary" />,
            value: "7",
            label: "Joined"
          },
          {
            icon: <AccessTimeIcon color="secondary" />,
            value: "Thursday, 11:49 AM",
            label: "December 12, 2024"
          }
        ].map((item, index) => (
          <Grid key={index} xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                {item.icon}
                <Box>
                  <Typography fontWeight="bold">{item.value}</Typography>
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Latest Members */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Latest Members
        </Typography>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {["Kumar", "shibin", "SWARNA", "HARISH"].map((name, index) => (
            <Box key={index} textAlign="center">
              <Avatar>{name[0]}</Avatar>
              <Typography variant="caption">{name}</Typography>
            </Box>
          ))}
          <Box textAlign="center">
            <Avatar sx={{ bgcolor: "#f14e94" }}>
              <AddIcon />
            </Avatar>
            <Typography variant="caption">Add New</Typography>
          </Box>
        </Box>
      </Box>

      {/* Transactions Overview */}
      <Box mt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Transactions Overview</Typography>
          <Button variant="text" size="small" sx={{ color: "#f14e94" }}>
            See all
          </Button>
        </Box>

        {[500, 10].map((amount, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              mt: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <CreditScoreIcon color="success" />
              <Box>
                <Typography fontWeight="bold">Membership Fee</Typography>
                <Typography variant="body2" color="text.secondary">
                  Transaction ID {index === 0 ? "279" : "280"}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="right">
              <Typography fontWeight="bold" color="green">
                +{amount}.00 Cr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {index === 0 ? "9 Dec 2024" : "8 Dec 2024"}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
