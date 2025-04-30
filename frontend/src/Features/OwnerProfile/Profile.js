import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const Profile = () => {
  const [gymInfo, setGymInfo] = useState({
    name: "",
    location: "",
    contact: "",
    sessionTimings: { morning: "", evening: "" },
  });

  const [trainers, setTrainers] = useState({
    morning: [],
    evening: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile")
      .then((res) => {
        const data = res.data;
        if (data) {
          setGymInfo({
            name: data.name || "",
            location: data.location || "",
            contact: data.contact || "",
            sessionTimings: data.sessionTimings || { morning: "", evening: "" },
          });
          setTrainers(data.trainers || { morning: [], evening: [] });
        }
      })
      .catch((err) => console.error("Error fetching profile", err));
  }, []);

  const handleChange = (e) => {
    setGymInfo({ ...gymInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const profileData = { ...gymInfo, trainers };

    axios
      .post("http://localhost:5000/api/profile", profileData)
      .then((res) => {
        console.log("Saved profile:", res.data);
        setIsEditing(false);
        alert("Profile saved successfully");
      })
      .catch((err) => {
        console.error("Error saving profile:", err);
        alert("Failed to save profile");
      });
  };

  const handleTrainerChange = (session, index, value) => {
    const updated = { ...trainers };
    updated[session][index].name = value;
    setTrainers(updated);
  };

  const handleAddTrainer = (session) => {
    const updated = { ...trainers };
    updated[session].push({ name: "" });
    setTrainers(updated);
  };

  const handleDeleteTrainer = (session, index) => {
    const updated = { ...trainers };
    updated[session].splice(index, 1);
    setTrainers(updated);
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 4,
        borderRadius: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Gym Profile
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Gym Name"
              name="name"
              value={gymInfo.name}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditing }}
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={gymInfo.location}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditing }}
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact"
              name="contact"
              value={gymInfo.contact}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditing }}
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <TextField
                label="Morning Timing"
                value={gymInfo.sessionTimings.morning}
                onChange={(e) =>
                  setGymInfo({
                    ...gymInfo,
                    sessionTimings: {
                      ...gymInfo.sessionTimings,
                      morning: e.target.value,
                    },
                  })
                }
                fullWidth
                InputProps={{ readOnly: !isEditing }}
                sx={{ backgroundColor: "#fff" }}
              />
              <TextField
                label="Evening Timing"
                value={gymInfo.sessionTimings.evening}
                onChange={(e) =>
                  setGymInfo({
                    ...gymInfo,
                    sessionTimings: {
                      ...gymInfo.sessionTimings,
                      evening: e.target.value,
                    },
                  })
                }
                fullWidth
                InputProps={{ readOnly: !isEditing }}
                sx={{ backgroundColor: "#fff" }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="right" mb={2}>
          {isEditing ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Trainers
        </Typography>

        {["morning", "evening"].map((session) => (
          <Accordion key={session} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ textTransform: "capitalize" }}>
                {session} Trainers
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {trainers[session]?.map((trainer, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={2}
                >
                  <Avatar />
                  <TextField
                    label="Trainer Name"
                    value={trainer.name}
                    onChange={(e) =>
                      handleTrainerChange(session, index, e.target.value)
                    }
                    fullWidth
                    InputProps={{ readOnly: !isEditing }}
                    sx={{ backgroundColor: "#fff" }}
                  />
                  {isEditing && (
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTrainer(session, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              {isEditing && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddTrainer(session)}
                >
                  Add Trainer
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};

export default Profile;
