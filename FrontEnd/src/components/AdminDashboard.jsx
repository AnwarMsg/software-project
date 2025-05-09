import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, IconButton, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // Icon for management
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Report Icon
import { useContext } from "react";
import { UserContext } from "../components/UserContext"; // Assuming UserContext is set up

// Mock reports data for the Reports section
const mockReports = [
  {
    id: 1,
    content: "The driver was great, very friendly and punctual!",
    user: "Alice",
    driver: "Mohamed",
    city: "Casablanca",
    date: "2025-04-22",
    carModel: "BMW X5",
  },
  {
    id: 2,
    content: "The car was clean and the driver was polite. I would definitely recommend.",
    user: "Bob",
    driver: "Rachid",
    city: "Marrakesh",
    date: "2025-04-23",
    carModel: "Audi A4",
  },
  {
    id: 3,
    content: "Had a bumpy ride. The driver could have been a bit more careful.",
    user: "Charlie",
    driver: "Sara",
    city: "Rabat",
    date: "2025-04-24",
    carModel: "Toyota Corolla",
  },
  {
    id: 4,
    content: "The ride was okay, but the driver was late, and the car could be cleaner.",
    user: "David",
    driver: "Youssef",
    city: "Fes",
    date: "2025-04-25",
    carModel: "Hyundai Elantra",
  },
  {
    id: 5,
    content: "Perfect ride! Very comfortable and the driver was polite and on time.",
    user: "Eva",
    driver: "Sara",
    city: "Rabat",
    date: "2025-04-26",
    carModel: "Toyota Corolla",
  }
];

// Simulate driver data
const driversData = [
  { id: 1, name: "Driver 1", details: "Details about Driver 1", age: 35, email: "driver1@example.com", carModel: "Toyota Corolla", averageReview: 4.6, requestStatus: "pending" },
  { id: 2, name: "Driver 2", details: "Details about Driver 2", age: 41, email: "driver2@example.com", carModel: "Honda Civic", averageReview: 4.8, requestStatus: "accepted" },
  { id: 3, name: "Passenger 1", details: "Passenger wanting to become Driver 1", age: 29, email: "passenger1@example.com", carModel: "N/A", averageReview: 0, requestStatus: "pending" },
  { id: 4, name: "Passenger 2", details: "Passenger wanting to become Driver 2", age: 30, email: "passenger2@example.com", carModel: "N/A", averageReview: 0, requestStatus: "pending" },
];

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [drivers, setDrivers] = useState(driversData);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(storedReports);

    // Fetch driver requests if needed
    // The logic to get driver requests is assumed to be somewhere else in the app
  }, []);

  const handleAcceptRequest = (driverId) => {
    const updatedDrivers = drivers.map((driver) =>
      driver.id === driverId ? { ...driver, requestStatus: "accepted" } : driver
    );
    setDrivers(updatedDrivers);
  };

  const handleDeclineRequest = (driverId) => {
    const updatedDrivers = drivers.filter((driver) => driver.id !== driverId);
    setDrivers(updatedDrivers);
  };

  const handleRemoveDriver = (driverId) => {
    const updatedDrivers = drivers.filter((driver) => driver.id !== driverId);
    setDrivers(updatedDrivers);
  };

  const filteredDrivers = drivers
    .filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.requestStatus === "pending" && b.requestStatus !== "pending") return -1;
      if (a.requestStatus !== "pending" && b.requestStatus === "pending") return 1;
      return a.name.localeCompare(b.name);
    });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '120px', minHeight: '100vh' }}>
      <h1>Admin Dashboard</h1>
      <Card sx={{ width: '80%', borderRadius: 5, boxShadow: 16, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', maxWidth: 1100 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#14653c' }}>
                Driver Management
              </Typography>
              <ManageAccountsIcon sx={{ color: '#14653c', fontSize: 32, ml: 1 }} />
            </Box>
            <TextField
              label="Search Driver"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: '#fff',
                borderRadius: '1rem',
                width: '200px',
                ml: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '1rem',
                }
              }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Box>

          <Box sx={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: 'transparent', paddingLeft: '4px' }}>
            {filteredDrivers.map((driver) => (
              <Card
                key={driver.id}
                sx={{
                  backgroundColor: "#fafafa",
                  borderRadius: 5,
                  width: '96%',
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  p: 2,
                  gap: 2,
                  mb: 2,
                }}
                elevation={3}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Name: <span style={{ fontWeight: 400 }}>{driver.name}</span>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {driver.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Car Model:</strong> {driver.carModel}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {driver.requestStatus}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                  {driver.requestStatus === "pending" ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAcceptRequest(driver.id)}
                        sx={{ mb: 1, minWidth: 100 }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeclineRequest(driver.id)}
                        sx={{ minWidth: 100 }}
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <IconButton onClick={() => handleRemoveDriver(driver.id)} color="error">
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  )}
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Card>

      {/* Report Section */}
      <Card sx={{ width: '80%', marginTop: 20, marginBottom: 20, padding: 3, boxShadow: 16, borderRadius: 4 }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontWeight: 'bold', color: '#d32f2f' }}>
          Reports <ReportProblemIcon sx={{ color: '#d32f2f', marginLeft: 1 }} />
        </Typography>
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: 'transparent', pr: 1 }}>
          {mockReports.map((report, index) => (
            <Card key={index} sx={{ padding: 2, backgroundColor: '#fafafa', borderRadius: 3, marginBottom: '10px' }} elevation={4}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{report.content}</Typography>
              <Typography variant="body2" color="text.secondary"><strong>User:</strong> {report.user}</Typography>
              <Typography variant="body2" color="text.secondary"><strong>Driver:</strong> {report.driver}</Typography>
              <Typography variant="body2" color="text.secondary"><strong>City:</strong> {report.city}</Typography>
              <Typography variant="body2" color="text.secondary"><strong>Date:</strong> {report.date}</Typography>
              <Typography variant="body2" color="text.secondary"><strong>Car Model:</strong> {report.carModel}</Typography>
            </Card>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default AdminDashboard;